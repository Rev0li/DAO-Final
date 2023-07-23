"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useVoting } from "@/hooks/useVoting";
import { useWagmi } from "@/hooks/useWagmi";

const Proposal = () => {
  const { isConnected, address, chain } = useWagmi();
  const { addProposal, getArrayProposal, addVote, getDecisionOfVote } =
    useVoting();

  const [newProposal, setNewProposal] = useState("");

  const handleNewProposalChange = (e) => {
    setNewProposal(e.target.value);
  };

  const handleAddProposal = () => {
    addProposal(newProposal);
    setNewProposal("");
  };

  const [proposals, setProposals] = useState([]);

  // Utilise useEffect pour récupérer les propositions une fois que l'utilisateur est connecté
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const proposalsData = await getArrayProposal();
        setProposals(proposalsData);
      } catch (error) {
        // Gérer les erreurs ici, si nécessaire
      }
    };

    if (isConnected) {
      fetchProposals();
    }
  }, [isConnected]);

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
      {isConnected ? (
        <Flex direction={"column"} width={"100%"}>
          <Heading as={"h1"} size={"xl"}>
            Ajouter une proposition
          </Heading>
          <Flex m={"15px"}>
            <Input
              placeholder="Entrez une proposition"
              value={newProposal}
              onChange={handleNewProposalChange}
              style={{ marginRight: "10px" }}
            />
            <Button onClick={handleAddProposal}>Ajouter une proposition</Button>
          </Flex>

          <Text>
            Nombre de proposition : {getArrayProposal.length}
            <br />
          </Text>

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
                {proposals.map((proposal) => (
                  <div key={proposal.id}>
                    {proposal.id} : {proposal.description}
                    <Button onClick={() => addVote(proposal.id, 1)}>
                      Accept
                    </Button>
                    <Button onClick={() => addVote(proposal.id, 2)}>
                      Reject
                    </Button>
                    <Button onClick={() => addVote(proposal.id, 0)}>
                      Neutre
                    </Button>
                    <Text>
                      Decision du vote :{" "}
                      {getDecisionOfVote(proposal.id) ? "Yes" : "No"}
                    </Text>
                  </div>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      ) : (
        <Text>Please connect your wallet</Text>
      )}
    </Flex>
  );
};

export default Proposal;
