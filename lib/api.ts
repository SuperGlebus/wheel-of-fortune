import { PrizeEntity } from "./db/definitions";



export const getRandomPrize = async (tgId: string): Promise<PrizeEntity | null> => {
    try {
        const res = await fetch(`/api/win?tgId=${tgId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        const prize: PrizeEntity = await res.json();
        return prize;

    } catch (error) {
        console.error(error);
        return null;
    }
}

export const winPrize = async (tgId: string, prizeId: number): Promise<boolean> => {
    try {
        const res = await fetch(`/api/win`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tgId, prizeId }),
        });
        const data = await res.json();
        console.log(data);
        return data.message === 'Приз выигран';
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const addToMetrics = async (tgId: string, prizeId: number) => {
    try {
        const response = await fetch('/api/metrics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tgId, prizeId }),
        });

        if (response.ok) {
            return
        } else {
            const data = await response.json();
            console.error('Ошибка при записи в Google Sheets:', data.message);
        }
    } catch (error) {
        console.error('Ошибка при вызове API:', error);
    }
}