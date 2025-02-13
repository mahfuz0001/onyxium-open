"use client";

import { useState, ChangeEvent, FormEvent, useRef } from "react";
import Link from "next/link";
import { transcribeAudio } from "@/utils/hf-handlers";
import StreamingText from "@/components/StreamingText";
import { useToast } from "@/components/ui/use-toast";

interface TranscribeResponse {
  text: string;
}

function AudioUpload(): JSX.Element {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [transcribedText, setTranscribedText] =
    useState<TranscribeResponse | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setTranscribedText(null);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (!audioFile) return;

    setLoading(true);
    const response = await transcribeAudio(audioFile);

    if (response) {
      setTranscribedText(response);
    } else {
      toast({
        title: "Error",
        description: "Failed to transcribe audio",
        variant: "destructive",
      });
      setTranscribedText(null);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-200 py-4 sm:py-10">
      <div className="relative py-1 sm:mx-auto sm:max-w-xl">
        <div className="relative bg-white px-6 py-8 shadow-lg sm:rounded-lg sm:px-4 sm:py-6">
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="w-full rounded bg-gray-200 from-green-500 to-cyan-400 px-5 py-3 text-gray-700 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-500 hover:file:bg-gradient-to-r hover:file:text-cyan-50"
            />
            <button
              type="submit"
              className="mb-1 mt-5 w-full rounded-md bg-gradient-to-r from-green-500 to-cyan-500 px-3 py-2 text-white focus:outline-none"
              disabled={!audioFile || loading}
            >
              Transcribe Audio
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

      {transcribedText && (
        <div className="mt-8 flex flex-col items-center gap-4 text-gray-800">
          <div className="w-94 rounded-lg border-2 border-dashed border-lime-600/30 bg-teal-100/50 px-4 py-4 text-teal-800">
            <StreamingText text={transcribedText.text} />
          </div>
        </div>
      )}

      {audioFile && (
        <div className="relative mt-8 flex justify-center">
          <audio key={audioFile?.name} ref={audioRef} controls>
            <source src={URL.createObjectURL(audioFile)} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default AudioUpload;
