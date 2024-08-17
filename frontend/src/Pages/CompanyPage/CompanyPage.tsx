import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompanyProfile } from '../../api';
import { CompanyProfile } from '../../company';
import CompanyFinder from '../../Components/CompanyFinder/CompanyFinder';

interface CompanyPageProps { }

const CompanyPage: React.FC<CompanyPageProps> = () => {
    let { ticker } = useParams(); // company/:ticker
    const [company, setCompany] = useState<CompanyProfile>();

    const getProfileInit = async () => {
        if (typeof ticker === "undefined") return;

        const result = await getCompanyProfile(ticker!);

        if (typeof result === "string") {
            console.log("Server error: ", result);
        } else if(Array.isArray(result.data)) {
            setCompany(result.data[0]);
            console.log(company)
        }
    }

    useEffect(() => {
        getProfileInit();
    }, []);
    

    return (
        <>
            {company ? (
                <div>
                    {company.companyName}
                    <CompanyFinder ticker={company.symbol}/>
                </div>
            ) : <p>Company Not Found</p>}
        </>

    );
};

export default CompanyPage;