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
  const [darkOpen, setDarkOpen] = useState(false);
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

  const closeModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const htmlClass = document.getElementsByTagName("html")[0].classList;
  useEffect(() => {
    const localTodo = localStorage.getItem("todos");
    const localTheme = localStorage.getItem("theme");
    if (localTodo) {
      setTodos(JSON.parse(localTodo));
    }

    if (localTheme == "dark") {
      htmlClass.add("dark");
      setDarkOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleDarkMode = () => {
    htmlClass.toggle("dark");
    const isDark = htmlClass.contains("dark");
    console.log(isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkOpen(isDark);
  };

  const addNewTodo = () => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    const newTodo = {
      ...formData,
      id: nextId,
      createdAt: getNewDate(),
    };

    setTodos((prev) => [...prev, newTodo]);
    closeModal();
  };

  return (
    <div className=" w-full min-h-screen p-4 sm:p-6 md:p-10 bg-base-100  dark:bg-gray-800">
      <div className="flex gap-2 items-center justify-end mb-6">
        <svg
          className="dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <div
          onClick={toggleDarkMode}
          className="cursor-pointer transition-all items-center flex w-10 h-6 p-1 bg-white rounded-2xl outline-1 dark:outline-white dark:bg-gray-700"
        >
          <div
            className={`transition-all rounded-full w-4 aspect-square bg-black dark:bg-white ${
              darkOpen && "translate-x-4"
            }`}
          ></div>
        </div>
        <svg
          className="dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold dark:text-white">
          🌟To Do List🌟
        </h1>
        <button
          className="py-2 px-4 bg-black text-white rounded-xl text-lg sm:text-xl md:text-2xl cursor-pointer hover:transition-all hover:duration-200 hover:scale-105 w-full border-2 border-transparent sm:w-auto dark:border-2 dark:border-white"
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
                ? "py-1 px-3 sm:px-4 bg-black text-white rounded-xl text-lg sm:text-xl md:text-2xl cursor-pointer hover:transition-all hover:duration-200 hover:scale-105 border-2 border-transparent  dark:border-white"
                : "py-1 px-3 sm:px-4 bg-white border-2 border-gray-300 rounded-xl text-lg sm:text-xl md:text-2xl cursor-pointer hover:transition-all hover:duration-200 hover:bg-gray-100 hover:scale-105 "
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
              className="flex gap-3 sm:gap-4 bg-blue-50 border drop-shadow-sm border-gray-300 rounded-2xl p-4 w-full dark:bg-gray-600 dark:text-white dark:accent-gray-700"
            >
              <input
                type="checkbox"
                checked={todo.status}
                className="w-5 h-5 sm:w-6 sm:h-6 mt-1 cursor-pointer accent-black flex-shrink-0 dark:accent-gray-700 dark:text-white"
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
                <p
                  className={`text-lg sm:text-xl font-semibold break-words ${
                    todo.status && "line-through decoration-gray-black-50"
                  }`}
                >
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
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-300 w-full max-w-md dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg sm:text-xl font-semibold dark:text-white">
                Add New To Do
              </h1>
              <p
                onClick={closeModal}
                className="cursor-pointer text-xl font-bold hover:text-red-600 dark:text-white"
              >
                X
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent dark:text-white dark:focus:ring-white"
                required
                placeholder="Enter your To Do 's name"
                onInput={(e) => {
                  handleFormChange(e, "name");
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white ">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:ring-2 focus:ring-black dark:text-white dark:focus:ring-white"
                placeholder="Enter your To Do 's description"
                onInput={(e) => {
                  handleFormChange(e, "description");
                }}
              ></textarea>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
              <button
                className="px-4 sm:px-6 cursor-pointer py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors flex-1 sm:flex-none dark:text-white  dark:hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                disabled={!formData.name}
                className={`px-4 sm:px-6 py-2 cursor-pointer bg-black text-white rounded-xl transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex-1 sm:flex-none dark:bg-white dark:text-black  ${formData.name && 'dark:hover:bg-gray-200 hover:bg-gray-800 '}`}
                onClick={addNewTodo}
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
