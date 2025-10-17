import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import LogOutBtn from "./LogOutBtn";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
  const user = await getUser(); // Replace with actual user authentication logic
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-6"
      style={{
        boxShadow:
          "0 0 5px rgba(59, 130, 246, 0.3), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.3)",
      }}
    >
      <SidebarTrigger className="absolute top-1 left-1" />
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/ai-robot.png"
          alt="logo"
          height={60}
          width={60}
          className="rounded-full"
          priority
        ></Image>
        <h1 className="flex flex-col pb-1 text-2xl leading-6 font-semibold">
          AI <span>Notes</span>{" "}
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutBtn />
        ) : (
          <>
            <Button asChild className="hidden sm:block">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}

        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
