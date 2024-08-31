import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CompanySectorFilings } from '../../../company';
import { formatDate } from '../../../Utils/Helpers/DateFormatting';
import './SectorFilingsItem.css';

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
            <div className='w-full flex justify-start items-center text-lg rounded-xl  px-3 py-2 border-2 border-transparent hover:font-semibold hover:border-black hover:bg-slate-200 hover:scale-105 transform transition-transform scale-100 duration-200 ease-in-out '>
                <i className={`bx ${hover ? 'bx-folder-open' : 'bx-folder'}`}></i>
                <span className='pl-1 min-w-fit whitespace-nowrap'>
                    {sector.symbol} {formatDate(sector.fillingDate)}, {sector.fillingDate.substring(0,4)}
                </span>
            </div>
        </Link>
    );
};

export default SectorFilingsItem;