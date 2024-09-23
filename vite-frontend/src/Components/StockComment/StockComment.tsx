import React, { useEffect, useState } from 'react' 
import StockCommentForm from './StockCommentForm/StockCommentForm';
import { commentGetAPI, commentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import { CommentGet } from '../../Models/Comment';
import Spinner from '../Spinner/Spinner';
import StockCommentList from '../StockCommentList/StockCommentList';

interface StockCommentProps {
    ticker: string;
    className: string;
} 

type CommentFormInputs = {
    title: string;
    content: string;
}

const StockComment: React.FC<StockCommentProps> = ({ ticker, className }) => {
    const [comments, setComments] = useState<CommentGet[] | null>(null);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        getComments();
    }, [ticker])
    
    const getComments = () => {
        setLoading(true);

        commentGetAPI(ticker).then(response => {
            setLoading(false);
            setComments(response?.data!);
        }).catch(e => {
            toast.warning(e);
        })
    }

    const handleComment = async (form: CommentFormInputs) => {
        commentPostAPI(form.title, form.content, ticker)
        .then(response => {
            if (response) {
                toast.success("Comment posted!");
                getComments();
            }
        }).catch(e => {
            toast.warning(e);
        })
    }


    return (
        <div className={className}>
            {loading ? (
                <Spinner/> 
            ) : (
                <StockCommentList comments={comments!}/>
            )}
            <StockCommentForm symbol={ticker} handleComment={handleComment}/>
        </div>
    );
};

export default StockComment;