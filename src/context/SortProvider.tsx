import { useState } from "react";
import type { ReactNode } from "react";
import { SortContext } from "./SortContext";
import type { SortOption } from "./SortContext";

export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [sortBy, setSortBy] = useState<SortOption>(null);

  return (
    <SortContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </SortContext.Provider>
  );
};
