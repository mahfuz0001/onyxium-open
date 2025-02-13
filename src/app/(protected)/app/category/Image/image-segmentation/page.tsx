"use client";

import { useToast } from "@/components/ui/use-toast";
import { imageSegmentation } from "@/utils/hf-handlers";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

function ImageSegmentationPage(): JSX.Element {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [segmentationResults, setSegmentationResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    setSegmentationResults([]);

    const response = await imageSegmentation(imageFile);

    if (response) {
      setSegmentationResults(response);
    } else {
      toast({
        title: "Error",
        description: "Failed to segment the image",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (imageSrc && segmentationResults.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);

          segmentationResults.forEach(({ mask }) => {
            const maskImage = new Image();
            maskImage.src = `data:image/png;base64,${mask}`;
            maskImage.onload = () => {
              ctx.globalAlpha = 0.5;
              ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
              ctx.globalAlpha = 1.0;
            };
          });
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
      }
    }
  }, [imageSrc, segmentationResults]);

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const x = event.offsetX;
    const y = event.offsetY;

    segmentationResults.forEach(({ mask }) => {
      const maskImage = new Image();
      maskImage.src = `data:image/png;base64,${mask}`;
      maskImage.onload = () => {
        ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const color = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0.5)`;
        canvas.style.backgroundColor = color;
      };
    });
  };

  const handleMouseLeave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const image = new Image();
    image.src = imageSrc as string;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
    canvas.style.removeProperty("background-color");
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
              {loading ? "Segmenting..." : "Segment Image"}
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center relative p-4">
        {imageSrc && (
          <div className="relative mb-4">
            <img
              src={imageSrc}
              alt="Selected image"
              className="rounded-lg shadow-lg"
              height={350}
              width={350}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 rounded-lg shadow-lg"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            ></canvas>
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

export default ImageSegmentationPage;
