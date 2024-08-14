import React, { ChangeEvent, SyntheticEvent } from 'react'

interface SearchProps {
    search: string | undefined;
    onSearchSubmit: (e: SyntheticEvent) => void;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ search, onSearchSubmit, handleSearchChange }) => {
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='container bg-slate-200 w-6/12 h-auto py-2 px-4 rounded-full'>
                    {/* Search bar container */}
                    <form className='space-x-3 h-9 flex items-center' onSubmit={onSearchSubmit}>
                        {/* Search icon container */}
                        <span className='w-10  text-xl flex flex-col items-center'>
                            <i className='uil uil-search'></i>
                        </span>
                        <input
                            type='text'
                            placeholder='Find your stock ...'
                            className='w-full font-medium font-extraLight focus:outline-none bg-transparent'
                            value={search}
                            onChange={handleSearchChange}
                        >
                        </input>
                        <button
                            type="submit"
                            className='w-24 h-full  bg-white text-dark rounded-2xl hover:text-white hover:bg-dark'
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Search