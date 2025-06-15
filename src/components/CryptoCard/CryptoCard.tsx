import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

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

  const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite(coinId);
  }

  return (
    <div
      className="relative bg-white dark:bg-black rounded-2xl shadow-lg border border-gray-200 p-6
             sm:w-full h-full w-3/4 
             transition-transform hover:scale-[1.02] hover:shadow-xl
             mx-auto"
    >
      <div className="mb-2">
        <button
          onClick={handleFavouriteClick}
          className="absolute top-4 right-4 z-10"
        >
          {isFavorited ? (
            <HeartIconSolid className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-gray-400 hover:text-red-500" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-5 mb-6">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full shadow-sm"
        />
        <div>
          <h2 className="text-2xl text-black dark:text-gray-200 font-bold">
            {name}
          </h2>
          <p className="text-sm text-black dark:text-gray-200 uppercase tracking-wide">
            {symbol}
          </p>
        </div>
      </div>

      <div className="space-y-4 text-base">
        <div className="flex justify-between">
          <span className="text-black dark:text-gray-200 font-medium">
            Current Price
          </span>
          <span className="text-black dark:text-gray-200 font-semibold">
            ${currentPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-black dark:text-gray-200 font-medium">
            24h Change
          </span>
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${
              isPositive
                ? "bg-green-300 text-green-600"
                : "bg-red-300 text-red-600"
            }`}
          >
            {priceChange24h.toFixed(2)}%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-black dark:text-gray-200 font-medium">
            Market Cap
          </span>
          <span className="text-black dark:text-gray-200 font-semibold">
            ${marketCap.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
