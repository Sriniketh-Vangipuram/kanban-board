import { useState } from "react";
import type { Priority } from "../types/task";

interface Props {
  onAdd: (
    text: string,
    priority: Priority
  ) => void;
}

const AddTask = ({ onAdd }: Props) => {
  const [text, setText] = useState("");
  const [priority, setPriority] =
    useState<Priority>("medium");

  const handleAdd = () => {
    if (!text.trim()) return;

    onAdd(text, priority);

    setText("");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-4 shadow-2xl">
      <input
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Enter task..."
        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as Priority
          )
        }
        className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none"
      >
        <option value="low">Low</option>
        <option value="medium">
          Medium
        </option>
        <option value="high">High</option>
      </select>

      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-xl font-semibold"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;