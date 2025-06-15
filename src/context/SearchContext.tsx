import { createContext } from "react";

export type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const SearchContext = createContext<SearchContextType | undefined>(undefined);
