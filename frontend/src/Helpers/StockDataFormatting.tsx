import { CompanyDividend } from "../company";
import { chartConfigs } from "../Components/Chart/ChartConfigs";

interface Candle {
    x: string;
    y: [number, number, number, number, number];
}

type key = keyof typeof chartConfigs;

export const formatStockData = (filter: key, stockData: CompanyDividend) => {
    const formattedData: Candle[] = [];

    if (stockData["Time Series (Daily)"]) {
        Object.entries(
            stockData["Time Series (Daily)"]
        ).slice(0, chartConfigs[filter]).map(
            ([key, value]) => {
                formattedData.push({
                    x: key,
                    y: [
                        value["1. open"],
                        value["2. high"],
                        value["3. low"],
                        value["4. close"],
                        value["6. volume"],
                    ]
                })
            }
        )
    }

    return formattedData;
}