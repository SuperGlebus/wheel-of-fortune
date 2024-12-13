import supabase from "./supabaseClient";

const allPrizes = [
  {
    id: 8,
    name: "Топ 3 способа раскачать тг канал",
    description: "dasdasdas",
    image: "dasdasdas",
    price: 990,
  },
  // {
  //   id: 4,
  //   name: "Мини–курс «Как получать подписчиков от 12 руб из Директа»",
  //   description: "dasdasdas",
  //   image: "dasdasdas",
  //   price: 5490,
  // },
  // {
  //   id: 1,
  //   name: "Как получить от 30 до 100 заявок за 48 часов",
  //   description: "dasdasdas",
  //   image: "dasdasdas",
  //   price: 9990,
  // },
  // {
  //   id: 6,
  //   name: "Схема продаж через 3 Лендинга",
  //   description: "dasdasdas",
  //   image: "dasdasdas",
  //   price: 2490,
  // },
  // {
  //   id: 3,
  //   name: "Личный Разбор с пошаговым планом на 500 тыс. руб",
  //   description: "dasdasdas",
  //   image: "dasdasdas",
  //   price: "10 000₽/час",
  // },
  // {
  //   id: 2,
  //   name: "Скидка на продукты 30% на 24 часа",
  //   description: "dasdasdas",
  //   image: "dasdasdas",
  //   price: null,
  // },
  {
    id: 7,
    name: "Скидка на продукты 50% на 1 час",
    description: "dasdasdas",
    image: "dasdasdas",
    price: 122,
  },
  // {
  //   id: 5,
  //   name: "Бонус X",
  //   description: "dasdasdas",
  //   image: "dasdasdas",
  //   price: "15 000 - 35 000",
  // },
];

export async function winPrize(tgId: string, prizeId: number) {
  if (!tgId || prizeId < 0) {
    throw new Error('Invalid parameters');
  }
  try {
    const { error } = await supabase
      .from('prizes')
      .insert({ tgId: tgId, prizeId: prizeId });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getWonPrizes(tgId: string): Promise<Wins[]> {
  if (!tgId) {
    throw new Error('tgId is null or undefined');
  }
  try {
    const { data, error } = await supabase
      .from('prizes')
      .select('id, tgId, prizeId')
      .eq('tgId', tgId);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getNotWonPrize(tgId: string): Promise<number | null> {
  const wonPrizes = await getWonPrizes(tgId);
  console.log(wonPrizes);
  const notWonPrizes = allPrizes.filter(prize =>
    !wonPrizes.some(wonPrize => wonPrize.prizeId === prize.id)
  );
  if (notWonPrizes.length === 0) {
    return null;
  }
  const wonPrize = getRandomElement(notWonPrizes).id
  if (await winPrize(tgId, wonPrize)) {
    return wonPrize
  }else{
    throw new Error('Problem with winPrize');
  }
}

export interface Wins {
  id: number;
  tgId: string;
  prizeId: number;
}

function getRandomElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}