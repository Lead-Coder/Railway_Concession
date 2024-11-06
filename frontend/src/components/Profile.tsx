import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import axios from 'axios';

const Profile: React.FC = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');

    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            const fetchName = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                try {
                    const response = await axios.get('http://localhost:3000/api/student/dashboard', {
                        headers: {
                            'authorization': token,
                        },
                    });
                    setName(response.data.name);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchName();
        }
    }, [show]);

    return (
        <>
        <Popover>
            <PopoverTrigger>
                <Button onClick={handleShow}>
                    Profile
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h5>{name}</h5>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
        </>
    );
};

export default Profile;