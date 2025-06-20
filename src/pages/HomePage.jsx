import React from "react";
import MainLayout from "../components/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="px-6 py-12 max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-6 text-center sm:text-left">
            Welcome to Your Dashboard
          </h1>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-8 text-center sm:text-left">
            Organize. Track. Succeed.
          </h2>

          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed text-center sm:text-left">
            This is your command center. Here you can view your tasks, check
            progress, manage your boards, and stay focused on what matters most.
            Whether you're building projects, leading a team, or managing daily
            goals, everything starts here.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
