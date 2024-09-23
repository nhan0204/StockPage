import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CompanyPeerGroup } from '../../company';
import Spinner from '../Spinner/Spinner';
import './PeersGroupFinder.css';
import CompanyFinderItem from './PeersGroupItem/PeersGroupItem';
import { getCompanyPeersGroupAPI } from '../../Services/CompanyService';

interface CompanyFinderProps {
    ticker: string;
    className: string;
}

const CompanyFinder: React.FC<CompanyFinderProps> = ({ ticker, className }) => {
    const [companyData, setCompanyData] = useState<CompanyPeerGroup>();

    useEffect(() => {
        const getPeerGroupInit = async (ticker: string) => {
            if (typeof ticker === "undefined") return;
    
            const result = await getCompanyPeersGroupAPI(ticker);
    
            if (typeof result === "string") {
                console.log("api error: ", result);
            } else if (Array.isArray(result!.data)) {
                const peerList = result!.data.filter(company => company !== ticker);
                setCompanyData({ peerList: peerList });
            }
        }

        getPeerGroupInit(ticker);

    }, [ticker]);

    return (
        <>
            <div id='peers' className={className}>
                {companyData ? (
                    <div id='placeholder' className='flex gap-4 h-16 pl-4 items-center overflow-y-hidden'>
                        {companyData.peerList.map(ticker =>
                            <CompanyFinderItem id={ticker} key={uuidv4()} ticker={ticker} />
                        )}
                    </div>
                ) : (
                    <Spinner />
                )}
            </div>
        </>
    );
};

export default CompanyFinder;