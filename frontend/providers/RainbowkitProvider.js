import { useEffect, useState } from "react";

// Rainbowkit
import "@rainbow-me/rainbowkit/styles.css";

import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  ledgerWallet,
  walletConnectWallet,
  coinbaseWallet,
  rainbowWallet,
  argentWallet,
  trustWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";

// Wagmi provider
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
  hardhat,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// wagmi config
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, sepolia, hardhat],
  [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID;
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      walletConnectWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: projectId }),
      trustWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      argentWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RainbowkitProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
