"use client";

import { Note } from "@prisma/client";
import {
  SidebarGroupContent as SidebarGroupContentCN,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import SelectNoteBtn from "./SelectNoteBtn";
import DeleteNoteBtn from "./DeleteNoteBtn";

type Props = {
  notes: Note[];
};

function SidebarGroupContent({ notes }: Props) {
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);
  console.log(notes);

  const fuse = useMemo(() => {
    return new Fuse(filteredNotes, {
      keys: ["text"],
      threshold: 0.5,
    });
  }, [filteredNotes]);

  const searchedNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : filteredNotes;

  const deleteLocalNote = (noteId: string) => {
    setFilteredNotes((filteredNotes) =>
      filteredNotes.filter((notes) => notes.id !== noteId),
    );
  };

  return (
    <SidebarGroupContentCN>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input
          className="bg-muted pl-8"
          placeholder="Search Your Notes"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <SidebarMenu>
        {searchedNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteBtn note={note} />
            <DeleteNoteBtn noteId={note.id} deleteLocally={deleteLocalNote} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentCN>
  );
}

export default SidebarGroupContent;
