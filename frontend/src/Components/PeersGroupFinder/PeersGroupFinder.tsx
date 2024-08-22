import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getCompanyPeerGroup } from '../../api';
import { CompanyPeerGroup } from '../../company';
import Spinner from '../Spinner/Spinner';
import CompanyFinderItem from './PeersGroupItem/PeersGroupItem';
import './PeersGroupFinder.css';

interface CompanyFinderProps {
    ticker: string;
    className: string;
}

const CompanyFinder: React.FC<CompanyFinderProps> = ({ ticker, className }) => {
    const [companyData, setCompanyData] = useState<CompanyPeerGroup>();

    const getPeerGroupInit = async (ticker: string) => {
        if (typeof ticker === "undefined") return;

        const result = await getCompanyPeerGroup(ticker);

        if (typeof result === "string") {
            console.log("api error: ", result);
        } else if (Array.isArray(result.data)) {
            const peerList = result.data.filter(company => company != ticker);
            setCompanyData({ peerList: peerList });
        }
    }

    useEffect(() => {
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