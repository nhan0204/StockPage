import React from 'react' 
import { Link } from 'react-router-dom';
import hero from "./hero.jpg";

interface HeroProps {} 

const Hero: React.FC<HeroProps> = () => {
    return (
        <section id="hero">
            <div className='container flex flex-col-reverse items-center justify-center gap-6 xl:justify-evenly mx-auto px-8 lg:flex-row xl my-0'>
                {/* Brand and Description */}
                <div className='max-w-lg flex flex-col space-y-8 justify-center'>
                    <h2 className='text-5xl xl:text-6xl font-thin font-times'>Financial<br />
                        <span className='text-4xl xl:text-5xl font-bold font-sans'>data with no <br/> news</span>
                    </h2>
                    <p className='text-lg xl:text-xl text-wrap '>
                        Search relevant financial documents without <br/> fear mongering and fake news.
                    </p>
                    <div>
                        <Link
                            to="/search"
                            className='mt-4 py-2 px-1.5 text-1xl rounded-xl  text-white bg-dark hover:opacity-70'
                        >
                            Get Started
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className='xl:mt-20 xl:scale-125'>
                    <img alt="" src={hero}></img>
                </div>
            </div>
        </section>
    );
};

export default Hero;