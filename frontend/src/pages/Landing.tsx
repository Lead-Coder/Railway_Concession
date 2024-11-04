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
                <div ref={optionsRef} className="mt-8 w-full h-screen">
                    <div className="flex flex-row justify-between w-full h-full mx-50 items-center">
                    <Button className="btn">
                        <Link to="/student/signup">For Students</Link>
                    </Button>
                    <Button className="btn mt-4">
                        <Link to="/officer/signup">For Officers</Link>
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;