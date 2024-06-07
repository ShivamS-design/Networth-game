import React, { useState, useEffect } from 'react';
import LeaderboardScore from './LeaderboardScore';
import { DynamicWidget, DynamicEmbeddedWidget, useUserWallets } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import './App.css';

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const Main = () => {
  const userWallets = useUserWallets();
  const [showNetworth, setShowNetworth] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [netWorthValue, updateNetworthValue] = useState(0);
  const [userIdValue, updateUserIdValue] = useState("");

  useEffect(() => {
    if (userWallets.length > 0) {
      const userId = userWallets[0].id;
      updateUserIdValue(userId);
     alert(JSON.stringify(userWallets))
  // checkUserExists(userId);
    }
  }, [userWallets]);

  const [leaderboardData, setLeaderboardData] = useState([]);

/*  useEffect(() => {
    fetch('https://backend-rose-xi.vercel.app/getusers')
      .then(response => response.json())
      .then(data => setLeaderboardData(data));
  }, []);

 */
 const checkUserExists = (userId) => {
  fetch(`https://backend-rose-xi.vercel.app/getuser?user_id=${userId}`)
    .then(response => response.json())
    .then(userData => {
      if (userData) {
        const currentCounterValue = parseInt(userData.counter);
        alert("fetched user: " + userData.counter);
        updateNetworthValue(currentCounterValue);
      } else {
        alert("User not found");
      }
    })
    .catch(error => alert('Error fetching user:', error));
};
  

  const NetworthPage = () => {
    return (
      <div>
        <h1 style={{ fontSize: "25px" }}><b>Net Worth</b>: {netWorthValue} Net</h1>
        <h1 style={{ fontSize: "25px" }}><b>My Multiplier</b>: {netWorthValue} Net</h1>
        {userWallets[0] && <h1><b>Account ID</b>: {userWallets[0].id}</h1>}
      </div>
    );
  };

  const Leaderboard = () => {
    return (
      <div className="leaderboard">
        
      </div>
    );
  };

  const handleViewNetworth = () => {
    setShowNetworth(true);
    setShowHome(false);
    setShowLeaderboard(false);
  };

  const handleViewHome = () => {
    setShowHome(true);
    setShowNetworth(false);
    setShowLeaderboard(false);
  };

  const handleViewLeaderboard = () => {
    setShowLeaderboard(true);
    setShowHome(false);
    setShowNetworth(false);
  };

  const isConnected = userWallets.some((wallet) => wallet.connected);

  return (
    <div className="body">
      <div className="flex flex-col items-center justify-center text-center">
  
         <div>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <DynamicWagmiConnector>
                  <DynamicEmbeddedWidget />
                </DynamicWagmiConnector>
              </QueryClientProvider>
            </WagmiProvider>
          </div>
        </div>
    </div>
  );
};

export default Main;
