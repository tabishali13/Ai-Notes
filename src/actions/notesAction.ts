"use server";
import { getUser } from "@/auth/server";
import { handleError } from "@/lib/utils";
import { prisma } from "@/db/prisma";
import { RollerCoaster } from "lucide-react";
import { ChatCompletionMessageParam } from "openai/resources/chat";
import openai from "@/openAi";

export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("User Must be logged in to update a note");

    await prisma.note.update({
        where: {id: noteId},
        data: {text},
    })

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const createNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("User Must be logged in to create a note");

    await prisma.note.create({
       data: {
            id: noteId,
            authorId: user.id,
            text: "",   
       }
    })

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const DeleteNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("User Must be logged in to delete a note");

    await prisma.note.delete({
        where: {id: noteId, authorId: user.id},
    })

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const AskAIBtnAction = async (newQuestion: string[], response: string[]) => {
 
    const user = await getUser();
    if (!user) throw new Error("User Must be logged in to as AI");

    const notes = await prisma.note.findMany({
      where: { authorId: user.id},
      orderBy: {createdAt: "desc"},
      select: {text: true, createdAt: true, updatedAt: true},
    })
    if (notes.length === 0) {
      return "You don't have any Notes Yet. Please Create them first."
    }

    const formattedNotes = notes.map((note) => (
    `
    Text: ${note.text}
    createdAt: ${note.createdAt}
    updatedAt: ${note.updatedAt}
    `.trim()
    )).join("\n");

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "developer",
        content: `
          You are a helpful assistant that answers questions about a user's notes. 
          Assume all questions are related to the user's notes. 
          Make sure that your answers are not too verbose and you speak succinctly. 
          Your responses MUST be formatted in clean, valid HTML with proper structure. 
          Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
          Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
          Avoid inline styles, JavaScript, or custom attributes.

          Rendered like this in JSX:
          <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />

          Here are the notes of the user:
          ${formattedNotes}
        `
      },
    ];

    for (let i = 0; i < newQuestion.length; i++){
      messages.push(
        {
          role: "user",
          content: newQuestion[i]
        }
      )
      if (response.length > i){
         messages.push(
        {
          role: "assistant",
          content: response[i] 
        } 
      );
      }
    }

    const complete  = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    })

    return complete.choices[0].message.content || "Some Problem Occurred. Please try again.";
}



