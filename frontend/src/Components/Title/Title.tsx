import React from 'react';

interface TitleProps {
    title: string;
    subTitle: string;
}

const Title: React.FC<TitleProps> = ({ title, subTitle }) => {
    return (
        <>
            <div className="text-balance bg-white rounded-lg shadow-lg hover:bg-dark hover:text-white">
                <div className="w-full max-w-full p-4">
                    <h5 className="uppercase font-bold text-xs">
                        {title}
                    </h5>
                    <span className="font-bold text-lg ">{subTitle}</span>
                </div>
            </div>
        </>

    );
};

export default Title;