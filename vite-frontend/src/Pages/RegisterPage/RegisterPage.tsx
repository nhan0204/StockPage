import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import background from "../../Assets/register-background.jpg";
import Spinner from '../../Components/Spinner/Spinner';
import Tag from '../../Components/Tag/Tag';
import { useAuth } from '../../Context/useAuth';

interface RegisterPageProps { }

type RegisterFormsInputs = {
    email: string;
    userName: string;
    password: string;
}

const validation = Yup.object().shape({
    email: Yup.string().required("Email is requited"),
    userName: Yup.string().required("User name is required"),
    password: Yup.string().required("Password is required"),
})

const RegisterPage: React.FC<RegisterPageProps> = () => {
    const { registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleRegister = async (form: RegisterFormsInputs) => {
        setIsSubmitting(true);
        try {
            await registerUser(form.email, form.userName, form.password);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='bg-white flex flex-col-reverse items-center lg:items-start lg:flex-row-reverse justify-center lg:gap-'>
            <div className='container w-9/12 lg:w-4/12 lg:mt-20 '>
                <Tag className='w-xl mx-auto mb-8 lg:mb-12' head="First time on the page?" tail="Create an account to explore" flip={true} />
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className='flex flex-col gap-4'>
                    <div id="register-field" className='px-2 py-2 rounded-full border border-slate-600'>
                        <label className='hidden' htmlFor="email"></label>
                        <input
                            id="email" type="text" className='w-full pl-4 focus:outline-none bg-transparent' placeholder="Email"
                            {...register("email")}
                        />
                        {errors.email ? (
                            <p className='text-white'>{errors.email.message}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div id="username-field" className='px-2 py-2 rounded-full border border-slate-600'>
                        <label className='hidden' htmlFor="username"></label>
                        <input
                            id="username" type="text" className='w-full pl-4 focus:outline-none bg-transparent' placeholder="Username"
                            {...register("userName")}
                        />
                        {errors.userName ? (
                            <p className='text-white'>{errors.userName.message}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div id="password-field" className='px-2 py-2 rounded-full border border-slate-600 bg-transparent'>
                        <label className='hidden ' htmlFor="password"></label>
                        <input
                            id="password" type="password" className='w-full pl-4 focus:outline-none' placeholder="••••••••"
                            {...register("password")}
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-dark mt-4 lg:mt-12 py-2 px-2 rounded-full text-white hover:opacity-70'
                    >
                        Signup
                    </button>
                    {isSubmitting && <Spinner />}
                </form>
            </div>
            <div className='w-[72%] lg:w-[40%] mt-8 lg:mt-0'>
                <img className='w-full rounded-3xl' src={background} />
            </div>
        </div>
    );
};

export default RegisterPage;