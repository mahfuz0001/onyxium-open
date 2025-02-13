"use client";

import Button from "@/components/ui/Button/index";
import Card from "@/components/ui/Card";
import { updateProfilePicture } from "@/utils/auth-helpers/server";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useToast } from "../use-toast";

export default function ProfilePictureUpload({
  avatarUrl,
}: {
  avatarUrl: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null); // Store the file object here
  const [dragActive, setDragActive] = useState(false);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState(avatarUrl); // Keep track of the current avatar URL
  const { toast } = useToast();

  const handleFileChange = useCallback((file: File) => {
    if (file) {
      setFile(file); // Save the file object

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);

      const maxFileNameLength = 20;
      const truncatedName =
        file.name.length > maxFileNameLength
          ? `${file.name.substring(0, maxFileNameLength - 4)}...${file.name
              .split(".")
              .pop()}`
          : file.name;
      setFileName(truncatedName);
    }
  }, []);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files[0]);
      }
    },
    [handleFileChange]
  );

  const handleSaveImage = useCallback(async () => {
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file); // Append the file object

      setIsSubmitting(true);
      try {
        const response = await updateProfilePicture(formData);

        if (response.error) {
          toast({
            title: "Error",
            description: response.message,
            variant: "destructive",
          });
          console.error("Error updating profile picture:", response.message);
        } else {
          toast({
            title: "Success",
            description: response.message,
            variant: "default",
          });

          // Update the current avatar URL with the new image URL
          const newAvatarUrl = response.updatedAvatarUrl || ""; // Replace with the correct field from the response
          setCurrentAvatarUrl(newAvatarUrl);

          setPreviewImage(null);
          setFile(null); // Clear the file after successful upload
          setFileName(null);
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
        toast({
          title: "Error",
          description:
            "An error occurred while updating profile picture. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [file, toast]);

  return (
    <Card
      title="Profile Picture"
      description="Upload or change your profile picture."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">Accepted formats: .jpg, .png, .gif</p>
          {previewImage ? (
            <Button
              variant="slim"
              onClick={handleSaveImage}
              loading={isSubmitting}
            >
              Save Picture
            </Button>
          ) : null}
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive ? "border-primary bg-primary/10" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {previewImage || currentAvatarUrl ? (
            <Image
              src={previewImage || currentAvatarUrl}
              alt="Profile"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-4xl text-gray-500">?</span>
            </div>
          )}

          <label
            htmlFor="profilePicture"
            className="cursor-pointer p-2 border rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Choose File
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={(e) =>
              e.target.files &&
              e.target.files[0] &&
              handleFileChange(e.target.files[0])
            }
            className="hidden"
          />
          {fileName && <p className="text-sm text-gray-500 mt-2">{fileName}</p>}
          <p className="text-sm text-gray-500 mt-2">
            or drag and drop your image here
          </p>
        </div>
      </div>
    </Card>
  );
}
