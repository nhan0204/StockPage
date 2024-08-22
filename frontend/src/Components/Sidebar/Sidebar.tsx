import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import SidebarItem from './SidebarItem/SidebarItem';
import './Sidebar.css'

interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const [selectedItem, setSelectedItem] = useState<string>();

    return (
        <nav id='sidebar' className='flex flex-col '>
            <SidebarItem
                icon='bx bx-list-check' to='company-profile' title='Company Profile'
                checked={selectedItem === 'company-profile'}
                onClick={() => setSelectedItem('company-profile')}
            />

            <SidebarItem
                icon='bx bx-money-withdraw' to='income-statement' title='Income Statement'
                checked={selectedItem === 'income-statement'}
                onClick={() => setSelectedItem('income-statement')}
            />

            <SidebarItem
                icon='bx bx-spreadsheet' to='balance-sheet' title='Balance Sheet'
                checked={selectedItem === 'balance-sheet'}
                onClick={() => setSelectedItem('balance-sheet')}
            />

            <SidebarItem
                icon='bx bx-credit-card' to='cashflow-statement' title='Cashflow Statement'
                checked={selectedItem === 'cashflow-statement'}
                onClick={() => setSelectedItem('cashflow-statement')}
            />

            <SidebarItem
                icon='bx bx-history' to='historical-dividend' title='Historical Dividend'
                checked={selectedItem === 'historical-dividend'}
                onClick={() => setSelectedItem('historical-dividend')}
            />
        </nav>
    );
};

export default Sidebar;