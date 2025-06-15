import { Link } from "react-router-dom";
import {
  BellIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "hooks/useTheme";
import { useSearch } from "hooks/useSearch";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <nav className="w-full bg-white dark:bg-gray-950 text-black dark:text-white py-4 px-6 flex items-center justify-between shadow-md transition-colors">
      <div className="hidden sm:flex items-center gap-2 text-lg font-semibold">
        <Link to="/">
          <img
            src="/public/bitcoin-btc-logo.png"
            alt="logo"
            className="size-10"
          />
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-1 mx-4 justify-center max-w-lg">
        <BanknotesIcon className="w-6 h-6 cursor-pointer" />
        <BellIcon className="w-6 h-6 cursor-pointer" />
        {theme === "dark" ? (
          <SunIcon className="w-6 h-6 cursor-pointer" onClick={toggleTheme} />
        ) : (
          <MoonIcon className="w-6 h-6 cursor-pointer" onClick={toggleTheme} />
        )}
        <div className="relative flex-1 max-w-md border rounded-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-800">
          Login
        </button>
        <button className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white">
          Sign Up
        </button>
      </div>
    </nav>
  );
};
