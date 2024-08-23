import React, { useState } from 'react';
import { CompanySectorFilings } from '../../../company';
import './SectorFilingsItem.css';
import { Link } from 'react-router-dom';

interface SectorFilingsItemProps {
    id: string;
    sector: CompanySectorFilings;
}

const SectorFilingsItem: React.FC<SectorFilingsItemProps> = ({ id, sector }) => {
    const [hover, setHover] = useState<boolean>(false);
    return (
        <Link
            id={id}
            key={id}
            to={sector.finalLink}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className='w-fit container text-lg rounded-xl px-2 border-black hover:bg-slate-400 hover:scale-105 transform transition-transform scale-100 duration-200 ease-in-out '>
                <i className={`bx ${hover ? 'bx-folder-open' : 'bx-folder'}`}></i>
                <span className='pl-1'>
                    10K - {sector.symbol} - {sector.fillingDate}
                </span>
            </div>
        </Link>
    );
};

export default SectorFilingsItem;