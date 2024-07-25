"use client";

import { Placeholder, Text } from "@telegram-apps/telegram-ui";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

import CoinImage from "../_assets/image.png";
import Image from "next/image";
import { useEffect, useState } from "react";

const ClickGame = () => {
  const wallet = useTonWallet();
  const [balance, setBalance] = useState(0);
  const [clicks, setClicks] = useState(1000);

  const onCoinClick = () => {
    setBalance((prev) => prev + 1);
    setClicks((prev) => prev - 1);
  };

  // useEffect if clicks<1000, increase clicks by 1 every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (clicks < 1000) {
        setClicks((prev) => prev + 1);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [clicks]);

  return (
    <div>
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
      <div className="flex flex-col items-center p-20">
        <Image
          onClick={onCoinClick}
          src={CoinImage}
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
