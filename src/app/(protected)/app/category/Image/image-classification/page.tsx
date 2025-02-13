"use client";

import { useToast } from "@/components/ui/use-toast";
import { imageClassification } from "@/utils/hf-handlers";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

function ImageClassificationPage(): JSX.Element {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [classificationResults, setClassificationResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast({
        title: "Success",
        description: "Image loaded successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to read image file",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setClassificationResults([]);

    const response = await imageClassification(imageFile);

    if (response) {
      setClassificationResults(response);
    } else {
      toast({
        title: "Error",
        description: "Failed to classify the image",
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
            <button
              type="submit"
              className="w-full mt-4 rounded-md bg-gradient-to-r from-cyan-400 to-green-500 px-3 py-2 text-white focus:outline-none"
              disabled={!imageFile || loading}
            >
              {loading ? "Classifying..." : "Classify Image"}
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center relative p-4">
        {imageSrc && (
          <div className="mb-4">
            <Image
              src={imageSrc}
              alt="Selected image"
              className="rounded-lg shadow-lg"
              height={350}
              width={350}
            />
          </div>
        )}
        {classificationResults.length > 0 && (
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Classification Results:</h2>
            <ul>
              {classificationResults.map((result, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{result.label}</span>:{" "}
                  <span>{(result.score * 100).toFixed(2)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {loading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageClassificationPage;
