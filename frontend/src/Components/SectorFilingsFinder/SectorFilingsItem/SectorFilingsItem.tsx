import React from 'react' 
import { CompanySectorFilings } from '../../../company';
import { Link } from 'react-router-dom';

interface SectorFilingsItemProps {
    id: string;
    sector: CompanySectorFilings;
} 

const SectorFilingsItem: React.FC<SectorFilingsItemProps> = ({ id, sector }) => {
    return (
        <Link
            id={id}
            key={id}
            to={sector.finalLink}
        >
            10K - {sector.symbol} - {sector.fillingDate}
        </Link>
    );
};

export default SectorFilingsItem;