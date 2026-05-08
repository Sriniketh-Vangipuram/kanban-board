import { useEffect, useState } from "react";
import {
  DndContext,
} from "@dnd-kit/core";

import type {DragEndEvent} from "@dnd-kit/core";
import type { Task, Status, Priority } from "./types/task";

import Column from "./components/Column";
import AddTask from "./components/AddTask";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (
    text: string,
    priority: Priority
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      status: "todo",
      priority,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  const moveTask = (
    id: string,
    status: Status
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status } : t
      )
    );
  };

  const editTask = (
    id: string,
    text: string
  ) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text } : t
      )
    );
  };

  const filtered = tasks.filter((t) =>
    t.text
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDragEnd = (
    event: DragEndEvent
  ) => {
    const { active, over } = event;

    if (!over) return;

    moveTask(
      active.id as string,
      over.id as Status
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              Kanban Board
            </h1>

            <p className="text-slate-400 mt-2">
              Manage tasks efficiently with
              drag & drop workflow
            </p>
          </div>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-slate-900 border border-slate-700 px-4 py-3 rounded-xl outline-none focus:border-blue-500 w-full md:w-80"
          />
        </div>

        {/* ADD TASK */}
        <AddTask onAdd={addTask} />

        {/* BOARD */}
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <Column
              title="To Do"
              status="todo"
              tasks={filtered}
              onDelete={deleteTask}
              onMove={moveTask}
              onEdit={editTask}
            />

            <Column
              title="In Progress"
              status="in-progress"
              tasks={filtered}
              onDelete={deleteTask}
              onMove={moveTask}
              onEdit={editTask}
            />

            <Column
              title="Done"
              status="done"
              tasks={filtered}
              onDelete={deleteTask}
              onMove={moveTask}
              onEdit={editTask}
            />
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default App;