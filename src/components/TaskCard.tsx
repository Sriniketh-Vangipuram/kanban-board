import { useState } from "react";

import { useDraggable } from "@dnd-kit/core";

import type {
  Task,
  Status,
} from "../types/task";

interface Props {
  task: Task;

  onDelete: (id: string) => void;

  onMove: (
    id: string,
    status: Status
  ) => void;

  onEdit: (
    id: string,
    text: string
  ) => void;
}

const TaskCard = ({
  task,
  onDelete,
  onMove,
  onEdit,
}: Props) => {
  const [editing, setEditing] =
    useState(false);

  const [text, setText] =
    useState(task.text);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const priorityColors = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-green-500",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-slate-950 border-l-4 ${priorityColors[task.priority]} rounded-2xl p-4 shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-200 cursor-grab active:cursor-grabbing`}
    >
      {/* TOP */}
      <div className="flex justify-between items-start gap-4">
        {editing ? (
          <input
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            onBlur={() => {
              onEdit(task.id, text);
              setEditing(false);
            }}
            autoFocus
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 w-full outline-none"
          />
        ) : (
          <p
            onClick={() =>
              setEditing(true)
            }
            className="font-medium text-slate-100 leading-relaxed break-words"
          >
            {task.text}
          </p>
        )}

        <button
          onClick={() =>
            onDelete(task.id)
          }
          className="text-slate-500 hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      {/* PRIORITY */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider bg-slate-800 px-3 py-1 rounded-full text-slate-300">
          {task.priority}
        </span>

        <div className="flex gap-2 flex-wrap">
          {task.status !== "todo" && (
            <button
              onClick={() =>
                onMove(task.id, "todo")
              }
              className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg transition"
            >
              Todo
            </button>
          )}

          {task.status !==
            "in-progress" && (
            <button
              onClick={() =>
                onMove(
                  task.id,
                  "in-progress"
                )
              }
              className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg transition"
            >
              Progress
            </button>
          )}

          {task.status !== "done" && (
            <button
              onClick={() =>
                onMove(task.id, "done")
              }
              className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg transition"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;