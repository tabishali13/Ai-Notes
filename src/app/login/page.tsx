import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";

function LoginPage() {
  return (
    <div className="mt-8 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center">Log in To Your Account</CardTitle>
          <CardDescription className="mt-2 text-center">
            Welcome Back! Please Enter Your Details
          </CardDescription>
        </CardHeader>
        <AuthForm type="login" />
      </Card>
    </div>
  );
}

export default LoginPage;
