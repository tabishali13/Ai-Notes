"use client";
import { useContext } from "react";
import { NoteContext } from "../providers/NoteProvider";

const useNote = () => {
    const context = useContext(NoteContext);
    if (!context){
        throw new Error("useNote must be used within a NoteProvider");
    }
    return context
}
export default useNote;