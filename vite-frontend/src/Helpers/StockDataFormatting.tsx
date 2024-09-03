import { CompanyDividend } from "../company";
import { chartConfigs, ChartFilterKeys } from "../Components/Chart/ChartConfigs";

interface Candle {
    x: string;
    y: [number, number, number, number, number];
}

export const formatStockData = (filter: ChartFilterKeys, stockData: CompanyDividend) => {
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
                        value["5. volume"],
                    ]
                })
            }
        )
    }

    return formattedData;
}