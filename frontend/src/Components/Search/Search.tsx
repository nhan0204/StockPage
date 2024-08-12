import React from 'react'

interface Props { }

const Search = (props: Props) => {
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='container bg-slate-200 w-6/12 h-auto py-2 px-5 rounded-3xl'>
                    {/* Search bar container */}
                    <form className='w-full h-9 flex items-center '>
                        {/* Search icon container */}
                        <span className='w-10  text-xl flex flex-col items-center'>
                            <i className='uil uil-search'></i>
                        </span>
                        <input
                            type='text'
                            placeholder='Find your stock ...'
                            className='w-full font-medium font-extraLight focus:outline-none bg-transparent'
                        >
                        </input>
                        <button
                            type="submit"
                            className='w-24 h-full text-2sm bg-white text-dark rounded-2xl hover:text-white hover:bg-dark'>
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Search