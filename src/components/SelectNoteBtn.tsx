"use client";
import useNote from "@/hooks/useNote";
import { Note } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";

type Props = {
  note: Note;
};

function SelectNoteBtn({ note }: Props) {
  const [localNoteText, setLocalNoteText] = useState(note.text);
  const [shouldBeGlobal, setShouldBeGlobal] = useState(false);
  const noteId = useSearchParams().get("noteId") || "";
  const { noteText: selectedNoteText } = useNote();

  useEffect(() => {
    if (noteId === note.id) {
      setShouldBeGlobal(true);
    } else {
      setShouldBeGlobal(false);
    }
  }, [note.text, noteId]);

  useEffect(() => {
    if (shouldBeGlobal) {
      setLocalNoteText(selectedNoteText);
    }
  }, [selectedNoteText, shouldBeGlobal]);

  const blankText = "Empty Note";
  let noteText = localNoteText || blankText;

  if (shouldBeGlobal) {
    noteText = selectedNoteText || blankText;
  }

  return (
    <>
      <SidebarMenuButton
        asChild
        className={`items-start gap-0 pr-12 ${note.id === noteId} ? bg-sidebar-accent/40`}
      >
        <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
          <p className="w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
            {noteText}
          </p>
          <p className="text-muted-foreground text-xs">
            {note.updatedAt.toLocaleDateString()}
          </p>
        </Link>
      </SidebarMenuButton>
    </>
  );
}

export default SelectNoteBtn;
