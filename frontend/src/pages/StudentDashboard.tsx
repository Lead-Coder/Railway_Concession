import { Navbar } from '@/components/Navbar';
import React from 'react';

interface Student {
    id: number;
    name: string;
    age: number;
    course: string;
}

const StudentDashboard: React.FC = () => {
    return (
        <div>
            <Navbar/>
        </div>
    );
};

export default StudentDashboard;