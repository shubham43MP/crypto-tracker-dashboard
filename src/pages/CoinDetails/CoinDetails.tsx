import { useParams } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import clsx from "clsx";
import { Spinner } from "components/Spinner/";
import { durationMap, useCoinDetail, type MarketData } from "pages/CoinDetails/useCoinDetail";
import { formatCompactNumber } from "utils/formatCompactNumber";
import { CoinHeader } from "./CoinHeader";
import { DetailRectangles } from "./DetailRectangles";
import { ErrorScreen } from "components/ErrorScreen";

const marketStats = (data: MarketData) => [
  { label: "Current Price", value: `$${formatCompactNumber(data.current_price)}` },
  { label: "Market Cap", value: `$${formatCompactNumber(data.market_cap)}` },
  { label: "24h Volume", value: `$${formatCompactNumber(data.total_volume)}` },
  { label: "Circulating Supply", value: formatCompactNumber(data.circulating_supply) },
];

const performanceDurations = ["24h", "7d", "30d"] as const;

export const CoinDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    loading,
    error,
    coinDetails,
    marketData,
    priceChartData,
    selectedDuration,
    chartOptions,
    handleDurationChange,
  } = useCoinDetail(id);

  if (loading) return <Spinner />;

  if (error) return <ErrorScreen error={error} />;
  
  if (!marketData || !priceChartData) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-6xl p-6 md:p-10 space-y-10 rounded-xl shadow-lg bg-white dark:bg-gray-700 overflow-y-auto">
        {coinDetails && (
          <>
            <CoinHeader
              imageUrl={coinDetails.image.large}
              name={coinDetails.name}
              symbol={coinDetails.symbol}
              id={id}
            />
            <div
              className="prose max-w-none text-black dark:text-gray-200 text-sm overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html: coinDetails.description.en || "",
              }}
            />
          </>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {marketStats(marketData).map(({ label, value }) => (
            <DetailRectangles key={label} label={label} value={value} />
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-gray-200">
            Performance
          </h2>
          <div className="flex flex-wrap gap-4">
            {performanceDurations.map((label) => {
              const value = marketData[`price_change_percentage_${label}` as const];
              const isPositive = typeof value === "number" && value >= 0;
              const durationKey = durationMap[label] || "30";
              const isSelected = selectedDuration === durationKey;

              return (
                <button
                  key={label}
                  onClick={() => handleDurationChange(durationKey)}
                  className={clsx(
                    "px-4 py-2 rounded-md font-semibold text-sm transition cursor-pointer",
                    {
                      "bg-gray-500 text-white": isSelected,
                      "bg-green-100 text-green-700": !isSelected && isPositive,
                      "bg-red-100 text-red-700": !isSelected && !isPositive,
                    }
                  )}
                >
                  {label}: {typeof value === "number" ? value.toFixed(2) : "--"}%
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-gray-200">
            Price Chart (
            {selectedDuration === "1" ? "24h" : `${selectedDuration} Days`})
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto dark:bg-gray-600">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
