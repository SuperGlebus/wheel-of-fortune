"use client";
import Image from "next/image";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import { getNotWonPrize, getWonPrizes, winPrize } from "../../lib/db/db";

export default function Home({ params }: { params: Promise<{ tgId: string }>}) {
  let rotation = 0;
  const [tgId, setTgId] = useState("");
  useEffect(() => {
    const fetchTgId = async () => {
      const tgId = (await params).tgId
      setTgId(tgId)
      console.log("TgId", tgId);
  }
    fetchTgId()
  }, []);

  async function spinButton() {
    console.log("spin");
    const numOfPrize = await getNotWonPrize(tgId).catch((error) => {
      console.log("Problem with getNotWonPrize");
      console.error(error);
      return null;
    });
    console.log(numOfPrize);

    if (!numOfPrize) {
      console.log("all prizes won");
      return;
    }

    const degrees = Math.floor(numOfPrize * 45 - Math.random() * 45) + 720;
    rotation += degrees;
    const wheel = document.querySelector("#wheel") as HTMLElement | null;
    if (!wheel) {
      console.error("wheel is null");
      return;
    }

    wheel.style.transition = "transform 3s ease-out";
    wheel.style.transform = `rotate(${-rotation}deg)`;

    setTimeout(() => {
      console.log("stop");
      if (wheel) {
        wheel.style.transform = "none";
        wheel.style.transition = "none";
        rotation -= rotation;
      }
    }, 4000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wheelContainer}>
        <Image
          className={styles.ram}
          src="/ram.png"
          alt="ram"
          width={400}
          height={400}
        />
        <Image
          className={styles.wheel}
          id="wheel"
          src="/wheel.png"
          alt="wheel"
          width={400}
          height={400}
        />
        <Image
          className={styles.arrow}
          src="/arrow.png"
          alt="wheel"
          width={400}
          height={400}
        />
        <button className={styles.button} onClick={spinButton}>
          <Image
            className={styles.buttonImage}
            src="/button.png"
            alt="button"
            width={85}
            height={85}
          ></Image>
          <h3 className={styles.buttonText}>Крутить</h3>
          <Image
            className={styles.buttonRam}
            src="/buttonRam.png"
            alt="button"
            width={80}
            height={80}
          ></Image>
        </button>
      </div>
    </div>
  );
}

