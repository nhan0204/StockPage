import React, { useEffect, useState } from 'react';
import { getCompanySectorFilings } from '../../api';
import { CompanySectorFilings } from '../../company';
import Spinner from '../Spinner/Spinner';
import SectorFilingsItem from './SectorFilingsItem/SectorFilingsItem';
import {v4 as uuidv4} from 'uuid';

interface SectorFilingsProps {
    ticker: string | undefined;
} 

const SectorFilings: React.FC<SectorFilingsProps> = ({ ticker }) => {
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
        <div>
            { filingsData ? (
                filingsData?.slice(0, 5).map(sector => 
                    <SectorFilingsItem id={sector.symbol} key={uuidv4()} sector={sector}/>
                )
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default SectorFilings;