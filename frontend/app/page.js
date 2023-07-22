"use client";

import Image from "next/image";
import backimg from "../components/img/background.png";
import logo from "../components/img/logo.png";
import {
  Heading,
  Text,
  CardFooter,
  CardBody,
  CardHeader,
  Button,
  Card,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";

export default function Home() {
  // Wagmi
  const { isConnected, isDisconnected } = useAccount();
  return (
    <main>
      <div>
        {isConnected ? (
          <Card
            padding={4}
            margin={5}
            bgGradient="radial(gray.300, yellow.400, pink.200)"
          >
            <CardHeader
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={logo} height={100} alt="Logo BCS" />
              <Heading margin={5}>BC - Sport</Heading>
            </CardHeader>
            <CardBody align="center">
              <Text margin={5}>Le portail des associations sportives</Text>
              <Image src={backimg} alt="color sportif" />
            </CardBody>
            <CardFooter
              display="flex"
              alignItems="center"
              justifyContent="center"
            ></CardFooter>
          </Card>
        ) : (
          <Card
            padding={4}
            margin={5}
            bgGradient="radial(gray.300, yellow.400, pink.200)"
          >
            Please connect your wallet
          </Card>
        )}
      </div>
    </main>
  );
}
