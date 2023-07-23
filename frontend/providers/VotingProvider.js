import { createContext, useMemo } from "react";
import { useVoting } from "@/hooks/useVoting";

export const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const {
    // Static data
    contractAddress,
    address,

    // State contract
    contract,

    // Functions
    addVoter,
    addProposal,
    addVote,
    getArrayProposal,
    getDecisionOfVote,
  } = useVoting();

  const values = useMemo(
    () => ({
      // Static data
      contractAddress,
      address,

      // State contract
      contract,

      // Functions
      addVoter,
      addProposal,
      addVote,
      getArrayProposal,
      getDecisionOfVote,
    }),
    [
      // Static data
      contractAddress,
      address,

      // State contract
      contract,

      // Functions
      addVoter,
      addProposal,
      addVote,
      getArrayProposal,
      getDecisionOfVote,
    ]
  );

  return (
    <VotingContext.Provider value={values}>{children}</VotingContext.Provider>
  );
};
