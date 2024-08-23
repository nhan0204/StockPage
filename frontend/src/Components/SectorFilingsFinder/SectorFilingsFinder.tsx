import React, { useEffect, useState } from 'react';
import { getCompanySectorFilings } from '../../api';
import { CompanySectorFilings } from '../../company';
import Spinner from '../Spinner/Spinner';
import SectorFilingsItem from './SectorFilingsItem/SectorFilingsItem';
import { v4 as uuidv4 } from 'uuid';
import Tag from '../Tag/Tag';

interface SectorFilingsProps {
    ticker: string | undefined;
    className: string;
}

const SectorFilings: React.FC<SectorFilingsProps> = ({ ticker, className }) => {
    const [filingsData, setFilingsData] = useState<CompanySectorFilings[]>([]);

    const getSectorFillingsInit = async () => {
        if (typeof ticker === "undefined")
            return;

        const result = await getCompanySectorFilings(ticker);

        if (typeof result === "string") {
            console.log("Server error: ", result);
        } else if (Array.isArray(result.data)) {
            setFilingsData(result.data);
        }
    }

    useEffect(() => {
        getSectorFillingsInit();
    }, [ticker])


    return (
        <div className={`container  ${className}`}>
            <Tag className='mb-1 pl-2' head='Sector' tail='Fillings' />
            {filingsData ? (
                <div className='flex flex-col max-w-fit py-2 pl-2 pr-4 bg-white shadow-xl rounded-xl'>
                    {filingsData?.slice(0, 5).map(sector =>
                        <SectorFilingsItem id={sector.symbol} key={uuidv4()} sector={sector} />
                    )}
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default SectorFilings;