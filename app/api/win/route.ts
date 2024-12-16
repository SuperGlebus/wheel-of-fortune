
import { getNotWonPrize, winPrize } from '@/lib/db/db';
import { PrizeEntity } from '@/lib/db/definitions';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
    const { tgId, prizeId } = await req.json();
    try {
        const wonPrize = await winPrize(tgId, prizeId);
        if (wonPrize) {
            return NextResponse.json({ message: 'Приз выигран' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Приз не выигран' }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Произошла ошибка' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const tgId = searchParams.get('tgId');
    try {
        if (!tgId) {
            return NextResponse.json({ message: 'tgId или prizeId не указаны' }, { status: 400 });
        }
        const randomPrize: PrizeEntity | null = await getNotWonPrize(tgId);
        if (randomPrize) {
            return NextResponse.json({ id: randomPrize.id, name: randomPrize.name, image: randomPrize.image, price: randomPrize.price, url: randomPrize.url }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Произошла ошибка' }, { status: 500 });
    }
}