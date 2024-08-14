import React from 'react' 
import Hero from '../../Components/Hero/Hero';

interface HomePageProps {} 

const HomePage: React.FC<HomePageProps> = () => {
    return (
        <>
            <Hero/>
        </>
    );
};

export default HomePage;