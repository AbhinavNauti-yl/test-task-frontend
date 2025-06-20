import { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../../Services/user";
import { createTask, getParticularTasks, updateParticularTasks } from "../../Services/tasks";
import toast from "react-hot-toast";

const TaskEditionPage = () => {
  const { id } = useParams();
  const { taskId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: users,
    isPending: userPeinding,
    isError: userError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getAllUsers();
    },
  });

  const {
    data: task,
    isPending: taskPeinding,
    isError: taskError,
  } = useQuery({
    queryKey: ["task"],
    queryFn: () => {
      return getParticularTasks(id, taskId);
    },
  });


  const {
    mutate: updateTaskMutate,
    isPending: MutationPending,
    isError: MutationError,
  } = useMutation({
    mutationFn: () => {
      updateParticularTasks(id, taskId, taskData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["boardTask", "tasks", 'task']);
      navigate(`/boards/${id}`);
      toast.success("Task updated")
    },
  });

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Low",
    assignedTo: "",
    due: "",
    belongTo: id.replace(":", ""),
  });

  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assignedTo,
        due: task.due,
        belongTo: id.replace(":", ""),
      });
    }
  }, [task, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateTaskMutate(id, taskId, taskData);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Edit Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg px-3 py-2"
              required
            ></textarea>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={taskData?.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          {/* Priority Dropdown */}
          <div>
            <label className="block font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Assigned To Dropdown */}
          <div>
            <label className="block font-medium mb-1">Assign To</label>
            <select
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select a user</option>
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block font-medium mb-1">Due Date</label>
            <input
              type="date"
              name="due"
              value={taskData?.due?.split("T")[0]}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default TaskEditionPage;
