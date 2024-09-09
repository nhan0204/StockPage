import React, { SyntheticEvent } from 'react'

interface ChartFilterItemProps {
    text: string;
    active: boolean;
    onClick: (e: SyntheticEvent) => void;
}

const ChartFilterItem: React.FC<ChartFilterItemProps> = ({ text, active, onClick }) => {
    return (
        <li className={`${active ? 'border-blue-500' : 'border-transparent'} w-8 lg:w-12 h-auto border-2 rounded-md flex items-center justify-center cursor-pointer`} >
            <button
                onClick={onClick}
                className={active ? ' text-blue-500' : 'text-gray-500'}
            >
                {text}
            </button>
        </li>
    );
};

export default ChartFilterItem;