import React from 'react';
import { useOutletContext } from 'react-router';
import SectorFilings from '../SectorFilingsFinder/SectorFilingsFinder';

interface CompanyProfileProps {} 

const CompanyProfile: React.FC<CompanyProfileProps> = () => {
    const ticker = useOutletContext<string>();

    console.log(ticker)

    return (
        <div className='ml-10 mt-10'>
            <SectorFilings ticker={ticker}/>
        </div>
    );
};

export default CompanyProfile;