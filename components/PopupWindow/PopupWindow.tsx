import { PrizeEntity } from "@/lib/db/definitions";
import styles from "@/components/PopupWindow/PopupWindow.module.css"
import cn from "classnames";
import Image from "next/image";

export function PopupWindow({ prize, isOpen }:
    {
        prize: PrizeEntity | null,
        isOpen: boolean
    }) {
    return (
        <div className={cn(styles.PopupWindow, {
            [styles.closed]: !isOpen
        })}>
            <div className={styles.Content}>
                <h2 className={styles.title}>Поздравляем!</h2>
                <p className={styles.text}>Вы выиграли приз!</p>
                <Image className={styles.Img} src={prize?.image || ""} alt={"приз"} width={150} height={150} priority />
                <p className={styles.name}>{prize?.name}</p>
                <p className={styles.price}>{prize?.price}</p>

                <a className={styles.Ref} href={prize?.url}><button className={styles.Button}>Забрать приз</button></a>
            </div>

        </div>
    );
}

export function ErrorPopupWindow({ message, isOpen }:
    {
        message: string,
        isOpen: boolean
    }) {
    return (
        <div className={cn(styles.PopupWindow, {
            [styles.closed]: !isOpen
        })}>
            <div className={cn(styles.Content, styles.ErrorContent)}>
                <h2 className={styles.title}>{message}</h2>
                <a className={styles.Ref} href={"https://t.me/wv_mars_bot"}>
                    <button className={styles.Button}>Перейти обратно в бот</button>
                </a>
            </div>
        </div>
    );
}