import { coinApi } from "apis/getCoinApis";
import { useEffect, useState } from "react";

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

export const useCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const res = await coinApi.getAllCoins()
        const coinData = res.data;
        setCoins(coinData.slice(0, 50));
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
      setLoading(false);
    };

    fetchCoins();
  }, []);

  return { coins, loading };
};
