"use client";
import React from "react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { logOutAction } from "@/actions/users";

const LogOutBtn = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // logout logic here
      const { errorMessage } = await logOutAction();

      if (!errorMessage) {
        toast.success("Logged Out successfully");
        router.push("/");
      } else {
        toast.error("Fauled to log out");
      }
    } catch (error) {
      // handle errors here
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      {loading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
};

export default LogOutBtn;
