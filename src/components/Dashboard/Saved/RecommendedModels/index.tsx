import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cardContent";
import { Model } from "@/data/modelData";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface RecommendedModelsProps {
  recommendations: Model[];
}

export const RecommendedModels = ({
  recommendations,
}: RecommendedModelsProps) => {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  // Filter out models that are coming soon
  const filteredRecommendations = recommendations.filter(
    (model) => model.info !== "coming-soon"
  );

  // Limit to 3 models
  const limitedRecommendations = filteredRecommendations.slice(0, 3);

  return (
    <AnimatePresence>
      {limitedRecommendations.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-gray-500 text-center text-xl"
        >
          No recommendations available at the moment.
        </motion.p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {limitedRecommendations.map((model) => (
            <motion.div
              key={model.info}
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setHoveredModel(model.info)}
              onHoverEnd={() => setHoveredModel(null)}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 overflow-hidden">
                        <Image
                          src={model.icon || "/default-logo.png"}
                          alt={model.title}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          <Link
                            href={`/app/category/${model.info}`}
                            className="text-indigo-600 hover:underline"
                          >
                            {model.title}
                          </Link>
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {model.description}
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
                        {star <= (hoveredModel === model.info ? 5 : 0) ? (
                          <FaStar className="text-yellow-400" />
                        ) : (
                          <FaRegStar className="text-gray-300" />
                        )}
                      </motion.span>
                    ))}
                  </div>
                  <Link href={`/app/category/${model.info}`}>
                    <Button
                      variant="secondary"
                      className="mt-2 bg-black text-white"
                    >
                      Try Now!
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
