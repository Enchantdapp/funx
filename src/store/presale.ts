import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import config from "../config";

interface PresaleSlice {
  isSaleStarted: boolean;
  tokens: { [key: number]: Token[] };
  prices: { [key: string]: number };
  totalTokensSold: number;
  totalTokensforSale: number;
  // isPresaleStarted: boolean;
  minBuyLimit: number;
  maxBuyLimit: number;
}

const initialState: PresaleSlice = {
  tokens: config.whitelistedTokens,
  prices: {},
  totalTokensSold: 0,
  totalTokensforSale: 0,
  minBuyLimit: 200,
  maxBuyLimit: 50_000,
  isSaleStarted: true,
  // isPresaleStarted:
  //   config.presaleStartTime < Date.now() / 1000 ||
  //   new URLSearchParams(window?.location.search).get("version") == "2",
};

export const presaleSlice = createSlice({
  name: "presaleSlice",
  initialState,
  reducers: {
    setIsSaleStarted: (state, action: PayloadAction<boolean>) => {
      state.isSaleStarted = action.payload;
    },
    setTokenPrice: (
      state,
      action: PayloadAction<{ symbol: string; price: number }>
    ) => {
      state.prices[action.payload.symbol] = action.payload.price;
    },
    setTotalTokensSold: (state, action: PayloadAction<number>) => {
      state.totalTokensSold = action.payload;
    },
    setTotalTokensforSale: (state, action: PayloadAction<number>) => {
      state.totalTokensforSale = action.payload;
    },
    setMinBuyLimit: (state, action: PayloadAction<number>) => {
      state.minBuyLimit = action.payload;
    },
    setMaxBuyLimit: (state, action: PayloadAction<number>) => {
      state.maxBuyLimit = action.payload;
    },
  },
});

export const {
  setTokenPrice,
  setMaxBuyLimit,
  setMinBuyLimit,
  setIsSaleStarted,
  setTotalTokensSold,
  setTotalTokensforSale,
} = presaleSlice.actions;

export default presaleSlice.reducer;
