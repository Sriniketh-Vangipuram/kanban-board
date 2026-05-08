import { useDroppable } from "@dnd-kit/core";

import type { Task, Status } from "../types/task";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  status: Status;
  tasks: Task[];
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

const Column = ({
  title,
  status,
  tasks,
  onDelete,
  onMove,
  onEdit,
}: Props) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const filtered = tasks.filter(
    (t) => t.status === status
  );

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 min-h-[500px] shadow-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <span className="bg-slate-800 text-sm px-3 py-1 rounded-full">
          {filtered.length}
        </span>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="border border-dashed border-slate-700 rounded-xl p-8 text-center text-slate-500">
            Drop tasks here
          </div>
        ) : (
          filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onMove={onMove}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;