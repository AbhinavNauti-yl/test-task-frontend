import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoard, deleteBoard, getAllBoards } from "../../Services/board";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import toast from "react-hot-toast";

export default function BoardsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [newBoard, setNewBoard] = useState("");

  const createNewBoard = () => {
    mutate(newBoard);
  };
  const deleteB = (id) => {
    mutateDeleteBoard(id);
  };

  const {
    mutate: mutateDeleteBoard,
    isPending: mutateDeleteBoardPending,
    isError: mutateDeleteBoardError,
  } = useMutation({
    mutationFn: (boardId) => {
      return deleteBoard(boardId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['boards'])
      toast.success("Board deleted");
      setNewBoard("");
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const {
    mutate,
    isPending: MutationPending,
    isError: MutationError,
  } = useMutation({
    mutationFn: (id) => {
      createBoard(id);
    },
    onSuccess: () => {
      refetch();
      setNewBoard("");
    },
  });

  const {
    data: boards,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getAllBoards();
    },
    queryKey: ["boards"],
  });

  return (
    <MainLayout>
      <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Your Boards
            </h1>
            <div>
              <input
                type="text"
                placeholder="Enter Board"
                value={newBoard}
                onChange={(e) => setNewBoard(e.target.value)}
                className="mx-3 border-blue-200 border-3 bg-green-100 rounded-md p-1 outline-none"
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={createNewBoard}
                disabled={newBoard == "" ? true : false}
              >
                + Create New Board
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {boards?.map((board, index) => (
              <div className="flex flex-col gap-1 border-2 border-blue-300 rounded-2xl p-1 shadow" key={index}>
                <Link to={`/boards/${board?._id}`} key={index}>
                  <div
                    key={index}
                    className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-md transition cursor-pointer flex flex-col gap-2"
                  >
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {board.name}
                    </h2>
                  </div>
                </Link>
                <button
                  className="px-4 py-1 w-[calc(30%)] bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  onClick={() => deleteB(board?._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
