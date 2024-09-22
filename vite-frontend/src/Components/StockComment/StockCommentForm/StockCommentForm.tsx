import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';


interface StockCommentFormProps {
    symbol: string;
    handleComment: (e: CommentFormInputs) => void;
};

type CommentFormInputs = {
    title: string;
    content: string;
}

const validation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
});

const StockCommentForm: React.FC<StockCommentFormProps> = ({ symbol, handleComment }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CommentFormInputs>({ resolver: yupResolver(validation) });

    return (
        <form className='relative' onSubmit={handleSubmit(handleComment)}>
            <input
                type='text' className='ml-2 focus:outline-none bg-transparent' placeholder='Title'
                {...register("title")}
            />
            
            {/* {errors.title ? <p>{errors.title.message}</p> : ""} */}

            <div className='flex flex-col'>
                <textarea
                    id='content'
                    rows={6}
                    placeholder='Write a comment ...'
                    className='text-xs lg:text-sm text-gray-900 pl-2 pt-2 border border-grey rounded-xl shadow-md  focus:outline-dark placeholder:text-xs placeholder:absolute placeholder:left-2 placeholder:top-2 lg:placeholder:text-sm'
                    {...register("content")}
                >
                </textarea>
            </div>

            <button
                type='submit'
                className='absolute mt-2 right-0 bg-dark text-white text-xs  hover:opacity-70 px-1 py-1.5 rounded-lg '
            >
                Publish
            </button>
        </form>
    );
};

export default StockCommentForm;