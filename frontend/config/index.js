import { mainnet, sepolia, hardhat } from "viem/chains";
import { createPublicClient, http, parseAbiItem } from "viem";
import ABIs from "@/config/ABIs.json";

export const config = {
  chain: process.env.NEXT_PUBLIC_CLIENT_CHAIN,
  contracts: {
    DAO: {
      address: process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS,
      abi: ABIs.DAO,
    },
    SBT: {
      address: process.env.NEXT_PUBLIC_SBT_CONTRACT_ADDRESS,
      abi: ABIs.SBT,
    },
    Voting: {
      address: process.env.NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS,
      abi: ABIs.Voting,
    },
  },
};

const chain =
  process.env.NEXT_PUBLIC_CLIENT_CHAIN === "mainnet"
    ? mainnet
    : process.env.NEXT_PUBLIC_CLIENT_CHAIN === "sepolia"
    ? sepolia
    : hardhat;

// Create client for Viem
export const client = createPublicClient({
  chain: chain,
  transport: http(),
});
