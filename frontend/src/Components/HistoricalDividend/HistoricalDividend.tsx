import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { formatStockData } from '../../Helpers/StockDataFormatting';
import { getWeaklyDividend } from '../../Services/api';
import Tag from '../Tag/Tag';
import Chart from '../Chart/Chart';
import Spinner from '../Spinner/Spinner';

interface HistoricalDividendProps { }

const HistoricalDividend: React.FC<HistoricalDividendProps> = () => {
    const ticker = useOutletContext<string>();
    const [historicalDividend, setHistoricalDividend] = useState<any>();

    useEffect(() => {
        const getCompanyWeaklyDividend = async () => {
            const result = await getWeaklyDividend(ticker);

            
            if (typeof result === 'string') {
                console.error(`Failed to get weakly dividend: ${result}`);
            } else if("Information" in result.data) {
                console.error(`API limit reached: ${result.data["Information"]}`)
            } else {
                setHistoricalDividend(result.data);
            }
        }

        if (!historicalDividend) getCompanyWeaklyDividend();
    }, [ticker]);

    return (
        <div className='flex flex-col px-0 mx-auto lg:max-w-5xl xl:max-w-[88%] mt-8'>
            <Tag head='Historical' tail='Dividend' className='ml-8' />
            {historicalDividend ? (
                <Chart className='px-4' stockData={historicalDividend} />
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default HistoricalDividend;