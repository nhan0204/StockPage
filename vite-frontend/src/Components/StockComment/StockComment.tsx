import React from 'react' 
import StockCommentForm from './StockCommentForm/StockCommentForm';
import { commentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';

interface StockCommentProps {
    ticker: string;
    className: string;
} 

type CommentFormInputs = {
    title: string;
    content: string;
}

const StockComment: React.FC<StockCommentProps> = ({ ticker, className }) => {
    const handleComment = async (form: CommentFormInputs) => {
        commentPostAPI(form.title, form.content, ticker)
        .then(response => {
            if (response) {
                toast.success("Comment posted!");
            }
        }).catch(e => {
            toast.warning(e);
        })
    }

    return (
        <div className={className}>
            <StockCommentForm symbol={ticker} handleComment={handleComment}/>
        </div>
    );
};

export default StockComment;