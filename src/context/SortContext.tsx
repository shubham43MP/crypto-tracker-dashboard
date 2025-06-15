import { createContext } from "react";

export type SortOption = "price" | "market_cap" | "change" | null;

export type SortContextType = {
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
};

export const SortContext = createContext<SortContextType | undefined>(
  undefined
);
