 "use client";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  let rotation = 0;
  let numOfPrize = 8;

  function spinButton() {
    console.log("spin");
    const degrees = Math.floor(8 * 45 - Math.random() * 45) + 720;
    rotation += degrees;
    const wheel = document.querySelector('#wheel') as HTMLElement;
    if (wheel) {
      wheel.style.transition = "transform 3s ease-out";
      wheel.style.transform = `rotate(${-rotation}deg)`;
    }

    setTimeout(() => {
      console.log("stop");
      if (wheel) {
        wheel.style.transform = "none";
        wheel.style.transition = "none";
        rotation -= rotation;
      }
    }, 5000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wheelContainer}>
        <Image className={styles.ram} src="/ram.png" alt="ram" width={400} height={400} />
        <Image className={styles.wheel} id="wheel" src="/wheel.png" alt="wheel" width={400} height={400} />
        <Image className={styles.arrow} src="/arrow.png" alt="wheel" width={400} height={400} />
        <button className={styles.button} onClick={spinButton}>
          
          
          
          <Image className={styles.buttonImage} src="/button.png" alt="button" width={85} height={85}></Image>
          <h3 className={styles.buttonText}>Крутить</h3>
          <Image className={styles.buttonRam} src="/buttonRam.png" alt="button" width={80} height={80}></Image>
        </button>
      </div>
    </div>
  );
}