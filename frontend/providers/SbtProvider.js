import { createContext, useMemo } from "react";
import { useSbt } from "@/hooks/useSbt";

export const SbtContext = createContext();

export const SbtProvider = ({ children }) => {
  const {
    // State contract
    contract,

    // Functions
    mint,
    burn,
    update,
    getSoul,

    // Events

    // Data
  } = useSbt();

  const values = useMemo(
    () => ({
      // State contract
      contract,

      // Functions
      mint,
      burn,
      update,
      getSoul,

      // Events

      // Data
    }),
    [
      // State contract
      contract,

      // Functions
      mint,
      burn,
      update,
      getSoul,

      // Events

      // Data
    ]
  );

  return <SbtContext.Provider value={values}>{children}</SbtContext.Provider>;
};
