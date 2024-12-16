import { google } from 'googleapis';


import { NextResponse } from 'next/server';

// Идентификатор таблицы
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Аутентификация с использованием сервисного аккаунта
const auth = new google.auth.JWT({
    email: process.env.CLIENT_EMAIL,
    key: process.env.PRIVATE_KEY?.replaceAll('"', ''),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const prizesInSheet: Record<number, string> = {
    1: "C",
    2: "D",
    3: "E",
    4: "F",
    5: "G",
    6: "H",
    7: "I",
    8: "J",
};

// Инициализация Google Sheets API
const sheets = google.sheets({ version: 'v4', auth });

export async function POST(req: Request) {
    const { tgId, prizeId } = await req.json();
    console.log(process.env.SPREADSHEET_ID, SPREADSHEET_ID);
    console.log(process.env.CLIENT_EMAIL, process.env.PRIVATE_KEY);

    try {
        // Проверка на неправильный идентификатор приза
        if (prizeId < 1 || prizeId > 8) {
            return NextResponse.json({ message: `Неправильный идентификатор приза: ${prizeId}` }, { status: 400 });
        }

        // Чтение данных из таблицы
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'B:K', 
        });

        const rows = response.data.values;
        if (!rows) {
            return NextResponse.json({ message: 'Таблица пуста.' }, { status: 404 });
        }

        let targetRowIndex = rows.findIndex((row) => row?.[0] === tgId);
        if (targetRowIndex === -1) {
            const resp = await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: 'B:K',
                valueInputOption: 'RAW',
                requestBody: {
                    values: [["", tgId, 0, 0, 0, 0, 0, 0, 0, 0]],
                },
            })
            if (resp.status !== 200) {
                return NextResponse.json({ message: 'Таблица пуста.' }, { status: 404 });
            }
            targetRowIndex = rows.length;
        }

        const targetRowNumber = targetRowIndex + 1;
        const range = `${prizesInSheet[prizeId]}${targetRowNumber}`;
        console.log(range);

        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: range,
            valueInputOption: 'RAW',
            requestBody: {
                values: [[1]],
            },
        });

        return NextResponse.json({ message: `Значение 1 успешно записано в ячейку ${range}.` }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при работе с Google Sheets:', error);
        return NextResponse.json({ message: 'Ошибка сервера.' }, { status: 500 });
    }
}