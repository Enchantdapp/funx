import {
  avalanche,
  bsc,
  bscTestnet,
  mainnet,
  polygon,
  fantom, goerli,
} from "viem/chains";

export const presaleStartTime = 1693432800;

const config = {
  chains: [goerli, mainnet],
  chainDetails: {
    [mainnet.id]: {
      name: "Ethereum",
      img: "/img/chains/ethereum.svg",
    },
    [bsc.id]: {
      name: "BSC",
      img: "/img/chains/binance.svg",
    },
    [bscTestnet.id]: {
      name: "BSC Testnet",
      img: "/img/chains/binance.svg",
    },
    [goerli.id]: {
      name: "Goerli Testnet",
      img: "https://www.cdnlogo.com/logos/e/81/ethereum-eth.svg",
    },
    [polygon.id]: {
      name: "Polygon",
      img: "/img/chains/polygon-matic-logo.svg",
    },
    [avalanche.id]: {
      name: "Avalanche",
      img: "/img/chains/avalanche.svg",
    },
    [fantom.id]: {
      name: "Fantom",
      img: "/img/chains/fantom.webp",
    },
  } as {
    [key: number]: {
      name: string;
      img: string;
    };
  },

  stage: {
    name: "Stage 1",
    total: 5_000_000, // total sale amount
  },

  presaleContract: {
    [mainnet.id]: "0xfad6367E97217cC51b4cd838Cc086831f81d38C2",
    [goerli.id]: "0x5d6d18Db2488f17dd10ed5dc663A829fa5F16f3B",
  } as { [chainId: number]: Address }, // presale contract address

  saleToken: {
    [mainnet.id]: {
      symbol: "Retik", // token symbol
      name: "RetikToken", // token name
      image: "/img/tokens/logoipsum-298.svg", // token image
      decimals: 18, // token decimals
    },
    [goerli.id]: {
      symbol: "Retik", // token symbol
      name: "RetikToken", // token name
      image: "/img/tokens/logoipsum-298.svg", // token image
      decimals: 18, // token decimals
    },
  } as { [chainId: number]: Token },

  displayPrice: {
    [mainnet.id]: "ETH",
    [goerli.id]: "ETH",
  } as { [chainId: number]: string }, // token symbol to display price in

  whitelistedTokens: {
     [mainnet.id]: [
      {
        address: null,
        symbol: "ETH",
        name: "Ethereum Token",
        image: "https://www.cdnlogo.com/logos/e/81/ethereum-eth.svg",
        decimals: 18,
      },
       {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
         symbol: "USDT",
         name: "USDT Coin",
        image: "/img/tokens/usdt.webp",
        decimals: 6,
      },
    ],
    [goerli.id]: [
      {
        address: null,
        symbol: "ETH",
        name: "Ethereum Token",
        image: "https://www.cdnlogo.com/logos/e/81/ethereum-eth.svg",
        decimals: 18,
      },
       {
        address: "0xfad6367E97217cC51b4cd838Cc086831f81d38C2",
         symbol: "USDT",
         name: "USDT Coin",
        image: "/img/tokens/usdt.webp",
        decimals: 6,
      },
    ],
  } as { [key: number]: Token[] },
};

export default config;
