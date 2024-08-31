import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from 'react-spinner';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import CompanyLogo from '../../Components/CompanyLogo/CompanyLogo';
import Description from '../../Components/Description/Description';
import PeersGroupFinder from '../../Components/PeersGroupFinder/PeersGroupFinder';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Title from '../../Components/Tile/Tile';
import { getCompanyProfile } from '../../Services/api';
import { CompanyProfile } from '../../company';
import './CompanyPage.css';

interface CompanyPageProps { }

const CompanyPage: React.FC<CompanyPageProps> = () => {
    let { ticker } = useParams(); // company/:ticker
    const [company, setCompany] = useState<CompanyProfile>();

    useEffect(() => {
        const getProfileInit = async () => {
            if (typeof ticker === "undefined") return;
    
            const result = await getCompanyProfile(ticker!);
    
            if (typeof result === "string") {
                console.log("Server error: ", result);
            } else if (Array.isArray(result.data)) {
                setCompany(result.data[0]);
            }
        }

        getProfileInit();
    }, [ticker]);

    return (
        <div id='company-page' className="relative flex overflow-y-auto">
            <Sidebar />
            {company ? (
                <CompanyDashboard ticker={ticker!} className='h-max'>
                    <div id='description' className='relative flex flex-col md:flex-row justify-evenly '>
                        <CompanyLogo
                            ticker={ticker!}
                            className='mt-12 mb-6 mx-auto md:mx-0 md:ml-8 w-40 lg:w-64 xl:w-96 xl:pl-5'
                        />
                        <Description
                            description={company.description}
                            className='px-8 mb-8 lg:mt-12 xl:mt-20'
                        />
                    </div>


                    {/* General info */}
                    <div className='mx-auto max-w-[80vw] flex flex-row  gap-4 overflow-auto'>
                        <Title title="Company Name" subTitle={company.companyName}></Title>
                        <Title title="Price" subTitle={`${company.price} ${company.currency}`}></Title>
                        <Title title="Industry" subTitle={`${company.industry}`}></Title>
                    </div>

                    <PeersGroupFinder
                        ticker={ticker!}
                        className='flex mx-auto max-w-[80vw] mt-4'
                    />
                </CompanyDashboard>
            ) : (
                <Spinner />
            )}
        </div>

    );
};

export default CompanyPage;