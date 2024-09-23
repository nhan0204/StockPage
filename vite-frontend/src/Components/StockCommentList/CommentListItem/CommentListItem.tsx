import React from 'react' 
import { CommentGet } from '../../../Models/Comment';

interface CommentListItemProps {
    id: string;
    comment: CommentGet;
} 

const CommentListItem: React.FC<CommentListItemProps> = ({ id, comment }) => {
    return (
        <div id={id} key={id} className='flex flex-1 '>
            <div>
                {comment.title}
                <p>{comment.content}</p>
            </div>
            <div>
                {comment.createdBy}
            </div>
        </div>
    );
};

export default CommentListItem;