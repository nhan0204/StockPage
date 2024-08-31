import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { CompanyWeeklyDividend } from '../../company';
import { getWeaklyDividend } from '../../Services/api';
import Tag from '../Tag/Tag';

interface HistoricalDividendProps {} 

const HistoricalDividend: React.FC<HistoricalDividendProps> = () => {
    const ticker = useOutletContext<string>();
    const [historicalDividend, setHistoricalDividend] =  useState<CompanyWeeklyDividend>();

    useEffect(() => {
        const getCompanyWeaklyDividend = async() => {
            const result = await getWeaklyDividend(ticker);

            if (typeof result === 'string') {
                throw new Error(`Failed to get weakly dividend :${result}`);
            } else if(typeof result === 'object') {
                console.log(result);
            }
        }

        getCompanyWeaklyDividend();
    }, [ticker]);

    // if (historicalDividend) console.log(historicalDividend);

    return (
        <div className='flex flex-col px-0 mx-auto lg:max-w-5xl xl:max-w-[88%] mt-8'>
            <Tag head='Historical' tail='Dividend' className='ml-8'/>
        </div>
    );
};

export default HistoricalDividend;