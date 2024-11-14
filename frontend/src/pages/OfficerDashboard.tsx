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
import { Button } from "@/components/ui/button";
import { Navbar2 } from '@/components/Navbar2';

const OfficerDashboard: React.FC = () => {
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
                const response = await axios.get('http://localhost:3000/api/officer/all', {
                    headers: {
                        'Authorization': token,
                    },
                });
                setList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchConcessions();
    }, [navigate]);

    const handleApproveReject = async (concessionId: string, status: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            navigate('/');
            return;
        }

        try {
            await axios.put('http://localhost:3000/api/officer/approve', {
                concessionId,
                status,
            }, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            // Refresh the list after approval/rejection
            const response = await axios.get('http://localhost:3000/api/officer/all', {
                headers: {
                    'Authorization': token,
                },
            });
            setList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <Navbar2 />
            <h2 className='text-xl m-10'>Pending Concessions</h2>
            <div className="container flex w-3/4 mt-10">
                <Table>
                    <TableCaption>A list of pending concession applications.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Expiry Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
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
                                onApprove={() => handleApproveReject(concession.form_id, 'active')}
                                onReject={() => handleApproveReject(concession.form_id, 'rejected')}
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
    onApprove: () => void;
    onReject: () => void;
}

const Row: React.FC<ConProp> = ({ form_id, status, from, to, period, expiry_date, concession_fee, onApprove, onReject }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{form_id}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{from}</TableCell>
            <TableCell>{to}</TableCell>
            <TableCell>{period}</TableCell>
            <TableCell>{expiry_date}</TableCell>
            <TableCell>{concession_fee}</TableCell>
            <TableCell className="text-right">
                <Button onClick={onApprove} className="mr-2">Approve</Button>
                <Button onClick={onReject} variant="destructive">Reject</Button>
            </TableCell>
        </TableRow>
    );
};

export default OfficerDashboard;