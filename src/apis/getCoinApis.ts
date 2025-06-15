import axios from "axios";
import { BASE_COIN_GECKO_URL } from "utils/constants";

export type coinDetailsResponse = {
  image: {
    large: string;
  },
  name: string;
  symbol: string;
  description: {
    en: string
  };
  market_data: {
    current_price: { usd: number };
    market_cap:  { usd: number };
    total_volume:  { usd: number };
    circulating_supply: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
  }
}

export const coinApi = {
  getCoinDetail: (id: string) => {
    return axios.get<coinDetailsResponse>(
        `${BASE_COIN_GECKO_URL}/v3/coins/${id}`
      )
  },

  getCoins: (id: string, days: string) => {
    return axios.get(
      `${BASE_COIN_GECKO_URL}/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
  },
  getAllCoins: () => {
    return axios.get(
      `${BASE_COIN_GECKO_URL}/v3/coins/markets?vs_currency=usd`
    );
  }
}