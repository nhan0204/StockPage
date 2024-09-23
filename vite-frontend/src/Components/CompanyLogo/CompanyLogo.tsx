import React, { useEffect, useState } from 'react';
import { getCompanyLogoAPI } from '../../Services/CompanyService';
import './CompanyLogo.css';

interface CompanyLogoProps {
    ticker: string;
    className: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ ticker, className }) => {
    const [companyLogo, setCompanyLogo] = useState<string>("");

    const getCompanyLogoInit = async () => {
        let logo = localStorage.getItem(ticker) || undefined;

        if (logo) {
            setCompanyLogo(logo!);
        } else {
            logo = await getCompanyLogoAPI(ticker);
            
            if (logo) {
                setCompanyLogo(logo);
                localStorage.setItem(ticker, logo);
            }
        }
    }

    useEffect(() => {
        getCompanyLogoInit();
    }, [ticker]);

    return (
        <div className={className}>
            {companyLogo ? <img className='image-enhanced' alt='' src={companyLogo}/> : <div className='mx-0'></div>} 
        </div>
    );
};

export default CompanyLogo;