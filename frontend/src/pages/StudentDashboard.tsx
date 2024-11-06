import { Navbar } from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from 'axios';

const StudentDashboard: React.FC = () => {
    const [list, setList] = useState<ConProp[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConcessions = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                navigate('/');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/student/concession', {
                    headers: {
                        'Authorization': token,
                    },
                });
                console.log(response.data[0]);
                setList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchConcessions();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center'>
            <Navbar />
            <h2 className='text-xl m-10'>Your Concessions</h2>
            <div className="container flex w-3/4 mt-10">
                <Table>
                    <TableCaption>A list of your recent applications.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Expiry Date</TableHead>
                            <TableHead>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {list.map((concession) => (
                            <Row
                                key={concession.form_id}
                                form_id={concession.form_id}
                                status={concession.status}
                                period={concession.period}
                                from={concession.from}
                                to={concession.to}
                                expiry_date={concession.status === "active" ? concession.expiry_date.substring(0, 10) : "N/A"}
                                concession_fee={concession.concession_fee}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

interface ConProp {
    form_id: string;
    status: string;
    period: string;
    from: string;
    to: string;
    expiry_date: string;
    concession_fee: number;
}

const Row: React.FC<ConProp> = ({ form_id, status,from, to, period, expiry_date, concession_fee }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{form_id}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{from}</TableCell>
            <TableCell>{to}</TableCell>
            <TableCell>{period}</TableCell>
            <TableCell>{expiry_date}</TableCell>
            <TableCell>{concession_fee}</TableCell>
        </TableRow>
    );
};

export default StudentDashboard;