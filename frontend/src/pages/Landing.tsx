import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import React,{ useRef } from 'react';
import { Link } from 'react-router-dom';
import blob1 from '../assets/blob1.svg';

const Landing: React.FC = () => {
    const optionsRef = useRef<HTMLDivElement>(null);
    const handleGetStarted = () => {
        optionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="flex items-center justify-center h-full w-screen bg-gray-800">
            <div className="flex flex-col items-center justify-center h-full w-screen">
                <Hero onGetStarted={handleGetStarted} />
                <div ref={optionsRef} className="mt-8 w-full h-screen flex items-center justify-center bg-gray-800">
            <div className="flex flex-col relative md:flex-row justify-between w-full max-w-4xl h-full mx-10 items-center p-8">
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-transparent">
                    <h2 className="text-2xl text-white font-semibold mb-4 dark:text-white">For Students</h2>
                    <Button className="btn mt-4 dark:bg-gray-900">
                        <Link to="/student/signup" className="dark:text-white">Sign Up</Link>
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4">
                    <h2 className="text-2xl text-white font-semibold mb-4 dark:text-white">For Officers</h2>
                    <Button className="btn mt-4 dark:bg-gray-900">
                        <Link to="/officer/signup" className="dark:text-white">Sign Up</Link>
                    </Button>
                </div>
            </div>
                <div className='absolute animate-float'>
                    <img src={blob1} alt="1" />
                </div>
        </div>
            </div>
        </div>
    );
};

export default Landing;