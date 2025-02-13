"use client";

import { useToast } from "@/components/ui/use-toast";
import { generateImage } from "@/utils/hf-handlers";
import Image from "next/image";
import { FormEvent, useState } from "react";

const ImageGeneration = () => {
  const [inputValue, setInputValue] = useState<string>(
    "An astronaut riding a rainbow unicorn, cinematic, dramatic",
  );
  const [negativeInput, setNegativeInput] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    const response = await generateImage(inputValue, negativeInput);

    if (response) {
      const imageUrl = URL.createObjectURL(response);
      setImageUrl(imageUrl);
    } else {
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-col lg:flex-row h-full">
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="max-w-md w-full">
          <form onSubmit={handleSubmit}>
            <textarea
              rows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-lg bg-gray-200 px-3 py-2 text-gray-700 focus:border-cyan-400 focus:outline-none focus:ring"
              placeholder="Enter your imagination..."
            />
            <input
              type="text"
              value={negativeInput}
              onChange={(e) => setNegativeInput(e.target.value)}
              className="w-full rounded-lg bg-gray-200 px-3 py-2 mt-4 text-gray-700 focus:border-cyan-400 focus:outline-none focus:ring"
              placeholder="Enter a negative prompt"
            />
            <button
              type="submit"
              className={`w-full mt-4 rounded-md bg-gradient-to-r from-cyan-400 to-green-500 px-3 py-2 text-white focus:outline-none`}
              disabled={loading}
            >
              Generate
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center relative p-4">
        {loading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {imageUrl && !loading && (
          <div>
            <Image
              src={imageUrl}
              alt="Generated image"
              className="rounded-lg shadow-lg"
              height={350}
              width={350}
            />
          </div>
        )}
        {!imageUrl && !loading && (
          <div>
            <Image
              src="/assets/app/placeholder.png"
              alt="Placeholder image"
              className="rounded-lg shadow-lg opacity-50 pointer-events-none"
              height={500}
              width={500}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGeneration;
