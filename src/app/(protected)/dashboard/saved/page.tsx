"use client";

import { RecommendedModels } from "@/components/Dashboard/Saved/RecommendedModels";
import { Footer } from "@/components/Home";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cardContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Model, modelData } from "@/data/modelData";
import { createClient } from "@/utils/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FaFilter,
  FaRegStar,
  FaSearch,
  FaStar,
  FaTrashAlt,
} from "react-icons/fa";

interface SavedItem {
  model_info: string;
  model_title: string;
  model_description: string;
  model_category: string;
  model_image: string;
  rating: number;
  saved_at: string;
}

const SavedPage = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [recommendations, setRecommendations] = useState<Model[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSavedItems = async () => {
      setIsLoading(true);
      try {
        const user = await createClient().auth.getUser();
        if (user.data?.user) {
          const userId = user.data.user.id;
          const { data, error } = await createClient()
            .from("bookmarks")
            .select("*")
            .eq("user_id", userId);

          if (error) {
            console.error("Error fetching saved items:", error.message);
          } else {
            setSavedItems(data);
          }
        }
      } catch (error) {
        console.error("Error fetching saved items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedItems();
  }, []);

  useEffect(() => {
    const generateRecommendations = () => {
      // Count the occurrences of each category
      const categoryCounts = savedItems.reduce(
        (acc, item) => {
          acc[item.model_category] = (acc[item.model_category] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Sort categories by count
      const sortedCategories = Object.entries(categoryCounts).sort(
        (a, b) => b[1] - a[1]
      );

      // Get the most common category
      const mostCommonCategory = sortedCategories[0]?.[0];

      // Filter models from the most common category
      const commonCategoryModels =
        modelData
          .find((category) => category.category === mostCommonCategory)
          ?.models.filter(
            (model) =>
              !savedItems.some((item) => item.model_info === model.info)
          )
          .slice(0, 4) || [];

      // Filter models from other categories
      const otherCategoryModels = modelData
        .filter((category) => category.category !== mostCommonCategory)
        .flatMap((category) => category.models)
        .filter(
          (model) => !savedItems.some((item) => item.model_info === model.info)
        )
        .slice(0, 2);

      // Combine and shuffle the recommendations
      const combinedRecommendations = [
        ...commonCategoryModels,
        ...otherCategoryModels,
      ].sort(() => Math.random() - 0.5);

      setRecommendations(combinedRecommendations);
    };

    generateRecommendations();
  }, [savedItems]);

  const handleRemoveBookmark = async (modelInfo: string) => {
    try {
      const user = await createClient().auth.getUser();
      if (user.data?.user) {
        const userId = user.data.user.id;
        const { error } = await createClient()
          .from("bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("model_info", modelInfo);

        if (error) {
          console.error("Error removing bookmark:", error.message);
        } else {
          setSavedItems((prev) =>
            prev.filter((item) => item.model_info !== modelInfo)
          );
          toast({
            title: "Success",
            description: "Bookmark removed.",
            variant: "default",
          });
        }
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  const filteredItems = useMemo(() => {
    return savedItems.filter((item) => {
      const matchesSearch =
        item.model_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model_description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.model_category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [savedItems, searchTerm, selectedCategory]);

  const categories = [
    "All",
    ...Array.from(new Set(savedItems.map((item) => item.model_category))),
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto space-y-12"
        >
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-indigo-800">Saved Items</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search saved items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    <FaFilter className="mr-2" />
                    {selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onSelect={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-0">
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-24 w-full mb-4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-center text-xl"
            >
              {savedItems.length === 0
                ? "You haven't saved any items yet. Start exploring and save your favorite models!"
                : "No saved items match your search. Try adjusting your filters."}
            </motion.p>
          ) : (
            <AnimatePresence>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.model_info}
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <Image
                                src={item.model_image || "/default-logo.png"}
                                alt={item.model_title}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                <Link
                                  href={`/app/category/${item.model_category}/${item.model_info}`}
                                  className="text-indigo-600 hover:underline"
                                >
                                  {item.model_title}
                                </Link>
                              </CardTitle>
                              <CardDescription>
                                {item.model_category}
                              </CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveBookmark(item.model_info)
                            }
                            className="text-red-500 hover:text-red-700 transition-colors duration-300"
                          >
                            <FaTrashAlt className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {item.model_description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.span
                              key={star}
                              whileHover={{ scale: 1.2 }}
                              className="cursor-pointer"
                            >
                              {star <= (item.rating || 0) ? (
                                <FaStar className="text-yellow-400" />
                              ) : (
                                <FaRegStar className="text-gray-300" />
                              )}
                            </motion.span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          Saved on{" "}
                          {new Date(item.saved_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-indigo-800">
              Recommended Models
            </h2>
            <RecommendedModels
              recommendations={recommendations.map((model) => ({
                ...model,
                id: model.info,
                description: model.description,
                logo: model.icon,
                api: model.api,
                title: model.title,
                icon: model.icon,
                info: model.info,
              }))}
            />
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default SavedPage;
