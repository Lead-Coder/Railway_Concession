import React, { useState } from 'react';
import { SignupForm } from "@/components/sign-up-form"

const StudentSignup: React.FC = () => {
    return (
    <div className="flex h-screen w-screen items-center justify-center px-4">
        <SignupForm />
    </div>
    
    );
};

export default StudentSignup;