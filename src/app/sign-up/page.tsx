import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";

const SignUpPage = () => {
  return (
    <div className="mt-8 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="mt-2 text-center">
            Please Enter Your Details to Create an Account
          </CardDescription>
        </CardHeader>
        <AuthForm type="signup" />
      </Card>
    </div>
  );
};

export default SignUpPage;
