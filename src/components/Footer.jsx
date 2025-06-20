import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TaskManager. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-blue-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
