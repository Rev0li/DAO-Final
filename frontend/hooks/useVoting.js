import { useState, useEffect, useContext } from "react";
import { useWagmi } from "./useWagmi";
import { config, client } from "@/config/index";
import { useNotif } from "@/hooks/useNotif";
import { getContract, writeContract, readContract } from "@wagmi/core";

const contractAddress = config.contracts.Voting.address;
const contractABI = config.contracts.Voting.abi;

export function useVoting() {
  const { isConnected, address, chain } = useWagmi();
  const { throwNotif } = useNotif();

  // State contract
  const [contract, setContract] = useState({});

  const loadContract = async () => {
    const Voting = getContract({
      address: contractAddress,
      abi: contractABI,
      account: address,
    });
    // Set state hook
    setContract(Voting);
  };

  // Function to add a voter to the whitelist
  const addVoter = async (_voterAddress) => {
    try {
      const data = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "addVoter",
        args: [_voterAddress],
        account: address,
      });
      throwNotif("success", "Voter added to the whitelist successfully.");
    } catch (error) {
      throwNotif("error", error.message);
    }
  };

  // Function to add a proposal
  const addProposal = async (_description) => {
    try {
      const data = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "addProposal",
        args: [_description],
        account: address,
      });
      return data;
    } catch (error) {
      throwNotif("error", error.message);
    }
  };

  // Function to add a vote (yes: 1, no: 2, neutral: 0)
  const addVote = async (_proposalId, _choice) => {
    try {
      const data = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "vote",
        args: [_proposalId, _choice],
        account: address,
      });
      return data;
    } catch (error) {
      throwNotif("error", error.message);
    }
  };

  //////////////////////////////////////////////////////
  // Function to get an array of proposals
  const getArrayProposal = async () => {
    try {
      const proposalCount = await contract.methods.proposalCount().call();
      const proposals = [];
      for (let i = 0; i < proposalCount; i++) {
        const proposal = await contract.methods.proposals(i).call();
        proposals.push({
          id: i,
          description: proposal.description,
        });
      }
      return proposals;
    } catch (error) {
      throwNotif("error", error.message);
      return [];
    }
  };

  // Function to get the decision of a vote (true: yes, false: no)
  const getDecisionOfVote = async (_proposalId) => {
    try {
      const proposal = await contract.methods.proposals(_proposalId).call();
      return proposal.voteDecision;
    } catch (error) {
      throwNotif("error", error.message);
      return false;
    }
  };
  //////////////////////////////////////////////////////
  // Call the loadContract function when the component mounts
  useEffect(() => {
    loadContract();
  }, [isConnected, address, chain]);

  return {
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
  };
}
