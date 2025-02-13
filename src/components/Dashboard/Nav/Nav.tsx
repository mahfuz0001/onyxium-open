"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { AIModel, Model, modelData } from "@/data/modelData";
import { createClient } from "@/utils/supabase/client";
import { Bell, Bolt, ChevronDown, Menu, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import NavProfile from "../User/NavProfile";

type NavbarProps = {
  apiLimitCount: number;
  isPro: boolean;
  credits: number;
  plan: string;
  isLifetime: boolean;
};

export default function Navbar({
  apiLimitCount,
  isPro,
  credits,
  plan,
  isLifetime,
}: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [favoriteModels, setFavoriteModels] = useState<string[]>([]);
  const [notifications] = useState(["This feature is coming soon"]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchFavoriteModels = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      if (user.data?.user) {
        const { data, error } = await supabase
          .from("bookmarks")
          .select("model_title")
          .eq("user_id", user.data.user.id);

        if (error) {
          console.error("Error fetching favorite models:", error);
        } else {
          setFavoriteModels(data.map((item) => item.model_title));
        }
      }
    };

    fetchFavoriteModels();
  }, []);

  useEffect(() => {
    const results = modelData
      .flatMap((cat) => cat.models)
      .filter(
        (model) =>
          (selectedCategory === "All categories" ||
            modelData.some(
              (cat) =>
                cat.category === selectedCategory && cat.models.includes(model)
            )) &&
          (model.title
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
            model.description
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()))
      );
    setFilteredModels(results);
  }, [debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModelClick = (model: Model, cat: AIModel) => {
    try {
      router.push(`/app/category/${cat.category}/${model.info}`);
      setSearchTerm("");
      setIsMenuOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error navigating to the model.",
        variant: "destructive",
      });
    }
  };

  const toggleFavorite = async (modelTitle: string) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    if (user.data?.user) {
      const userId = user.data.user.id;
      if (favoriteModels.includes(modelTitle)) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("model_title", modelTitle);

        if (error) {
          console.error("Error removing favorite:", error);
          toast({
            title: "Error",
            description: "Failed to remove from favorites.",
            variant: "destructive",
          });
        } else {
          setFavoriteModels(
            favoriteModels.filter((title) => title !== modelTitle)
          );
          toast({
            title: "Success",
            description: "Removed from favorites.",
            variant: "default",
          });
        }
      } else {
        const { error } = await supabase
          .from("bookmarks")
          .insert({ user_id: userId, model_title: modelTitle });

        if (error) {
          console.error("Error adding favorite:", error);
          toast({
            title: "Error",
            description: "Failed to add to favorites.",
            variant: "destructive",
          });
        } else {
          setFavoriteModels([...favoriteModels, modelTitle]);
          toast({
            title: "Success",
            description: "Added to favorites.",
            variant: "default",
          });
        }
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full rounded-xl bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-lg backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-2xl transition-transform duration-300 hover:scale-110"
            />
            {/* <span className="text-2xl font-bold text-white">Onyxium AI</span> */}
          </Link>

          <div
            className="hidden md:flex flex-1 mx-4 relative"
            ref={searchContainerRef}
          >
            <div className="flex items-center w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="mr-2 rounded-full">
                    {selectedCategory} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white rounded-xl shadow-lg p-2">
                  <DropdownMenuItem
                    className="rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    onSelect={() => setSelectedCategory("All categories")}
                  >
                    All categories
                  </DropdownMenuItem>
                  {modelData.map((cat, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      onSelect={() => setSelectedCategory(cat.category)}
                    >
                      {cat.category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search Models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-full rounded-full bg-white placeholder-white/70 text-black"
                />
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white" />
              </div>
            </div>
            {searchTerm && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-50">
                <ScrollArea className="max-h-[60vh]">
                  {filteredModels.length > 0 ? (
                    filteredModels.map((model, index) => {
                      const category = modelData.find((cat) =>
                        cat.models.includes(model)
                      );
                      if (category) {
                        return (
                          <div
                            key={index}
                            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                            onClick={() => handleModelClick(model, category)}
                          >
                            <Image
                              src={model.icon}
                              alt={model.title}
                              width={48}
                              height={48}
                              className="rounded-lg mr-4"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold flex items-center text-gray-800">
                                {model.title}
                                {model.info === "coming-soon" && (
                                  <span className="text-red-500 text-sm font-normal ml-2 bg-red-100 px-2 py-1 rounded-full">
                                    Coming Soon
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {model.description}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(model.title);
                              }}
                            >
                              <Star
                                className={`h-5 w-5 ${favoriteModels.includes(model.title)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-400"
                                  }`}
                              />
                            </Button>
                          </div>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <p className="text-center py-4 text-gray-600">
                      No models found.
                    </p>
                  )}
                </ScrollArea>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Star className="h-5 w-5 text-yellow-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-xl shadow-lg p-2">
                <DropdownMenuItem className="rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <h3 className="font-semibold">Favorite Models</h3>
                </DropdownMenuItem>
                {favoriteModels.length > 0 ? (
                  favoriteModels.map((modelTitle, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      onSelect={() => {
                        const model = modelData
                          .flatMap((cat) => cat.models)
                          .find((m) => m.title === modelTitle);
                        const category = modelData.find((cat) =>
                          cat.models.some((m) => m.title === modelTitle)
                        );
                        if (model && category)
                          handleModelClick(model, category);
                      }}
                    >
                      {modelTitle}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem className="rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    No favorite models
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white rounded-xl shadow-lg p-2">
                <DropdownMenuItem className="rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <h3 className="font-semibold">Notifications</h3>
                </DropdownMenuItem>
                {notifications.map((notification, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    {notification}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center space-x-1 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              <Bolt className="text-yellow-300 mr-2 h-5 w-5" />
              <span>
                {apiLimitCount} / {isPro ? "∞" : credits} Credits
              </span>
            </div>

            <NavProfile
              apiLimitCount={apiLimitCount}
              isPro={isPro}
              plan={plan}
              isLifetime={isLifetime}
            />
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Input
              type="search"
              placeholder="Search Models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full bg-white/20 placeholder-white/70 text-white"
            />
            <div className="flex justify-between">
              <Button variant="secondary" className="rounded-full flex-1 mr-2">
                <Star className="h-5 w-5 text-yellow-400 mr-2" />
                Favorites
              </Button>
              <Button variant="secondary" className="rounded-full flex-1 ml-2">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </Button>
            </div>
            <div className="bg-white/20 text-white px-4 py-3 rounded-full text-sm font-semibold shadow-md flex items-center justify-center">
              <Bolt className="text-yellow-300 mr-2 h-5 w-5" />
              <span>
                {apiLimitCount} / {isPro ? "∞" : credits} Credits Used
              </span>
            </div>
            <NavProfile
              apiLimitCount={apiLimitCount}
              isPro={isPro}
              plan={plan}
              isLifetime={isLifetime}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
