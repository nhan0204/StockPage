import React from 'react';
import { v4 as uuidv4 } from "uuid";
import { CommentGet } from '../../Models/Comment';
import CommentListItem from './CommentListItem/CommentListItem';

interface StockCommentListProps {
    comments: CommentGet[];
}

const StockCommentList: React.FC<StockCommentListProps> = ({ comments }) => {
    return (
        <div className='bg-white flex flex-col container max-w-[80%]'>
            {comments ? comments.map(comment => {
                return (
                    <CommentListItem
                        id={`${comment.title}-${comment.createdBy}`} comment={comment} 
                        key={uuidv4()}
                    />
                )
            }) : ""}
        </div>
    );
};

export default StockCommentList;