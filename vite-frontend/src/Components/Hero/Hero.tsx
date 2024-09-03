import React from 'react' 
import { Link } from 'react-router-dom';
import hero from "../../Assets/hero.jpg";

interface HeroProps {} 

const Hero: React.FC<HeroProps> = () => {
    return (
        <section id="hero">
            <div className='flex flex-col-reverse items-center justify-center xl:justify-evenly mx-auto px-8 lg:flex-row xl mt-2 mb-8 xl:mt-12'>
                {/* Brand and Description */}
                <div className='max-w-lg flex flex-col space-y-6 mt-6 lg:mt-0 lg:space-y-8  justify-center'>
                    <h2 className='text-5xl xl:text-6xl font-thin font-times'>Financial<br />
                        <span className='text-4xl xl:text-5xl font-bold font-sans'>data with no <br/> news</span>
                    </h2>
                    <p className='text-lg xl:text-xl overflow-clip '>
                        Search relevant financial documents without <br/> fear mongering and fake news.
                    </p>
                    <div>
                        <Link
                            to="/search"
                            className='mt-4 py-2 px-1.5 text-1xl rounded-xl text-white bg-dark hover:opacity-70'
                        >
                            Get Started
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className='w-10/12 lg:w-1/2 xl:mt-20 xl:scale-110'>
                    <img alt="" src={hero}></img>
                </div>
            </div>
        </section>
    );
};

export default Hero;