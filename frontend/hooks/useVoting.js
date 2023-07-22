import { useState, useEffect, useContext } from "react";
import { useWagmi } from "./useWagmi";

import {
  getWalletClient,
  getContract,
  prepareWriteContract,
  writeContract,
  readContract,
  watchContractEvent,
} from "@wagmi/core";

import { parseAbiItem } from "viem";

import { config, client } from "@/config/index";

const contractAddress = config.contracts.Voting.address;
const contractABI = config.contracts.Voting.abi;

export function useVoting() {}
