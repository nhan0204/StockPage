import React from 'react'
import { Outlet } from 'react-router';

interface CompanyDashboardProps {
    children: React.ReactNode;
    ticker: string;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({children, ticker}) => {
    return (
        <div className='relative ml-44 xl:ml-64 bg-slate-100 w-full'>
            <div id="company-children">{children}</div>
            <div id="company-outlet">{<Outlet context={ticker}/>}</div>
        </div>
    );
};

export default CompanyDashboard;