import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StudentApply: React.FC = () => {
    const [formData, setFormData] = useState({
        classType: '',
        quota: '',
        applicationDate: '',
        from: '',
        to: '',
        period: '',
        route: '',
        concessionFee: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/student/apply', formData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            navigate('/student/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
            <Navbar />
            <Card className="w-full max-w-lg mt-10 bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Apply for Concession</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="classType" className="text-gray-800 dark:text-gray-300">Class Type</Label>
                            <Input
                                id="classType"
                                name="classType"
                                type="text"
                                value={formData.classType}
                                onChange={handleChange}
                                required
                                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="quota" className="text-gray-800 dark:text-gray-300">Quota</Label>
                            <Input
                                id="quota"
                                name="quota"
                                type="text"
                                value={formData.quota}
                                onChange={handleChange}
                                required
                                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="applicationDate" className="text-gray-800 dark:text-gray-300">Application Date</Label>
                            <Input
                                id="applicationDate"
                                name="applicationDate"
                                type="date"
                                value={formData.applicationDate}
                                onChange={handleChange}
                                required
                                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="from" className="text-gray-800 dark:text-gray-300">From</Label>
                            <Input
                                id="from"
                                name="from"
                                type="text"
                                value={formData.from}
                                onChange={handleChange}
                                required
                                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="to" className="text-gray-800 dark:text-gray-300">To</Label>
                            <Input
                                id="to"
                                name="to"
                                type="text"
                                value={formData.to}
                                onChange={handleChange}
                                required
                                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="period" className="text-gray-800 dark:text-gray-300">Period</Label>
                            <Input
                                id="period"
                                name="period"
                                type="text"
                                value={formData.period}
                                onChange={handleChange}
                                required
                                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="route" className="text-gray-800 dark:text-gray-300">Route</Label>
                            <Input
                                id="route"
                                name="route"
                                type="text"
                                value={formData.route}
                                onChange={handleChange}
                                required
                                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="concessionFee" className="text-gray-800 dark:text-gray-300">Concession Fee</Label>
                            <Input
                                id="concessionFee"
                                name="concessionFee"
                                type="number"
                                value={formData.concessionFee}
                                onChange={handleChange}
                                required
                                className="dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-200">
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentApply;
