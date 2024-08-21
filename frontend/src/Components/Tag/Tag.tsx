import React from 'react' 

interface TagProps {
    className: string;
    head: string;
    tail: string;
} 

const Tag: React.FC<TagProps> = ({ className, head, tail }) => {
    return (
        <div className={className}>
            <h2 className='text-2xl font-extrabold font-sans'>{head}<br />
                <span className='font-times text-3xl font-thin '>{tail}</span>
            </h2>
        </div>
    );
};

export default Tag;