import React from 'react'
import { Outlet } from 'react-router';

interface CompanyDashboardProps {
    children: React.ReactNode;
    ticker: string;
    className: string;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({children, ticker, className}) => {
    return (
        <div id='dashboard' className={`${className} relative flex flex-col w-full bg-slate-100`}>
            <div id="company-children">{children}</div>
            <div id="company-outlet">{<Outlet context={ticker}/>}</div>
        </div>
    );
};

export default CompanyDashboard;