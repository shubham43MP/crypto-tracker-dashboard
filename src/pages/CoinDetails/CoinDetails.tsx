import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useParams } from "react-router-dom";
import { Spinner } from "components/Spinner/";
import { durationMap, useCoinDetail } from "hooks/useCoinDetail";
import { formatCompactNumber } from "utils/formatCompactNumber";
import { CoinHeader } from "./CoinHeader";
import { DetailRectangles } from "./DetailRectangles";


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
    handleDurationChange
  } = useCoinDetail(id);


  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg p-4 text-center">
        {error}
      </div>
    );
  }

  if (!marketData || !priceChartData) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 md:p-10 space-y-10 overflow-y-auto">
      {coinDetails && 
        <>
          <CoinHeader imageUrl={coinDetails.image.large} name={coinDetails.name} symbol={coinDetails.symbol} id={id} />
          <div
          className="prose max-w-none text-black dark:text-gray-200 text-sm max-h-48 overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: coinDetails.description.en || "" }}
        />
        </>
      }

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Current Price",
              value: `$${formatCompactNumber(marketData.current_price)}`,
            },
            {
              label: "Market Cap",
              value: `$${formatCompactNumber(marketData.market_cap)}`,
            },
            {
              label: "24h Volume",
              value: `$${formatCompactNumber(marketData.total_volume)}`,
            },
            {
              label: "Circulating Supply",
              value: formatCompactNumber(marketData.circulating_supply),
            },
          ].map(({ label, value }) => <DetailRectangles label={label} value={value} />)}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-gray-200">
            Performance
          </h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "24h", value: marketData.price_change_percentage_24h },
              { label: "7d", value: marketData.price_change_percentage_7d },
              { label: "30d", value: marketData.price_change_percentage_30d },
            ].map(({ label, value }) => {
              const isPositive = typeof value === "number" && value >= 0;
              return (
                <button
                  key={label}
                  onClick={() =>
                    handleDurationChange(durationMap[label] || "30"
                    )
                  }
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition cursor-pointer ${
                    selectedDuration ===
                    (label === "24h" ? "1" : label === "7d" ? "7" : "30")
                      ? "bg-gray-500 text-white"
                      : isPositive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {label}:{" "}
                  {typeof value === "number" ? value.toFixed(2) : value}%
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-gray-200">
            Price Chart (Last{" "}
            {selectedDuration === "1" ? "24h" : selectedDuration + " Days"})
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
