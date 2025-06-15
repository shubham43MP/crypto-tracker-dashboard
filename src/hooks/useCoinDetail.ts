import { useEffect, useState } from "react";
import { coinApi, type coinDetailsResponse } from "apis/getCoinApis";

export type MarketData = {
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
};

export type PriceChartData = {
  dates: string[];
  prices: number[];
};

export type DurationPoints = "1" | "7" | "30";

export const durationMap: { [key: string]: DurationPoints } = {
  "24h": "1",
  "7d": "7",
  "30d": "30",
};

export const useCoinDetail = (
  id: string | undefined,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coinDetails, setCoinDetails] = useState<coinDetailsResponse>();
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [priceChartData, setPriceChartData] = useState<PriceChartData | null>(
    null
  );
  const [selectedDuration, setSelectedDuration] = useState<DurationPoints>(
    "7"
  );

  const handleDurationChange = (duration: DurationPoints) => {
    setSelectedDuration(duration);
  };
  

  useEffect(() => {
    if (!id) return;

    const fetchCoinDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const coinRes = await coinApi.getCoinDetail(id)
        const coinData = coinRes.data;

        setCoinDetails(coinData)
        setMarketData({
          current_price: coinData.market_data.current_price.usd,
          market_cap: coinData.market_data.market_cap.usd,
          total_volume: coinData.market_data.total_volume.usd,
          circulating_supply: coinData.market_data.circulating_supply,
          price_change_percentage_24h:
            coinData.market_data.price_change_percentage_24h,
          price_change_percentage_7d:
            coinData.market_data.price_change_percentage_7d,
          price_change_percentage_30d:
            coinData.market_data.price_change_percentage_30d,
        });
      } catch (err) {
        setError("Failed to fetch coin details: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  useEffect(() => {
    if (!id || !selectedDuration) return;

    const generateChartData = async () => {
      try {
        const chartRes = await coinApi.getCoins(id, selectedDuration)
        const chartData = chartRes.data;
        const uniqueDatesMap = new Map<string, number>();
        chartData.prices.forEach((entry: number[]) => {
          const dateStr = new Date(entry[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          uniqueDatesMap.set(dateStr, entry[1]);
        });

        setPriceChartData({
          dates: Array.from(uniqueDatesMap.keys()),
          prices: Array.from(uniqueDatesMap.values()),
        });
      } catch (err) {
        setError("Failed to fetch chart data: " + (err as Error).message);
      }
    };

    generateChartData();
  }, [id, selectedDuration]);

  const chartOptions: Highcharts.Options = {
    title: { text: "" },
    xAxis: {
      categories: priceChartData?.dates,
      title: { text: "Date" },
      labels: {
        rotation: -45,
        style: { fontSize: "12px" },
      },
    },
    yAxis: {
      title: { text: "Price (USD)" },
      labels: {
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject
        ) {
          return "$" + Number(this.value).toFixed(2);
        },
      },
    },
    tooltip: {
      valuePrefix: "$",
      shared: true,
    },
    series: [
      {
        name: `${name} Price`,
        data: priceChartData?.prices,
        color: "#f7931a",
        type: "line",
        marker: { enabled: true, radius: 3 },
        lineWidth: 2,
      },
    ],
    chart: {
      type: "line",
      height: 300,
      backgroundColor: "transparent",
    },
    credits: { enabled: false },
  };

  return {
    loading,
    error,
    coinDetails,
    marketData,
    priceChartData,
    chartOptions,
    selectedDuration,
    handleDurationChange
  };
};
