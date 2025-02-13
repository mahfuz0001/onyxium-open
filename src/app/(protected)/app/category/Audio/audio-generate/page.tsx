"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { generateAudio } from "@/utils/hf-handlers";
import { useToast } from "@/components/ui/use-toast";

function GenerateSpeech(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    setAudioUrl("");

    const response = await generateAudio(inputValue);
    if (response) {
      const url = URL.createObjectURL(response);
      setAudioUrl(url);
    } else {
      toast({
        title: "Error",
        description: "Failed to generate audio",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleTextareaFocus = () => {
    setIsTextareaFocused(true);
  };

  const handleTextareaBlur = () => {
    setIsTextareaFocused(false);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-200 py-4 sm:py-10">
      <div className="relative py-1 sm:mx-auto sm:max-w-xl">
        <div className="relative bg-white px-6 py-8 shadow-lg sm:rounded-lg sm:px-4 sm:py-6">
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <textarea
              rows={2}
              cols={20}
              wrap=""
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={handleTextareaFocus}
              onBlur={handleTextareaBlur}
              className="w-full rounded bg-gray-200 px-3 py-2 text-gray-700 focus:border-cyan-400 focus:outline-none focus:ring"
              placeholder="Enter text to generate audio"
            />
            <button
              type="submit"
              className={`mb-1 mt-5 w-full rounded-md bg-gradient-to-r from-cyan-400 to-green-500 px-3 py-2 text-white focus:outline-none ${
                isTextareaFocused ? "mt-2" : "mt-0"
              }`}
              disabled={loading}
            >
              Generate Audio
            </button>
          </form>
          <Link
            href="/"
            className="mt-4 px-2 py-1 text-sm text-gray-600 hover:text-cyan-700 hover:underline"
          >
            Back to Home &rarr;
          </Link>
        </div>
      </div>

      {loading && (
        <div className="mt-12 flex justify-center">
          <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
        </div>
      )}

      {audioUrl && (
        <div className="relative mt-8 flex justify-center">
          <audio key={audioUrl} controls>
            <source src={audioUrl} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default GenerateSpeech;
