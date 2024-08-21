import React from 'react' 
import { Link } from 'react-router-dom';

interface SidebarProps {
    className: string;
} 

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    return (
        <nav className={className}>
            <Link to='company-profile'>
                <h6>Company Profile</h6>
            </Link>

            <Link to='income-statement'>
                <h6>Income Statement</h6>
            </Link>

            <Link to='balance-sheet'>
                <h6>Balance Sheet</h6>
            </Link>

            <Link to='cashflow-statement'>
                <h6>Cashflow Statement</h6>
            </Link>

            <Link to='historical-dividend'>
                <h6>Historical Dividend</h6>
            </Link>
        </nav>
    );
};

export default Sidebar;