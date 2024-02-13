import config, { presaleStartTime } from "../config";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import {
  setTokenPrice,
  setTotalTokensforSale,
  setTotalTokensSold,
  setIsSaleStarted,
} from "../store/presale";
import { useMemo, useState } from "react";
import {
  erc20ABI,
  useAccount,
  useNetwork,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { setBalance } from "../store/wallet";
import { toast } from "react-toastify";
import { presaleAbi } from "../contracts/presaleABI";
import {
  createPublicClient,
  formatUnits,
  getContract,
  http,
  parseUnits,
  zeroAddress,
} from "viem";
import dayjs from "dayjs";

const defaultChain = config.chains[0];

const publicClients = config.chains.reduce((acc, chain) => {
  acc[chain.id] = createPublicClient({
    chain,
    batch: { multicall: true },
    transport: http(),
  });
  return acc;
}, {} as { [key: number]: ReturnType<typeof createPublicClient> });

const useWeb3Functions = () => {
  const { chain } = useNetwork();

  const [loading, setLoading] = useState(false);
  const tokens = useSelector((state: RootState) => state.presale.tokens);
  const dispatch = useDispatch();
  const provider = usePublicClient();

  const { data: signer } = useWalletClient();
  const { address } = useAccount();

  const currentChain = useMemo(() => {
    if (chain && chain.unsupported) return defaultChain;
    else return chain || defaultChain;
  }, [chain]);

  const publicClient = useMemo(
    () => publicClients[currentChain.id],
    [currentChain]
  );

  const presaleContract = useMemo(() => {
    return getContract({
      address: config.presaleContract[currentChain.id],
      abi: presaleAbi,
      publicClient: publicClient,
      walletClient: signer || undefined,
    });
  }, [currentChain, publicClient, signer]);

  const fetchIntialData = async (_chainId: number = config.chains[0].id) => {
    setLoading(true);

    const [saleStatus] = await Promise.all([
      presaleContract.read.saleStatus(),
      fetchTotalTokensSold(),
      fetchTokenPrices(),
    ]);

    dispatch(setIsSaleStarted(saleStatus));

    setLoading(false);
  };

  const fetchTotalTokensSold = async () => {
    let extraAmount = 0;
    let incrase = 0;

    const totalTokensSold = await Promise.all(
      config.chains.map((chain) =>
        publicClients[chain.id].readContract({
          address: config.presaleContract[chain.id],
          abi: presaleAbi,
          functionName: "totalTokensSold",
        })
      )
    );

    try {
      const resposne = await fetch("/settings.json");
      const settings = await resposne.json();
      extraAmount = settings?.x;
      incrase = settings?.y;
      // eslint-disable-next-line no-empty
    } catch (e) {}

    const amount = +format(totalTokensSold.reduce((a, b) => a + b, 0n)) || 0;
    const m = dayjs().diff(dayjs.unix(presaleStartTime), "minute");

    const ext = amount + incrase * Math.floor(m / 10);
    let total = (amount < ext ? ext : amount) + extraAmount;
    total = total > config.stage.total ? config.stage.total : total;
    dispatch(setTotalTokensSold(total));
  };

  const fetchLockedBalance = async () => {
    if (!address) return;

    const { symbol, decimals } = config.saleToken[currentChain.id];
    const buyerAmount = await presaleContract.read.buyersDetails([address]);
    const balance = +formatUnits(buyerAmount[0], decimals);

    dispatch(setBalance({ symbol: symbol, balance }));
  };

  const fetchTokenBalances = async () => {
    if (!address) return;

    const balancses = await Promise.all(
      tokens[currentChain.id].map((token) => {
        if (token.address) {
          return publicClient.readContract({
            address: token.address,
            abi: erc20ABI,
            functionName: "balanceOf",
            args: [address],
          });
        } else {
          return provider.getBalance({ address });
        }
      })
    );

    tokens[currentChain.id].forEach((token, index) => {
      dispatch(
        setBalance({
          symbol: token.symbol,
          balance: +formatUnits(balancses[index], token.decimals),
        })
      );
    });
  };

  const fetchTokenPrices = async () => {
    const pricses = await Promise.all(
      tokens[currentChain.id].map((token) => {
        if (token.address) {
          return presaleContract.read.tokenPrices([token.address]);
        } else {
          return presaleContract.read.rate();
        }
      })
    );

    tokens[currentChain.id].forEach((token, index) => {
      dispatch(
        setTokenPrice({
          symbol: token.symbol,
          price: +formatUnits(pricses[index], token.decimals),
        })
      );
    });
  };

  const checkAllowance = async (
    token: Token,
    owner: Address,
    spender: Address,
    amount: bigint
  ) => {
    if (!token.address || !signer) return;

    const allowance = await provider.readContract({
      address: token.address,
      abi: erc20ABI,
      functionName: "allowance",
      args: [owner, spender],
    });

    if (allowance < amount) {
      const hash = await signer.writeContract({
        address: token.address,
        abi: erc20ABI,
        functionName: "approve",
        args: [
          spender,
          parseUnits("9999999999999999999999999999", token.decimals),
        ],
      });

      await provider.waitForTransactionReceipt({ hash });

      toast.success("Spend approved");
    }
  };

  const buyToken = async (value: string | number, token: Token) => {
    let success = false;
    let hash;

    if (!signer || !address) return { success, txHash: hash };

    setLoading(true);

    try {
      const amount = parseUnits(`${value}`, token.decimals);

      if (token.address) {
        await checkAllowance(
          token,
          address,
          config.presaleContract[currentChain.id],
          amount
        );
      }

      const { request } = await (
        presaleContract.simulate as any
      ).buyCrossChain([token.address || zeroAddress, amount], {
        account: address,
        value: token.address ? 0n : amount,
      });

      hash = await signer.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      fetchTokenBalances();
      fetchLockedBalance();
      fetchTotalTokensSold();

      toast.success(
        `You have successfully purchased $${
          config.saleToken[currentChain.id].symbol
        } Tokens. Thank you!`
      );

      success = true;
    } catch (error: any) {
      toast.error(
        error?.walk?.().shortMessage ||
          error?.walk?.().message ||
          error?.message ||
          "Signing failed, please try again!"
      );
    }

    setLoading(false);

    return { success, txHash: hash };
  };

  const addTokenAsset = async (token: Token) => {
    if (!token?.address || !signer) return;
    try {
      await signer.watchAsset({
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals ?? 18,
          image: token.image.includes("http")
            ? token.image
            : `${window.location.origin}${token.image}`,
        },
      });

      toast.success("Token imported to metamask successfully");
    } catch (e) {
      toast.error("Token import failed");
    }
  };

  const parse = (value: number) =>
    parseUnits(`${value}`, config.saleToken[currentChain.id].decimals);

  const format = (value: bigint) =>
    formatUnits(value, config.saleToken[currentChain.id].decimals);

  return {
    loading,
    currentChain,
    parse,
    format,
    buyToken,
    addTokenAsset,
    fetchLockedBalance,
    fetchTokenBalances,
    fetchIntialData,
  };
};

export default useWeb3Functions;
