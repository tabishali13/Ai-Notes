"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";
import { createNoteAction } from "@/actions/notesAction";

type Props = {
  user: User | null;
};

function NewNoteBtn({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNewNote = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);
      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);
      setLoading(false);
    }
  };

  console.log(user?.email);
  return (
    <Button
      onClick={handleNewNote}
      className="w-24"
      variant="secondary"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}

export default NewNoteBtn;
