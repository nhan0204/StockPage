import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from 'react-spinner';
import { getCompanyLogo, getCompanyProfile } from '../../api';
import { CompanyProfile } from '../../company';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Description from '../../Components/Description/Description';
import Title from '../../Components/Tile/Tile';
import CompanyLogo from '../../Components/CompanyLogo/CompanyLogo';
import PeersGroupFinder from '../../Components/PeersGroupFinder/PeersGroupFinder';
import Sidebar from '../../Components/Sidebar/Sidebar';

interface CompanyPageProps { }

const CompanyPage: React.FC<CompanyPageProps> = () => {
    let { ticker } = useParams(); // company/:ticker
    const [company, setCompany] = useState<CompanyProfile>();
    const [companyLogo, setCompanyLogo] = useState<string>("");

    const getProfileInit = async () => {
        if (typeof ticker === "undefined") return;

        const result = await getCompanyProfile(ticker!);

        if (typeof result === "string") {
            console.log("Server error: ", result);
        } else if (Array.isArray(result.data)) {
            setCompany(result.data[0]);
            console.log(company)
        }

        const logo = await getCompanyLogo(ticker!);

        if (typeof logo !== 'undefined')
            setCompanyLogo(logo);
    }

    useEffect(() => {
        getProfileInit();
    }, []);

    return (
        <>
            {company ? (
                <div className="flex justify-between h-[200vh]">
                    <Sidebar className='block w-full'/>
                    
                    <CompanyDashboard ticker={ticker!}>
                        <div className='relative flex'>
                            <CompanyLogo
                                ticker={ticker!}
                                className='ml-10 mt-12 mb-6 mr-8 w-40 lg:w-64 xl:w-96'
                            />
                            <Description
                                description={company.description}
                                className='mx-auto lg:mt-12 xl:mt-20'
                            />
                        </div>


                        {/* General info */}
                        <div className='ml-10 max-w-[80vw] grid grid-cols-1 lg:grid-cols-3 gap-4'>
                            <Title title="Company Name" subTitle={company.companyName}></Title>
                            <Title title="Price" subTitle={`${company.price} ${company.currency}`}></Title>
                            <Title title="Industry" subTitle={`${company.industry}`}></Title>
                        </div>

                        <PeersGroupFinder 
                            ticker={ticker!}
                            className='ml-10 mt-6'    
                        />
                    </CompanyDashboard>
                </div>
            ) : (
                <Spinner />
            )}
        </>

    );
};

export default CompanyPage;