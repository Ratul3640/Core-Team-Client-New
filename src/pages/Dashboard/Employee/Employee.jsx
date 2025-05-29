import  { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const Employee = () => {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const task = form.task.value;
    const hours = form.hours.value;

    const taskData = {
      email: user?.email,
      task,
      hours,
      date: selectedDate.toISOString().split("T")[0], // Format the date as "YYYY-MM-DD"
    };

    // Add Task To DB
    axiosSecure.post("/tasks", taskData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Congratulations!",
          text: "Task Added Successfully",
          icon: "success",
        });
        refetch();
        form.reset();
      }
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const form = event.target;
    const task = form.task.value;
    const hours = form.hours.value;

    const updatedTask = {
      task,
      hours,
      date: selectedDate.toISOString().split("T")[0],
    };

    axiosSecure.put(`/tasks/${editTask._id}`, updatedTask).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Task updated successfully",
          icon: "success",
        });
        refetch();
        setIsModalOpen(false);
      }
    });
  };

  const { data: tasks = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tasks/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setSelectedDate(new Date(task.date));
    setIsModalOpen(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Work Sheet</h1>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="card-body flex flex-row justify-center items-center"
        >
          {/* Task Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task</span>
            </label>
            <select name="task" className="select select-bordered" required>
              <option disabled selected>
                Select Task
              </option>
              <option>Sales</option>
              <option>Support</option>
              <option>Content</option>
              <option>Paper-work</option>
            </select>
          </div>

          {/* Hours Worked Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hours Worked</span>
            </label>
            <input
              name="hours"
              type="number"
              placeholder="Hours Worked"
              className="input input-bordered"
              required
            />
          </div>

          {/* Date Picker Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="input input-bordered"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          {/* Add Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary">Add</button>
          </div>
        </form>

        {/* Display Total Tasks */}
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Hours Worked</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.task}</td>
                    <td>{item.hours}</td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-danger ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Task</h3>
            <form onSubmit={handleUpdate}>
              {/* Task Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task</span>
                </label>
                <select
                  name="task"
                  className="select select-bordered"
                  defaultValue={editTask.task}
                  required
                >
                  <option disabled>Select Task</option>
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Content</option>
                  <option>Paper-work</option>
                </select>
              </div>

              {/* Hours Worked Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hours Worked</span>
                </label>
                <input
                  name="hours"
                  type="number"
                  defaultValue={editTask.hours}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Date Picker Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="input input-bordered"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
