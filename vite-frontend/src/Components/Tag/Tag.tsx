import React from 'react';

interface TagProps {
    className: string;
    head: string;
    tail: string;
    flip: boolean;
} 

const Tag: React.FC<TagProps> = ({ className, head, tail, flip }) => {
    let headStyle = 'text-2xl font-extrabold font-sans';
    let tailStyle = 'font-times text-3xl font-thin';

    if (head.length > tail.length && !flip) {
        let temp = headStyle;
        headStyle = tailStyle;
        tailStyle = temp;
    }

    return (
        <div className={className}>
            <h2 className={headStyle}>{head}<br /></h2>
            <p className={tailStyle}>{tail}</p>
        </div>
    );
};

export default Tag;