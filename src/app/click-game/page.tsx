"use client";

import { Placeholder, Text } from "@telegram-apps/telegram-ui";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

import CoinImage from "../_assets/image.png";
import GuyImage from "../_assets/guy.jpg";
import GirlImage from "../_assets/girl.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

const ClickGame = () => {
  const wallet = useTonWallet();
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? parseInt(savedBalance, 10) : 0;
  });
  const [clicks, setClicks] = useState(() => {
    const savedClicks = localStorage.getItem("clicks");
    return savedClicks ? parseInt(savedClicks, 10) : 1000;
  });

  const onCoinClick = () => {
    setBalance((prev) => {
      const newBalance = prev + 1;
      localStorage.setItem("balance", newBalance.toString());
      return newBalance;
    });
    setClicks((prev) => {
      const newClicks = prev - 1;
      localStorage.setItem("clicks", newClicks.toString());
      return newClicks;
    });
  };

  // useEffect if clicks<1000, increase clicks by 1 every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (clicks < 1000) {
        setClicks((prev) => {
          const newClicks = prev + 1;
          localStorage.setItem("clicks", newClicks.toString());
          return newClicks;
        });
      }
    }, 500);
    return () => clearInterval(interval);
  }, [clicks]);

  return (
    <div className="bg-[url('https://wallpapers-clan.com/wp-content/uploads/2023/01/clouds-aesthetic-red-background.jpg')] bg-cover bg-center min-h-screen flex flex-col justify-between">
      {!wallet && (
        <Placeholder
          className="ton-connect-page__placeholder"
          header="Click Game"
          description={
            <>
              <TonConnectButton className="ton-connect-page__button" />
            </>
          }
        />
      )}
      {wallet && (
        <div className="flex flex-col items-center p-10">
          <div>Connected Wallet: {wallet.account.address}</div>
          <div>Connected Chain: {wallet.account.chain}</div>
        </div>
      )}
      <div className="flex justify-evenly">
        <Image
          onClick={onCoinClick}
          src={GuyImage}
          alt="Coin"
          width={200}
          height={200}
          className=""
        />
        <Image
          onClick={onCoinClick}
          src={GirlImage}
          alt="Coin"
          width={200}
          height={200}
          className=""
        />
      </div>
      <div className="text-3xl flex flex-col items-center">
        <div>Clicks: {clicks}</div>
        <div>Stream Balance: {balance}</div>
        <Text>Click the coin to increase your coin balance!</Text>
      </div>
    </div>
  );
};

export default ClickGame;
