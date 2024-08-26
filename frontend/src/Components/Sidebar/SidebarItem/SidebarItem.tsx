import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SidebarItem.css';

interface SidebarItemProps {
    to: string;
    icon: string;
    title: string;
    checked: boolean;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, title, checked, onClick }) => {
    return (
        <div className='container'>
            <input id='select' type='checkbox' className='hidden' checked={checked}></input>
            <label id='label' htmlFor='select' className='min-w-fit flex text-xs lg:text-sm xl:text-md py-2 pl-[20%] xl:py-3 xl:pl-[22%] border-l-4 border-2 border-transparent xl:border-l-8 hover:bg-dark hover:text-white'>
                <Link to={to} onClick={onClick} className='flex flex-col lg:flex-row items-center gap-1'>
                    <i className={`${icon} text-2xl xl:text-3xl `}></i>
                    <span>{title}</span>
                </Link>
            </label>
        </div>
    );
};

export default SidebarItem;