"use client";

import { modelData } from "@/data/modelData";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBalanceScale,
  FaBell,
  FaChartLine,
  FaCode,
  FaComments,
  FaCrown,
  FaHistory,
  FaLightbulb,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";

export default function DashboardBox() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const [recentlyUsedModels] = useState<any[]>([]);
  const [trendingModels, setTrendingModels] = useState<any[]>([]);
  const [recommendedModels, setRecommendedModels] = useState<any[]>([]);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [userActivity] = useState<any[]>([]);
  const [notifications] = useState<any[]>([]);

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
          // console.log("Subscription updated successfully:", data);
          setUserSubscription(data);
        }
      };

      updateSubscription();
    }
  }, [searchParams]);

  useEffect(() => {
    // Simulating fetching trending and recommended models
    setTrendingModels(
      modelData.flatMap((category) => category.models).slice(0, 5)
    );
    setRecommendedModels(
      modelData.flatMap((category) => category.models).slice(5, 10)
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">
            Recently Used Models
          </h3>
          {recentlyUsedModels.map((model, index) => (
            <div key={index} className="flex items-center mb-2">
              <FaHistory className="text-indigo-600 mr-2" />
              <span>{model.model_info}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">
            Trending Models
          </h3>
          {trendingModels.map((model, index) => (
            <div key={index} className="flex items-center mb-2">
              <FaChartLine className="text-indigo-600 mr-2" />
              <span>{model.title}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">
            Recommended for You
          </h3>
          {recommendedModels.map((model, index) => (
            <div key={index} className="flex items-center mb-2">
              <FaUserFriends className="text-indigo-600 mr-2" />
              <span>{model.title}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl p-6 mb-8"
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-800">
          Subscription Details & Benefits
        </h3>
        {userSubscription ? (
          <div>
            <p>Status: {userSubscription.status}</p>
            <p>Plan: {userSubscription.plan}</p>
            <p>
              Next billing date:{" "}
              {new Date(
                userSubscription.next_billing_date
              ).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>
            No active subscription.{" "}
            <Link href="/pricing" className="text-indigo-600 hover:underline">
              Upgrade now!
            </Link>
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">
            User Activity History
          </h3>
          {userActivity.map((activity, index) => (
            <div key={index} className="mb-2">
              <p>
                {activity.action} -{" "}
                {new Date(activity.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">
            Model Performance Statistics
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span>Average response time:</span>
            <span className="font-bold">1.2s</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>Accuracy rate:</span>
            <span className="font-bold">98.5%</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>User satisfaction:</span>
            <span className="font-bold">4.9/5</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-6 mb-8"
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-800">
          Community Feedback & Reviews
        </h3>
        <div className="flex items-center mb-2">
          <FaComments className="text-indigo-600 mr-2" />
          <span>"Great models, very accurate!" - John D.</span>
        </div>
        <div className="flex items-center mb-2">
          <FaComments className="text-indigo-600 mr-2" />
          <span>"Impressive speed and results." - Sarah M.</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">
            Achievements and Badges
          </h3>
          <div className="flex items-center mb-2">
            <FaTrophy className="text-yellow-500 mr-2" />
            <span>Power User</span>
          </div>
          <div className="flex items-center mb-2">
            <FaCrown className="text-yellow-500 mr-2" />
            <span>Model Master</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">
            Personalized Tips & Tutorials
          </h3>
          <div className="flex items-center mb-2">
            <FaLightbulb className="text-indigo-600 mr-2" />
            <span>How to optimize your prompts</span>
          </div>
          <div className="flex items-center mb-2">
            <FaLightbulb className="text-indigo-600 mr-2" />
            <span>Advanced features tutorial</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.9,
          }}
          className="bg-white rounded-3xl shadow-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">
            API Usage Dashboard
          </h3>
          <div className="flex items-center mb-2">
            <FaCode className="text-indigo-600 mr-2" />
            <span>API calls this month: 1,234</span>
          </div>
          <div className="flex items-center mb-2">
            <FaBalanceScale className="text-indigo-600 mr-2" />
            <span>Remaining credits: 5,000</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-6 mb-8"
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-800">
          Notifications & Updates
        </h3>
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center mb-2">
            <FaBell className="text-indigo-600 mr-2" />
            <span>{notification.message}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
