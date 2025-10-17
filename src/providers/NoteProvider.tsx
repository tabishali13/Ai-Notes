"use client";
import React, { createContext, useContext, useState } from "react";

type NoteContextType = {
  noteText: string;
  setNoteText: (text: string) => void;
};

export const NoteContext = createContext<NoteContextType>({
  noteText: "",
  setNoteText: () => {},
});

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [noteText, setNoteText] = useState("");
  return (
    <NoteContext.Provider value={{ noteText, setNoteText }}>
      {children}
    </NoteContext.Provider>
  );
};
