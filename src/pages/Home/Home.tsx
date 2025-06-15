import { Link } from "react-router-dom";
import { HeroBanner } from "components/HeroBanner/";
import { CryptoCard } from "components/CryptoCard/";
import { Spinner } from "components/Spinner/";
import { type SortOption } from "context/SortContext";
import { Pagination } from "components/Pagination";
import { useHome } from "./useHome";

export const Home = () => {
  const {
    loading,
    favoritesOnly,
    sortBy,
    currentCoins,
    favorites,
    currentPage,
    totalPages,
    toggleFavouritesOnly,
    setSortBy,
    toggleFavorite,
    goToPrevPage,
    goToNextPage,
  } = useHome()

  return (
    <>
      <HeroBanner />
      <main className="bg-amber-50 dark:bg-gray-950 min-h-screen py-8 px-4">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="max-w-7xl mx-auto mb-6 flex sm:flex-row flex-col justify-between">
              <button
                onClick={toggleFavouritesOnly}
                className={`w-1/2 max-w-32 sm:m-0 my-2 mx-auto px-4 py-2 rounded-md font-medium border cursor-pointer ${
                  favoritesOnly
                    ? "bg-red-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                }`}
              >
                {favoritesOnly ? "Show All" : "Favorites"}
              </button>

              <div className="flex items-center mx-auto sm:mx-1">
                <label
                  htmlFor="sort"
                  className="text-gray-700 dark:text-gray-200 font-medium mr-2"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy ?? ""}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md p-2"
                >
                  <option value="">None</option>
                  <option value="price">Price</option>
                  <option value="market_cap">Market Cap</option>
                  <option value="change">24h Change</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {currentCoins.map((coin) => (
                <Link key={coin.id} to={`/coin/${coin.id}`}>
                  <CryptoCard
                    coinId={coin.id}
                    name={coin.name}
                    symbol={coin.symbol}
                    image={coin.image}
                    currentPrice={coin.current_price}
                    priceChange24h={coin.price_change_percentage_24h}
                    marketCap={coin.market_cap}
                    isFavorited={favorites.includes(coin.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
        <Pagination
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </main>
    </>
  );
};
