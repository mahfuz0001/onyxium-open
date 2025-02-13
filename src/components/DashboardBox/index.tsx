"use client";

import { modelData } from "@/data/modelData";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaBolt,
  FaEllipsisV,
  FaHeart,
  FaQuestionCircle,
  FaSave,
  FaStar,
} from "react-icons/fa";
import { toast } from "../ui/use-toast";

export default function DashboardBox() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [bookmarkedModels, setBookmarkedModels] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const success = searchParams.get("success");

    if (success === "true") {
      const updateSubscription = async () => {
        const { data, error } = await supabase
          .from("subscriptions")
          .update({ status: "active" })
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

        if (error) {
          console.error("Error updating subscription:", error.message);
        } else {
          console.log("Subscription updated successfully:", data);
        }
      };

      updateSubscription();
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (modelInfo: string) => {
    setDropdownOpen(dropdownOpen === modelInfo ? null : modelInfo);
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const user = await supabase.auth.getUser();
        if (user.data?.user) {
          const userId = user.data.user.id;
          const { data, error } = await supabase
            .from("bookmarks")
            .select("model_info")
            .eq("user_id", userId);

          if (error) {
            console.error("Error fetching bookmarks:", error.message);
          } else {
            setBookmarkedModels(
              data.map((item: { model_info: string }) => item.model_info)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  const handleBookmarkClick = async (
    modelTitle: string,
    modelInfo: string,
    modelDescription: string,
    modelImage: string,
    modelCategory: string
  ) => {
    try {
      const user = await supabase.auth.getUser();
      if (user.data?.user) {
        const userId = user.data.user.id;

        if (bookmarkedModels.includes(modelInfo)) {
          const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("user_id", userId)
            .eq("model_info", modelInfo);

          if (error) {
            toast({
              description: "An error occurred while removing the bookmark",
              variant: "destructive",
            });
          } else {
            setBookmarkedModels((prev) =>
              prev.filter((item) => item !== modelInfo)
            );
            toast({
              description: "Model removed from bookmarks",
              variant: "default",
            });
          }
        } else {
          const { error } = await supabase.from("bookmarks").insert([
            {
              user_id: userId,
              model_title: modelTitle,
              model_info: modelInfo,
              model_image: modelImage,
              model_description: modelDescription,
              model_category: modelCategory,
            },
          ]);

          if (error) {
            toast({
              description: "An error occurred while bookmarking the model",
              variant: "destructive",
            });
          } else {
            setBookmarkedModels((prev) => [...prev, modelInfo]);
            toast({
              description: "Model saved successfully",
              variant: "default",
            });
          }
        }
      } else {
        console.error("User not logged in");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="grid grid-cols-1 gap-8">
        {modelData.map((category) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-4 text-indigo-800">
              {category.category}
            </h2>
            <p className="text-gray-700 mb-6">{category.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.models.map((model) => (
                <motion.div
                  key={model.info + model.title}
                  whileHover={{ scale: 1.05 }}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 flex flex-col justify-center items-center transform-cpu ${
                    model.info === "coming-soon" ? "opacity-75" : ""
                  }`}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    height: "100%",
                  }}
                >
                  {model.info === "coming-soon" && (
                    <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs font-bold p-1 rounded-bl-lg">
                      Coming Soon
                    </div>
                  )}
                  <div className="flex flex-col items-center h-full justify-center">
                    <div className="mb-4 relative">
                      <Image
                        src={model.icon}
                        width={120}
                        height={120}
                        alt={model.title}
                        loading="lazy"
                        className="rounded-xl transform transition-transform duration-300"
                      />
                    </div>
                    {model.info !== "coming-soon" && (
                      <>
                        <div
                          className="absolute top-4 right-4 cursor-pointer z-10"
                          onClick={() => handleDropdownToggle(model.info)}
                        >
                          <FaEllipsisV className="text-indigo-600 h-6 w-6" />
                          {dropdownOpen === model.info && (
                            <div
                              ref={dropdownRef}
                              className="absolute top-8 right-0 w-48 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden"
                            >
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-indigo-50 flex items-center transition-colors duration-200"
                                onClick={() => console.log("Help clicked")}
                              >
                                <FaQuestionCircle className="mr-2 text-indigo-600" />
                                Help
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-indigo-50 flex items-center transition-colors duration-200"
                                onClick={() =>
                                  console.log("Save Activity clicked")
                                }
                              >
                                <FaSave className="mr-2 text-indigo-600" />
                                Save Activity
                              </button>
                            </div>
                          )}
                        </div>
                        <div
                          className="absolute top-4 left-4 cursor-pointer z-10"
                          onClick={() =>
                            handleBookmarkClick(
                              model.title,
                              model.info,
                              model.description,
                              model.icon,
                              category.category
                            )
                          }
                        >
                          <FaHeart
                            className={`h-6 w-6 transition-colors duration-300 ${
                              bookmarkedModels.includes(model.info)
                                ? "text-red-500"
                                : "text-gray-400 hover:text-red-500"
                            }`}
                          />
                        </div>
                      </>
                    )}
                    <h3 className="text-xl font-semibold text-center mt-4 text-indigo-800">
                      {model.title}
                    </h3>
                    <p className="text-gray-600 text-center mt-2 line-clamp-2 flex-grow">
                      {model.description}
                    </p>
                    <div className="flex items-center justify-center mb-2 space-x-2">
                      <FaBolt className="text-yellow-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Fast
                      </span>
                      <FaStar className="text-yellow-500" />
                      <span className="text-sm font-medium text-gray-600">
                        4.8
                      </span>
                    </div>
                    {model.info === "coming-soon" ? (
                      <button className="bg-gray-400 text-white px-4 py-2 rounded-lg mt-4">
                        Coming Soon
                      </button>
                    ) : (
                      <Link
                        href={`/app/category/${category.category}/${model.info}`}
                        className="px-4 py-2 rounded-lg"
                      >
                        <button className="p-[3px] relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                          <div className="px-8 py-2 bg-white rounded-[6px] font-semibold relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
                            Use Now
                          </div>
                        </button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
