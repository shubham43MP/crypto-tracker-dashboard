import { useContext, useState } from "react";
import { SortContext } from "context/SortContext";
import { useSearch } from "hooks/useSearch";
import { useCoins } from "hooks/useCoins";
import { useToggle } from "hooks/useToggle";
import { usePagination } from "hooks/usePagination";

export const useHome = () => {
    const [favoritesOnly, toggleFavouritesOnly] = useToggle(false);

    const { searchQuery } = useSearch();
    const { coins, loading } = useCoins();
    const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem("favorites") || "[]"));
  
    const toggleFavorite = (id: string) => {
      const updated = favorites.includes(id)
        ? favorites.filter((fid) => fid !== id)
        : [...favorites, id];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    };
  
    const sortContext = useContext(SortContext);
    if (!sortContext)
      throw new Error("SortContext must be used within SortProvider");
  
    const { sortBy, setSortBy } = sortContext;
  
    const filteredCoins = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const sortedCoins = [...filteredCoins].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.current_price - a.current_price;
        case "change":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "market_cap":
          return b.market_cap - a.market_cap;
        default:
          return 0;
      }
    });
  
    const itemsPerPage = 10;
    const displayCoins = favoritesOnly
      ? sortedCoins.filter((coin) => favorites.includes(coin.id))
      : sortedCoins;


    const totalPages = Math.ceil(displayCoins.length / itemsPerPage);
    const {
      currentPage,
      goToNextPage,
      goToPrevPage,
    } = usePagination(totalPages)
    
    const indexOfLastCoin = currentPage * itemsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - itemsPerPage;
  
    const currentCoins = displayCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    return {
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
      } 
};
