"use client";

import ProgressBar from "@/components/ProgressBar";
import { useToast } from "@/components/ui/use-toast";
import { answerQuestion } from "@/utils/hf-handlers";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

function QuestionAnswer(): JSX.Element {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [questionInput, setQuestionInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setAnswer("");
      setScore(null);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageUrl(imageUrl);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (!imageFile) return;

    setLoading(true);

    const response = await answerQuestion(questionInput, imageFile);
    if (response) {
      setAnswer(response.answer);
      setScore(response.score);
    } else {
      toast({
        title: "Error",
        description: "Failed to answer the question",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-col lg:flex-row h-full">
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="max-w-md w-full">
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded bg-gray-200 from-green-500 to-cyan-400 px-5 py-3 text-gray-700 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-500 hover:file:bg-gradient-to-r hover:file:text-cyan-50"
            />
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              className="mt-3 w-full rounded bg-gray-200 px-5 py-1 text-gray-700 focus:border-cyan-400 focus:outline-none focus:ring"
              placeholder="Ask your queries"
            />
            <button
              type="submit"
              className="w-full mt-4 rounded-md bg-gradient-to-r from-cyan-400 to-green-500 px-3 py-2 text-white focus:outline-none"
              disabled={!imageFile || loading}
            >
              Get Answer
            </button>
          </form>
          <Link
            href="/"
            className="mt-4 px-2 py-1 text-sm text-gray-600 hover:text-lime-700 hover:underline"
          >
            Back to Home &rarr;
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center relative p-4">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {answer && score && (
              <div className="flex flex-col items-center gap-4 text-gray-800">
                <div className="w-60 rounded-lg border-2 border-dashed border-lime-600/30 bg-teal-100/50 px-4 py-4 text-teal-800">
                  <h4 className="text-center">{answer}</h4>
                </div>
                <ProgressBar score={score} />
              </div>
            )}
            {selectedImageUrl && (
              <div className="mt-4 flex justify-center">
                <Image
                  src={selectedImageUrl}
                  alt="Uploaded image"
                  className="rounded-lg shadow-lg"
                  height={350}
                  width={350}
                />
              </div>
            )}
            {!selectedImageUrl && !loading && (
              <Image
                src="/assets/app/placeholder.png"
                alt="Placeholder image"
                className="rounded-lg shadow-lg opacity-50 pointer-events-none"
                height={500}
                width={500}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionAnswer;
