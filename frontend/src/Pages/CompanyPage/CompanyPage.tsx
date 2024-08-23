import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from 'react-spinner';
import { getCompanyLogo, getCompanyProfile } from '../../api';
import { CompanyProfile } from '../../company';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import CompanyLogo from '../../Components/CompanyLogo/CompanyLogo';
import Description from '../../Components/Description/Description';
import PeersGroupFinder from '../../Components/PeersGroupFinder/PeersGroupFinder';
import Title from '../../Components/Tile/Tile';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './CompanyPage.css'

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
        <div id='company-page' className="relative flex">
            <Sidebar />
            {company ? (
                <CompanyDashboard ticker={ticker!} className='h-[150vh]'>
                    <div id='description' className='relative flex justify-evenly'>
                        <CompanyLogo
                            ticker={ticker!}
                            className='mt-12 mb-6 w-40 lg:w-64 xl:w-96 xl:pl-5'
                        />
                        <Description
                            description={company.description}
                            className='lg:mt-12 xl:mt-20'
                        />
                    </div>


                    {/* General info */}
                    <div className='mx-auto max-w-[80vw] flex flex-row  gap-4'>
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