"use client";

import { useToast } from "@/components/ui/use-toast";
import { detectImage } from "@/utils/hf-handlers";
import { convertImageToBlob } from "@/utils/utils";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

function ImageUpload(): JSX.Element {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [detectedImageUrl, setDetectedImageUrl] = useState<string | null>(null);
  const [detectedObjects, setDetectedObjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setDetectedImageUrl(null);
      setDetectedObjects([]);

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
    setDetectedImageUrl(null);
    setDetectedObjects([]);

    const imageToDetect = await convertImageToBlob(imageFile);
    const response = await detectImage(imageFile);

    if (response) {
      const imageUrl = URL.createObjectURL(imageToDetect);
      setDetectedImageUrl(imageUrl);
      setDetectedObjects(response);
    } else {
      toast({
        title: "Error",
        description: "Failed to detect objects in image",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleImageLoad = () => {
    const img = imageRef.current;
    if (img) {
      const imageWidth = img.naturalWidth || 350;
      const imageHeight = img.naturalHeight || 350;
      const scale = Math.min(
        (0.9 * 350) / imageWidth,
        (0.9 * 350) / imageHeight,
      );

      setDetectedObjects((prevObjects) => {
        return prevObjects.map((obj) => ({
          ...obj,
          box: {
            xmin: (obj.box.xmin + 10) * scale,
            ymin: (obj.box.ymin + 10) * scale,
            xmax: (obj.box.xmax - 10) * scale,
            ymax: (obj.box.ymax - 10) * scale,
          },
        }));
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to load image",
        variant: "destructive",
      });
    }
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
              Detect Objects
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center relative p-4">
        {detectedImageUrl ? (
          <div className="relative">
            <Image
              src={detectedImageUrl}
              alt="Detected image"
              className="rounded-lg shadow-lg"
              height={350}
              width={350}
              ref={imageRef}
              onLoad={handleImageLoad}
            />

            {detectedObjects.map((obj, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${(obj.box.xmin / 350) * 100}%`,
                  top: `${(obj.box.ymin / 350) * 100}%`,
                  width: `${((obj.box.xmax - obj.box.xmin) / 350) * 100}%`,
                  height: `${((obj.box.ymax - obj.box.ymin) / 350) * 100}%`,
                  border: "1px solid red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 100,
                }}
              >
                <span className="rounded-sm bg-red-500 px-1 py-1 text-xs font-bold text-white">
                  {obj.label} ({(obj.score * 100).toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <Image
            src="/assets/app/placeholder.png"
            alt="Placeholder image"
            className="rounded-lg shadow-lg opacity-50 pointer-events-none"
            height={500}
            width={500}
          />
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
