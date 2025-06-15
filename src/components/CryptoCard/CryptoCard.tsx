import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useCallback } from "react";

type CryptoCardProps = {
  coinId: string;
  name?: string;
  symbol?: string;
  image?: string;
  currentPrice?: number;
  priceChange24h?: number;
  marketCap?: number;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
};

export const CryptoCard = ({
  coinId,
  name = "Bitcoin",
  symbol = "btc",
  image = "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  currentPrice = 68000,
  priceChange24h = 2.35,
  marketCap = 1300000000000,
  isFavorited,
  onToggleFavorite,
}: CryptoCardProps) => {
  const isPositive = priceChange24h >= 0;

  const handleFavouriteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onToggleFavorite(coinId);
    },
    [coinId, onToggleFavorite]
  );

  const textBase = "text-black dark:text-gray-200";

  return (
    <div
      className="relative bg-white dark:bg-black rounded-2xl shadow-lg border border-gray-200 p-6
                 sm:w-full h-full w-3/4 mx-auto
                 transition-transform hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Favorite Button */}
      <button
        onClick={handleFavouriteClick}
        className="absolute top-4 right-4 z-10"
        aria-label="Toggle favorite"
      >
        {isFavorited ? (
          <HeartIconSolid className="w-6 h-6 text-red-500" />
        ) : (
          <HeartIcon className="w-6 h-6 text-gray-400 hover:text-red-500" />
        )}
      </button>

      {/* Header */}
      <div className="flex items-center gap-5 mb-6">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full shadow-sm"
        />
        <div>
          <h2 className={`text-2xl font-bold ${textBase}`}>{name}</h2>
          <p className={`text-sm uppercase tracking-wide ${textBase}`}>
            {symbol}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4 text-base">
        {[
          {
            label: "Current Price",
            value: `$${currentPrice.toLocaleString()}`,
          },
          {
            label: "24h Change",
            value: `${priceChange24h.toFixed(2)}%`,
            badge: true,
            isPositive,
          },
          {
            label: "Market Cap",
            value: `$${marketCap.toLocaleString()}`,
          },
        ].map(({ label, value, badge, isPositive }) => (
          <div className="flex justify-between items-center" key={label}>
            <span className={`font-medium ${textBase}`}>{label}</span>
            {badge ? (
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  isPositive
                    ? "bg-green-300 text-green-600"
                    : "bg-red-300 text-red-600"
                }`}
              >
                {value}
              </span>
            ) : (
              <span className={`font-semibold ${textBase}`}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
