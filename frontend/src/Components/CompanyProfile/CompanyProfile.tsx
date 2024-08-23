import React from 'react';
import { useOutletContext } from 'react-router';
import SectorFilings from '../SectorFilingsFinder/SectorFilingsFinder';

interface CompanyProfileProps {} 

const CompanyProfile: React.FC<CompanyProfileProps> = () => {
    const ticker = useOutletContext<string>();

    console.log(ticker)

    return (
        <div className='mx-auto mt-12 max-w-5xl h-full flex flex-col px-0 '>
            <SectorFilings ticker={ticker} className='ml-5'/>
        </div>
    );
};

export default CompanyProfile;