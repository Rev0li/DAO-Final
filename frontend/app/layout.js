"use client";
import { ChakraProvider } from "@chakra-ui/react";

import "@rainbow-me/rainbowkit/styles.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import { SbtProvider } from "@/providers/SbtProvider";
import RainbowkitProvider from "@/providers/RainbowkitProvider";
import { WagmiProvider } from "@/providers/WagmiProvider";
import { VotingProvider } from "@/providers/VotingProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RainbowkitProvider>
          <WagmiProvider>
            <ChakraProvider>
              <VotingProvider>
                <SbtProvider>
                  <Header />
                  {children}
                  <Footer />
                </SbtProvider>
              </VotingProvider>
            </ChakraProvider>
          </WagmiProvider>
        </RainbowkitProvider>
      </body>
    </html>
  );
}
