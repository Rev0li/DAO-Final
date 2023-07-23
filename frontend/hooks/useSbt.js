import { useState, useEffect, useContext } from "react";

import { getContract, writeContract, readContract } from "@wagmi/core";

import { config, client } from "@/config/index";
import { useWagmi } from "./useWagmi";
import { useNotif } from "@/hooks/useNotif";

const contractAddress = config.contracts.SBT.address;
const contractABI = config.contracts.SBT.abi;

export function useSbt() {
  const { isConnected, address, chain } = useWagmi();

  const { throwNotif } = useNotif();
  // ::::::::::: STATE :::::::::::
  const [contract, setContract] = useState({});

  const loadContract = async () => {
    const SBT = getContract({
      address: contractAddress,
      abi: contractABI,
      account: address,
    });
    // Set state hook
    setContract(SBT);
  };

  // ::::::::::: Contract Functions :::::::::::
  const getSoul = async () => {
    try {
      const data = await readContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getSoul",
        account: address,
      });
      return data;
    } catch (err) {
      throwNotif("error", err.message);
    }
  };

  const mint = async (_nom, _prenom, _dateNaissance, _grade, _license) => {
    try {
      const data = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "mint",
        args: [_nom, _prenom, _dateNaissance, _grade, _license],
        account: address,
      });
      return data;
    } catch (err) {
      throwNotif("error", err.message);
    }
  };

  const burn = async () => {
    try {
      const data = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "burn",
      });
      return data;
    } catch (err) {
      throwNotif("error", err.message);
    }
  };

  const update = async (soulData) => {
    try {
      const data = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "update",
        args: [soulData],
      });
      return data;
    } catch (err) {
      throwNotif("error", err.message);
    }
  };

  useEffect(() => {
    if (!isConnected) return;
    try {
      loadContract();
      // fetchStoredValues();
      // setUpListeners();
    } catch (error) {
      throwNotif("error", "Erreur lors du chargement du contrat.");
    }
  }, [isConnected, address, chain?.id]);
  // ::::::::::: Returned data :::::::::::
  return {
    // Static data
    contractAddress,
    address,

    // State contract
    contract,

    // Functions
    mint,
    burn,
    update,
    getSoul,

    // Events

    // Data
  };
}
