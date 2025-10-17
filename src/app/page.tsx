import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import AskAIBtn from "@/components/AskAIBtn";
import NewNoteBtn from "@/components/NewNoteBtn";
import NoteTextInput from "@/components/NoteTextInput";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();
  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      authorId: user?.id,
    },
  });
  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIBtn user={user} />
        <NewNoteBtn user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </div>
  );
}

export default HomePage;
