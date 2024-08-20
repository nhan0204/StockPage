import React, { useEffect, useState } from 'react';
import { getCompanyPeerGroup } from '../../api';
import { CompanyPeerGroup } from '../../company';
import CompanyFinderItem from './PeersGroupItem/PeersGroupItem';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../Spinner/Spinner';

interface CompanyFinderProps {
    ticker: string;
}

const CompanyFinder: React.FC<CompanyFinderProps> = ({ ticker }) => {
    const [companyData, setCompanyData] = useState<CompanyPeerGroup>();

    const getPeerGroupInit = async (ticker: string) => {
        if (typeof ticker === "undefined") return;

        const result = await getCompanyPeerGroup(ticker);

        if (typeof result === "string") {
            console.log("api error: ", result);
        } else if (Array.isArray(result.data)) {
            setCompanyData({ peerList: result.data });
        }
    }

    useEffect(() => {
        getPeerGroupInit(ticker);
    }, [ticker]);

    return (
        <>
            <div className='inline-flex rounded-md shadow-sm m-4'>
                {companyData ? (
                    companyData.peerList.map(ticker => <CompanyFinderItem id={ticker} key={uuidv4()} ticker={ticker} />)
                ) : (
                    <Spinner />
                )}
            </div>
        </>
    );
};

export default CompanyFinder;