"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHistory,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";

type Model = {
  title: string;
  info: string;
  icon: string;
  description: string;
};

type Category = {
  category: string;
  title: string;
  description: string;
  models: Model[];
};

type Props = {
  data: Category[];
};

export default function Sidebar({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleModelClick = (category: string, model: string) => {
    setActiveModel(model);
    router.push(`/app/category/${category}/${model}`);
  };

  const handleHistoryClick = () => {
    router.push("/app/history");
  };

  const handleHelpClick = () => {
    router.push("/app/help");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length >= 3) {
      const category = pathParts[2];
      const model = pathParts[3];
      setActiveCategory(category || null);
      setActiveModel(model || null);
    }
  }, [pathname]);

  return (
    <motion.div
      initial={false}
      animate={{ width: isSidebarOpen ? "280px" : "58px" }}
      className="h-screen bg-gray-50 border-r border-gray-200 overflow-hidden relative"
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Image src="/Logo.png" width={140} height={40} alt="Logo" />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-hide">
          <ul className="space-y-2 p-2">
            <SidebarItem
              icon={<FaHome />}
              text="Home"
              onClick={() => router.push("/")}
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon={<RiDashboardLine />}
              text="Dashboard"
              onClick={() => router.push("/dashboard")}
              isOpen={isSidebarOpen}
            />

            {data.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  onMouseEnter={() => setIsSidebarOpen(true)}
                >
                  <span className="text-gray-500">
                    {isSidebarOpen ? (
                      "▸"
                    ) : (
                      <Image
                        src={category.models[0]?.icon || "/default-icon.png"}
                        width={24}
                        height={24}
                        alt={category.category}
                        className="rounded-md"
                      />
                    )}
                  </span>
                  {isSidebarOpen && (
                    <span className="ml-2 text-lg font-medium">
                      {category.category}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {activeCategory === category.category && isSidebarOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 space-y-1"
                    >
                      {category.models.map((model, modelIndex) => (
                        <motion.li
                          key={modelIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <button
                            onClick={() =>
                              handleModelClick(category.category, model.info)
                            }
                            className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                              activeModel === model.info ? "bg-gray-200" : ""
                            }`}
                          >
                            <Image
                              src={model.icon}
                              width={24}
                              height={24}
                              alt={model.title}
                              className="rounded-md"
                            />
                            <span className="ml-2 text-lg truncate max-w-[140px] hover:overflow-visible hover:text-clip">
                              {model.title}
                            </span>
                            {model.info === "coming-soon" && (
                              <span className="ml-2 text-sm text-red-500">
                                (Coming Soon)
                              </span>
                            )}
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-2 border-t border-gray-200">
          <ul className="space-y-2">
            <SidebarItem
              icon={<FaHistory />}
              text="History"
              onClick={handleHistoryClick}
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon={<FaQuestionCircle />}
              text="Help"
              onClick={handleHelpClick}
              isOpen={isSidebarOpen}
            />
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function SidebarItem({
  icon,
  text,
  onClick,
  isOpen,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  isOpen: boolean;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="w-full flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <span className="text-gray-700 text-xl">{icon}</span>
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="ml-2 text-lg font-medium truncate max-w-[160px] hover:overflow-visible hover:text-clip"
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </li>
  );
}
