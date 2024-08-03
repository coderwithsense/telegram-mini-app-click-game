"use client";

import { Placeholder, Text } from "@telegram-apps/telegram-ui";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

import CoinImage from "../_assets/image.png";
import GuyImage from "../_assets/guy.jpg";
import GirlImage from "../_assets/girl.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProgressComponent from "@/components/Progress";

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

  const onClickGirl = () => {
    // Animated coin
    const girlImage = document.getElementById("girlImage");
    if (girlImage) {
      girlImage.classList.add("bounce");
      girlImage.addEventListener(
        "animationend",
        () => {
          girlImage.classList.remove("bounce");
        },
        { once: true }
      );

      // Create and animate heart
      const heart = document.createElement("div");
      heart.className = "icon";
      heart.style.left = `${
        girlImage.offsetLeft + girlImage.offsetWidth / 2
      }px`;
      heart.style.top = `${girlImage.offsetTop}px`;
      document.body.appendChild(heart);
      heart.addEventListener(
        "animationend",
        () => {
          heart.remove();
        },
        { once: true }
      );

      // Add heart icon
      const heartIcon = document.createElement("div");
      heartIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="pink" width="50px" height="50px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      heart.appendChild(heartIcon);
    }

    // Compute the new balance and clicks
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
  }

  const onClickGuy = () => {
    // Animated coin
    const guyImage = document.getElementById("guyImage");
    if (guyImage) {
      guyImage.classList.add("bounce");
      guyImage.addEventListener(
        "animationend",
        () => {
          guyImage.classList.remove("bounce");
        },
        { once: true }
      );

      // Create and animate star
      const star = document.createElement("div");
      star.className = "icon";
      star.style.left = `${guyImage.offsetLeft + guyImage.offsetWidth / 2}px`;
      star.style.top = `${guyImage.offsetTop}px`;
      document.body.appendChild(star);
      star.addEventListener(
        "animationend",
        () => {
          star.remove();
        },
        { once: true }
      );

      // Add star icon
      const starIcon = document.createElement("div");
      starIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" width="50px" height="50px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      star.appendChild(starIcon);
    }

    // Compute the new balance and clicks
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
  }

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
      <div className="flex justify-between items-center">
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
          {wallet && (
            <div className="flex flex-col items-center p-10">
              <div>Connected Wallet: {wallet.account.address}</div>
              <div>Connected Chain: {wallet.account.chain}</div>
            </div>
          )}
        </div>
        <div className="m-4 space-y-4">
          <ProgressComponent
            value={clicks}
            color="pink"
            image={GirlImage}
            width={60}
          />
          <ProgressComponent
            value={balance}
            color="blue"
            image={GuyImage}
            width={60}
          />
        </div>
      </div>

      <div className="flex justify-evenly">
        <Image
          id="guyImage"
          onClick={onClickGuy}
          src={GuyImage}
          alt="Coin"
          width={200}
          height={200}
          className="border-4 border-solid rounded-full"
        />
        <Image
          id="girlImage"
          onClick={onClickGirl}
          src={GirlImage}
          alt="Coin"
          width={200}
          height={200}
          className="border-4 border-solid rounded-full"
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
