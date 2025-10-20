"use client";

import { useEffect, useState } from "react";

export default function Todo() {
  const [status, setStatus] = useState({
    All: true,
    Done: false,
    NotDone: false,
  });

  const getNewDate = () =>
    new Date().toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Int222",
      description: "sisisi",
      status: false,
      createdAt: getNewDate(),
    },
    {
      id: 2,
      name: "Int212",
      description: "noy most",
      status: true,
      createdAt: getNewDate(),
    },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: false,
    createdAt: "",
  });

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      status: false,
      createdAt: "",
    });
  }

  const handleFormChange = (event, name) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-10 bg-base-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          🌟To Do List🌟
        </h1>
        <button
          className="py-2 px-4 bg-black text-white rounded-xl text-lg sm:text-xl md:text-2xl cursor-pointer hover:transition-all hover:duration-200 hover:scale-105 w-full sm:w-auto"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          + To Do
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-10">
        {Object.keys(status).map((item) => (
          <div
            key={item}
            className={
              status[item]
                ? "py-1 px-3 sm:px-4 bg-black text-white rounded-xl text-lg sm:text-xl md:text-2xl cursor-pointer hover:transition-all hover:duration-200 hover:scale-105"
                : "py-1 px-3 sm:px-4 bg-white border-2 border-gray-300 rounded-xl text-lg sm:text-xl md:text-2xl cursor-pointer hover:transition-all hover:duration-200 hover:bg-gray-100 hover:scale-105"
            }
            onClick={() =>
              setStatus(() => {
                return {
                  All: false,
                  Done: false,
                  NotDone: false,
                  [item]: true,
                };
              })
            }
          >
            {item === "NotDone" ? "Not Done" : item}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 w-full">
        {todos
          .filter((todo) =>
            status.All
              ? true
              : status.Done
              ? todo.status
              : status.NotDone
              ? !todo.status
              : false
          )
          .map((todo) => (
            <div
              key={todo.id}
              className="flex gap-3 sm:gap-4 bg-blue-50 border border-gray-300 rounded-2xl p-4 w-full"
            >
              <input
                type="checkbox"
                checked={todo.status}
                className="w-5 h-5 sm:w-6 sm:h-6 mt-1 cursor-pointer accent-black flex-shrink-0"
                onChange={() => {
                  setTodos((previous) => {
                    return previous.map((item) => {
                      if (item.id === todo.id) {
                        return { ...item, status: !item.status };
                      }
                      return item;
                    });
                  });
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-lg sm:text-xl font-semibold break-words">
                  {todo.name}
                </p>
                <p className="text-sm sm:text-base text-gray-400">
                  {todo.createdAt}
                </p>
              </div>
              <p
                className="cursor-pointer text-lg sm:text-xl font-bold hover:text-red-600 flex-shrink-0"
                onClick={() => {
                  const allTodo = [...todos];
                  const indexRemove = allTodo.findIndex(
                    (remove) => todo.id === remove.id
                  );
                  allTodo.splice(indexRemove, 1);
                  setTodos(allTodo);
                }}
              >
                X
              </p>
            </div>
          ))}
      </div>

      {openModal && (
        <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm  bg-black/10 z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-300 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg sm:text-xl font-semibold">
                Add New To Do
              </h1>
              <p
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
                className="cursor-pointer text-xl font-bold hover:text-red-600"
              >
                X
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
                placeholder="Enter your To Do 's name"
                onInput={(e) => {
                  handleFormChange(e, "name");
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:ring-2 focus:ring-black"
                placeholder="Enter your To Do 's description"
                onInput={(e) => {
                  handleFormChange(e, "description");
                }}
              ></textarea>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
              <button
                className="px-4 sm:px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors flex-1 sm:flex-none"
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button
                disabled={!formData.name}
                className="px-4 sm:px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex-1 sm:flex-none"
                onClick={() => {
                  const nextId =
                    todos.length > 0
                      ? Math.max(...todos.map((t) => t.id)) + 1
                      : 1;
                  const newTodo = {
                    ...formData,
                    id: nextId,
                    createdAt: getNewDate(),
                  };

                  setTodos((prev) => [...prev, newTodo]);
                  setOpenModal(false);
                  resetForm();
                }}
              >
                Add To Do
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
