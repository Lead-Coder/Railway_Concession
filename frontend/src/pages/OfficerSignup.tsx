import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OfficerSignup: React.FC = () => {
    return (
    <div className="flex h-screen w-screen items-center justify-center px-4">
        <SignupFormOff />
    </div>
    
    );
};

function SignupFormOff() {
    const [name, setName] = useState('');
    const [username, setusername] = useState('');
    const [age, setAge] = useState('');
    const [salary, setSalary] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
  
      const data = {
        username: username,
        name,
        officer_age: age,
        salary: salary,
        password,
      };
  
      try {
        const response = await axios.post('http://localhost:3000/api/officer/register', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          navigate('/officer/login');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <Card className="mx-auto max-w-md w-1/3">
        <CardHeader>
          <CardTitle className="text-2xl">Officer Registration</CardTitle>
          <CardDescription>Enter all details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="m@example.com"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="XXXXXXXXX"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/officer/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    );
}

export default OfficerSignup;