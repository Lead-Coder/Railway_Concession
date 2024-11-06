import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import React,{ useRef } from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
    const optionsRef = useRef<HTMLDivElement>(null);
    const handleGetStarted = () => {
        optionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="flex items-center justify-center h-full w-screen">
            <div className="flex flex-col items-center justify-center h-full w-screen">
                <Hero onGetStarted={handleGetStarted} />
                <div ref={optionsRef} className="mt-8 w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl h-full mx-10 items-center bg-white shadow-lg rounded-lg p-8">
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4">For Students</h2>
                    <Button className="btn">
                        <Link to="/student/signup" className="text-white">Sign Up</Link>
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4">
                    <h2 className="text-2xl font-semibold mb-4">For Officers</h2>
                    <Button className="btn mt-4">
                        <Link to="/officer/signup" className="text-white">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </div>
            </div>
        </div>
    );
};

export default Landing;