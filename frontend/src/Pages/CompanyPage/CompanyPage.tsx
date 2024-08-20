import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from 'react-spinner';
import { getCompanyLogo, getCompanyProfile } from '../../api';
import { CompanyProfile } from '../../company';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Title from '../../Components/Title/Title';
import "./CompanyPage.css";

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
                <div className="flex ">
                    <CompanyDashboard ticker={ticker!}>
                        {/* Logo and Description */}
                        <div className='relative container flex'>
                            <div className='ml-12 mt-12 mb-6 mr-8 lg:w-64 xl:72'>
                                <img className='w-full h-auto'  alt="" src={companyLogo}/>
                            </div>

                            {/* <div id='collapse' className='absolute lg:right-12 mt-12 shadow-lg lg:max-w-xl xl:max-w-2xl rounded-xl h-fit p-4 bg-white hover:bg-dark hover:text-white'>
                                <input id="toggle" name="" type="checkbox"></input>
                                <label id="head" htmlFor="toggle" className='relative block box-border w-full p-2 border-2 border-black hover:border-white'>Description</label>
                                <div id="content">
                                    <p className='p-4 text-justify box-border'>{company.description}</p>
                                </div>
                            </div> */}
                        </div>

                        {/* General info */}
                        <div className='ml-10 grid grid-cols-3 gap-4'>
                            <Title title="Company Name" subTitle={company.companyName}></Title>
                            <Title title="Price" subTitle={`${company.price} ${company.currency}`}></Title>
                            <Title title="Industry" subTitle={`${company.industry}`}></Title>
                        </div>
                    </CompanyDashboard>
                </div>
            ) : (
                <Spinner />
            )}
        </>

    );
};

export default CompanyPage;