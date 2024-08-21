import React, { useEffect, useState } from 'react';
import { getCompanyLogo } from '../../api';

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
            logo = await getCompanyLogo(ticker);
            
            if (logo) {
                setCompanyLogo(logo);
                localStorage.setItem(ticker, logo);
            }
        }
    }

    useEffect(() => {
        getCompanyLogoInit();
    }, [companyLogo])

    return (
        <div className={className}>
            {companyLogo ? <img className='w-full' alt='' src={companyLogo}/> : <div className='mx-0'></div>} 
        </div>
    );
};

export default CompanyLogo;