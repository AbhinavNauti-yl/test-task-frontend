import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getBoardTasks } from "../../Services/tasks";
import MainLayout from "../../components/MainLayout";

const BoardDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

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
      queryClient.invalidateQueries(["tasks", "boardTasks"]);
    },
  });

  const {
    data: tasks,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["boardTask"],
    queryFn: () => {
      return getBoardTasks(id);
    },
  });

  return (
    <MainLayout>
      <div className="p-4 max-w-4xl mx-auto min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Board: {id}
        </h1>
        <Link to={`/boards/${id}/task`} className="px-4 py-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + Create New Task
          </button>
        </Link>

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
                  Priority: <span className="font-medium">{task.priority}</span>
                </p>
                <p>
                  Due:{" "}
                  {task.due
                    ? new Date(task.due).toLocaleDateString()
                    : "Not set"}
                </p>
                <div className="flex flex-row gap-5">
                  <button
                    className="text-xl text-red-600 bg-red-100 px-1 rounded-sm"
                    onClick={() => del(task?._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-xl text-blue-600 bg-blue-100 px-1 rounded-sm"
                    onClick={() => navigate(`/boards/${id}/task/${task?._id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default BoardDetailPage;
