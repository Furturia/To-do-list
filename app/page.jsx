"use client";

import { useEffect, useState } from "react";

export default function Todo() {
  const [status, setStatus] = useState("All");
  console.log(status === "All");

  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Int222",
      description: "sisisi",
      status: false,
      dateCreated: "12:88.80",
    },
    {
      id: 2,
      name: "Int212",
      description: "noy most",
      status: true,
      dateCreated: "12:88.80",
    },
  ]);
  const allStatus = ["All", "Done", "Not Done"];

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: false,
    dateCreated: "",
  });

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      status: false,
      dateCreated: "",
    });
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(openModal);
  }, [openModal]);

  const getNewDate = () =>
    new Date().toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="w-full h-screen p-10 bg-base-100">
      
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold ">🌟To Do List🌟</h1>
        <button
          className="btn btn-neutral rounded-xl text-2xl"
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          + To Do
        </button>
      </div>
      <div className="flex gap-4 mt-10">
        {allStatus.map((item) => (
          <div
            key={item}
            className={
              status == item
                ? "badge text-2xl badge-neutral p-4 cursor-pointer"
                : "badge text-2xl badge-neutral p-4 badge-outline cursor-pointer"
            }
            onClick={() => setStatus(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="grid grid-flow-col grid-rows-4 gap-4 mt-6">
        {todos
          .filter((todo) =>
            status === "All"
              ? true
              : status === "Done"
              ? todo.status
              : status === "Not Done"
              ? !todo.status
              : false
          )
          .map((todo) => (
            <div
              key={todo.id}
              className="flex gap-4 items-center  bg-blue-50 outline  rounded-2xl p-4 w-60"
            >
              <input
                type="checkbox"
                checked={todo.status}
                className="checkbox checkbox-neutral"
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
              <div>
                <p className="text-xl font-semibold">{todo.name}</p>
                <p className="text-black/30">{todo.dateCreated}</p>
              </div>
              <p
                className="ml-auto cursor-pointer"
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
        <div className="w-full fixed inset-0 flex items-center justify-center  backdrop-blur-xs z-50">
          <div className="bg-white rounded-2xl p-6 outline-1">
            <div className="flex justify-between">
              <h1>Add New To Do</h1>
              <p
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
                className="cursor-pointer"
              >
                X
              </p>
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                type="text"
                className="input"
                required
                placeholder="Enter your To Do 's name"
                onInput={(e) => {
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  });
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea"
                placeholder="Enter your To Do 's description"
                onInput={(e) => {
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  });
                }}
              ></textarea>
            </fieldset>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                className="btn rounded-xl"
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button
                disabled={!formData.name}
                className="btn btn-neutral rounded-xl"
                onClick={() => {
                  const nextId =
                    todos.length > 0
                      ? Math.max(...todos.map((t) => t.id)) + 1
                      : 1;
                  const newTodo = {
                    ...formData,
                    id: nextId,
                    dateCreated: getNewDate(),
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

// "use client";
// import { useEffect, useMemo, useState } from "react";
// import Children from "./components/Children";

// export default function App() {
//   const [state, setState] = useState("Hello World!");
//   function setName(name) {
//     setState(name);
//   }

//   useEffect(() => {
//     console.log("On Mounted!");
//   }, []);

//   useEffect(() => {
//     console.log("On Input");
//   }, [state]);

//   const nameUpper = useMemo(()=>{
//     return state.toUpperCase()
//   },[state])
//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">{state}</h1>
//       <h1 className="text-3xl font-bold underline">{nameUpper}</h1>
//       <Children setName={setName} >
//         <div>Hello Child</div>
//       </Children>
//     </div>
//   );
// }
