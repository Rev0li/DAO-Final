"use client";

import { useState, useEffect } from "react";

// Chakra-ui
import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

// Contract
import Contract from "@/config/Voting.json";
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199

import { client } from "@/config";

const Voting = () => {
  // CONTRACT ADDRESS
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  // Récupérer les events de session
  // client.watchContractEvent({
  //   address: contractAddress,
  //   abi: Contract.abi,
  //   eventName: "WorkflowStatusChange",
  //   onLogs: (logs) => setStatus(logs[0].args.newStatus),
  // });

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Flex
      w={"60%"}
      bg={"#6B4E71"}
      color={"#F5DDDD"}
      m={"auto"}
      p={"50px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex direction={"column"} width={"100%"}>
        <Alert status="info" justifyContent={"center"} mb={"30px"}>
          <AlertIcon />
          <AlertTitle color={"#000000"}>Here All proposals</AlertTitle>
        </Alert>

        <Heading as={"h1"} size={"xl"}>
          Ajouter une proposition
        </Heading>
        <Flex m={"15px"}>
          <Input
            placeholder="Entrez une proposition"
            onChange={(e) => setAddProposal(e.target.value)}
            style={{ marginRight: "10px" }}
          ></Input>
          <Button onClick={() => addOneProposal()}>Ajouter</Button>
        </Flex>

        <Accordion
          defaultIndex={[]}
          allowMultiple
          border={"1px #3A4454 solid"}
          borderRadius={"15px"}
          bg={"#F5DDDD"}
          color={"#3A4454"}
        >
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Liste :
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {proposalList.map((proposal) => (
                <div key={proposal.id}>
                  {proposal.id} : {proposal.description}
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default Voting;
