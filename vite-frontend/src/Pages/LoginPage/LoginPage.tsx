import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import background from "../../Assets/background.jpg";
import Spinner from '../../Components/Spinner/Spinner';
import Tag from '../../Components/Tag/Tag';
import { useAuth } from '../../Context/useAuth';
import "./LoginPage.css";

interface LoginPageProps { }

type LoginFormsInputs = {
    userName: string;
    password: string;
}

const validation = Yup.object().shape({
    userName: Yup.string().required("User name is required"),
    password: Yup.string().required("Password is required"),
})

const LoginPage: React.FC<LoginPageProps> = () => {
    const { loginUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleLogin = async (form: LoginFormsInputs) => {
        setIsSubmitting(true);
        try {
            await loginUser(form.userName, form.password);
        } catch(e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='bg-white flex flex-col-reverse lg:flex-row items-center lg:items-start  justify-center lg:gap-20 '>
            <div className='container w-9/12 lg:w-4/12 mt-20'>
                <Tag className='w-xl mx-auto mb-12' head="Welcome back!" tail="Simply your work flow and productivity" flip={true}/>
                <form  
                    onSubmit={handleSubmit(handleLogin)}
                    className='flex flex-col gap-4'>
                    <div id="username-field" className='px-2 py-2 rounded-full border border-slate-600'>
                        <label className='hidden' htmlFor="username"></label>
                        <input 
                            id="username" type="text" className='w-full pl-4 focus:outline-none bg-transparent' placeholder="Username"
                            {...register("userName")}
                        />
                        { errors.userName ? (
                            <p className='text-white'>{errors.userName.message}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div id="password-field" className='px-2 py-2 rounded-full border border-slate-600 bg-transparent'>
                        <label className='hidden ' htmlFor="password"></label>
                        <input 
                            id="password" type="password" className='w-full pl-4 focus:outline-none'  placeholder="••••••••"
                            {...register("password")}
                        />
                    </div>
                    <div className='flex ml-auto my-4'>
                        <a
                            href='#'
                            className='text-sm font-medium hover:underline hover:opacity-50 black'
                        >
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type='submit'
                        className='bg-dark py-2 px-2 rounded-full text-white hover:opacity-70'
                    >
                        Login
                    </button>
                    {isSubmitting && <Spinner/>}
                </form>
            </div>
            <div className='w-[72%] lg:w-[40%] my-auto'>
                <img className='w-full rounded-3xl' src={background} />
            </div>
        </div>
    );
};

export default LoginPage;