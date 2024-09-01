import { CompanyWeeklyDividend } from "../company";

interface Candle {
    x: string;
    y: [number, number, number, number, number];
}

export const formatStockData = (stockData: CompanyWeeklyDividend) => {
    const formattedData: Candle[] = [];

    if (stockData["Weekly Time Series"]) {
        Object.entries(
            stockData["Weekly Time Series"]
        ).slice(0, 100).map(
            ([key, value]) => {
                formattedData.push({
                    x: key,
                    y: [
                        value['1. open'],
                        value["2. high"],
                        value["3. low"],
                        value["4. close"],
                        value["5. volume"],
                    ]
                })
            }
        )
    }

    return formattedData;
}