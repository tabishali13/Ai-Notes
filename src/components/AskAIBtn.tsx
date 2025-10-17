"use client";
import { User } from "@supabase/supabase-js";
import { useState, useTransition, useRef, Fragment } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { AskAIBtnAction } from "@/actions/notesAction";
import "@/styles/ai-response.css";

type Props = {
  user: User | null;
};

function AskAIBtn({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const textRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [questionText, setQuestionText] = useState("");
  const [question, setQuestion] = useState<string[]>([]);
  const [response, setResponse] = useState<string[]>([]);

  const handleOpenChange = (open: boolean) => {
    if (!user) {
      router.replace("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestion([]);
        setResponse([]);
      }
      setIsOpen(open);
    }
  };

  const handleInput = () => {
    const textarea = textRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClick = () => {
    textRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!questionText.trim()) return;

    const newQuestion = [...question, questionText.trim()];
    setQuestion(newQuestion);
    setQuestionText("");
    setTimeout(scrollBottom, 100);

    startTransition(async () => {
      const res = await AskAIBtnAction(newQuestion, response);
      setResponse((prev) => [...prev, res]);

      setTimeout(scrollBottom, 100);
    });
  };

  const scrollBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <form>
          <DialogTrigger asChild>
            <Button variant="secondary"> Ask AI </Button>
          </DialogTrigger>
          <DialogContent
            className="custom-scrollbar flex h-[85vh] max-w-4xl flex-col overflow-y-auto"
            ref={contentRef}
          >
            <DialogHeader>
              <DialogTitle>Ask AI About Notes</DialogTitle>
              <DialogDescription>
                Ask AI questions about your notes and get instant answers.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5 flex flex-col gap-6">
              {question.map((q, index) => (
                <Fragment key={index}>
                  <p className="bg-muted text-muted-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm">
                    {question}
                  </p>
                  {response[index] && (
                    <p
                      className="bot-response text-muted-foreground text-sm"
                      dangerouslySetInnerHTML={{ __html: response[index] }}
                    />
                  )}
                </Fragment>
              ))}
              {isPending && (
                <p className="animate-pulse text-sm">Generating...</p>
              )}
            </div>

            <div
              className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
              onClick={handleClick}
            >
              <Textarea
                ref={textRef}
                placeholder="Ask Me Anything About Your Note..."
                className=""
                rows={1}
                value={questionText}
                onKeyDown={handleEnterKey}
                onInput={handleInput}
                onChange={(e) => setQuestionText(e.target.value)}
              />
              <Button className="ml-auto size-8 rounded-full">
                <ArrowUpIcon className="text-background" />
              </Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default AskAIBtn;
