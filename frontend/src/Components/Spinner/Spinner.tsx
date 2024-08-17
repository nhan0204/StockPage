import React from 'react';
import { ClipLoader } from "react-spinners";
import './Spinner.css';

interface SpinnerProps {
    isLoading?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading = true }) => {
    return (
        <div id="loading-spinner" className='mt-14'>
            <ClipLoader
                color='black'
                loading={isLoading}
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Spinner;