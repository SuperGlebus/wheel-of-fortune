import { PrizeProps } from "./prize.props";
import cn from "classnames";
import styles from "./Prize.module.css";
import Image from "next/image";


export function Prize({color, children, price, image}: PrizeProps) {
    return (
        <div className={cn(styles.prizeContainer, {
            [styles.yellow]: color === "yellow",
            [styles.white]: color === "white",
            [styles.black]: color === "black",
        }
        )}>
            <Image src={image} alt={"приз"} width={49} height={59}/>
            <p className={styles.name}>{children}</p>
            <p className={styles.price}>{price}</p>
        </div>
    )
}