import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"; // your axios baseURL wrapper
import { deleteTask, getAllTasks } from "../../Services/tasks";
import MainLayout from "../../components/MainLayout";
import { useState } from "react";

export default function TasksPage() {
  const [search, setSearch] = useState("");

  const del = (id) => {
    mutate(id);
  };

  const {
    mutate,
    isPending: MutationPending,
    isError: MutationError,
  } = useMutation({
    mutationFn: (id) => {
      deleteTask(id);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      return getAllTasks(search)
    }
  });

  if (isLoading) return <div className="p-6">Loading tasks...</div>;
  if (error)
    return <div className="p-6 text-red-500">Error loading tasks.</div>;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            All Tasks
          </h1>

          <div className="my-5 ">
            <input
              type="text"
              placeholder="Enter Title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-2xl bg-blue-100 px-2 rounded-lg text-black"
            />

            <button
              className="px-4 py-1.5 mx-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={(e) => {
                e.preventDefault()
                refetch()
              }}
            >
              Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks?.map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 transition hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {task.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {task.description}
                </p>
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    Status: <span className="font-medium">{task.status}</span>
                  </p>
                  <p>
                    Priority:{" "}
                    <span className="font-medium">{task.priority}</span>
                  </p>
                  <p>
                    Due:{" "}
                    {task.due
                      ? new Date(task.due).toLocaleDateString()
                      : "Not set"}
                  </p>
                  <button
                    className="text-xl text-red-400"
                    onClick={() => del(task?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
