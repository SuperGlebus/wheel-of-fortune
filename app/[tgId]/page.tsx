"use client";

import Image from "next/image";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import { Prize } from "@/components/Prize/Prize";
import { PrizeEntity } from "@/lib/db/definitions";
import { ErrorPopupWindow, PopupWindow } from "@/components/PopupWindow/PopupWindow";
import { useSearchParams } from "next/navigation";
import { addToMetrics, getRandomPrize, winPrize } from "@/lib/api";

export default function Home({ params }: { params: Promise<{ tgId: string }> }) {
    let rotation = 0;
    const [errorMessage, setErrorMessage] = useState("");
    const qParams = useSearchParams();
    const utm_medium = qParams.get("utm_medium");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
    const [tgId, setTgId] = useState("");
    const [currentPrize, setCurrentPrize] = useState<PrizeEntity | null>(null);

    useEffect(() => {
        const fetchTgId = async () => {
            const tgId = (await params).tgId;
            setTgId(tgId);
            if (tgId) {
                const prize = await getRandomPrize(tgId);
                if (prize) {
                    setCurrentPrize(prize);
                }
            }
        };
        fetchTgId();
    }, []);

    async function spinButton() {
        if (!currentPrize) {
            setErrorMessage("Призы закончились");
            setIsErrorPopupOpen(true);
            return;
        }
        if (!utm_medium || utm_medium === "0") {
            setErrorMessage("Попытки закончились");
            setIsErrorPopupOpen(true);
            return;
        }

        const degrees = Math.floor(currentPrize.id * 45 - Math.random() * 43) + 720;
        rotation += degrees;
        const wheel = document.querySelector("#wheel") as HTMLElement | null;
        if (!wheel) {
            console.error("wheel is null");
            return;
        }

        wheel.style.animation = "none";

        wheel.style.transition = "transform 3s ease-out";
        requestAnimationFrame(() => {
            wheel.style.transform = `rotate(${-rotation}deg)`;
        });

        setTimeout(async () => {
            const isWon = await winPrize(tgId, currentPrize.id);
            if (isWon) {
                addToMetrics(tgId, currentPrize.id);
                setIsPopupOpen(true);
            }

            if (wheel) {
                wheel.style.transform = "none";
                wheel.style.transition = "none";
                rotation = 0;

                wheel.style.animation = "2s spinner ease-in-out infinite";
            }
        }, 3200);
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wheelContainer}>
                    <Image
                        className={styles.ram}
                        src="/ram.png"
                        alt="ram"
                        width={400}
                        height={400}
                        priority
                    />
                    <Image
                        className={styles.wheel}
                        id="wheel"
                        src="/wheel.png"
                        alt="wheel"
                        width={400}
                        height={400}
                        priority
                    />
                    <Image
                        className={styles.arrow}
                        src="/arrow.png"
                        alt="wheel"
                        width={400}
                        height={400}
                        priority
                    />
                    <button className={styles.button} onClick={spinButton}>
                        <Image
                            className={styles.buttonImage}
                            src="/button.png"
                            alt="button"
                            width={85}
                            height={85}
                            priority
                        ></Image>
                        <h3 className={styles.buttonText}>Крутить</h3>
                        <Image
                            className={styles.buttonRam}
                            src="/buttonRam.png"
                            alt="button"
                            width={80}
                            height={80}
                            priority
                        ></Image>
                    </button>
                </div>
            </div>
            <div className={styles.prizesContainer}>
                <Image src="/bonuses.png" alt="logo" width={150} height={34} />
                <Prize color="white" price="990₽" image="/8.png">
                    <span className={styles.bold}>ТОП 3 способа раскачать ТГ канал</span> раскачать тг канал
                </Prize>
                <Prize color="white" price="5490₽" image="/4.png">
                    Мини–курс «Как получать подписчиков от <span className={styles.bold}>12 руб из Директа»</span>
                </Prize>
                <Prize color="white" price="990₽" image="/1.png">
                    Как получить от 30 <span className={styles.bold}>до 100 заявок за 48 часов</span>
                </Prize>
                <Prize color="yellow" price="2490₽" image="/6.png">
                    Схема продаж <span className={styles.bold}>через 3 Лендинга</span>
                </Prize>
                <Prize color="white" price="10 000₽/час" image="/3.png">
                    Личный Разбор
                    с пошаговым планом <span className={styles.bold}>на 500 тыс. руб</span>
                </Prize>
                <Prize color="white" price="" image="/7.png">
                    Скидка на продукты <span className={styles.bold}>30% на 24 часа</span>
                </Prize>
                <Prize color="white" price="" image="/2.png">
                    Скидка на продукты <span className={styles.bold}>50% на 1 час</span>
                </Prize>
                <Prize color="black" price="15 000 – 35 000₽" image="/5.png">
                    Бонус Х
                </Prize>
            </div>
            {currentPrize && <PopupWindow prize={currentPrize} isOpen={isPopupOpen} />}
            <ErrorPopupWindow message={errorMessage} isOpen={isErrorPopupOpen} />
        </div>
    );
}