"use client";

import { useToast } from "@/components/ui/use-toast";
import { imageToText } from "@/utils/hf-handlers";
import { ChangeEvent, FormEvent, useState } from "react";

type ImageToTextOutput = string | null;

const ImageToTextPage = (): JSX.Element => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [textResult, setTextResult] = useState<ImageToTextOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
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
    setTextResult(null);

    const imageTextResponse = await imageToText(imageFile);

    if (imageTextResponse) {
      setTextResult(imageTextResponse.generated_text);
    } else {
      toast({
        title: "Error",
        description: "Failed to extract text from the image",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded bg-gray-200 px-5 py-3 text-gray-700 mb-4"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-black text-white px-3 py-2"
          disabled={!imageFile || loading}
        >
          {loading ? "Extracting Text..." : "Extract Text"}
        </button>
      </form>
      {textResult && (
        <div className="max-w-md w-full p-4 bg-gray-100 mt-4 rounded">
          <p className="text-lg font-semibold">Extracted Text:</p>
          <p>{textResult}</p>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center relative p-4">
          <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageToTextPage;
