import { EditTaskDialog } from '@/components/EditTaskDialog';
import { Checkbox } from '@/components/ui/checkbox';
interface TaskItemProps {
  text: string;
  completed: boolean;
  onDelete: () => void;
  onClick: () => void;
  onEdit: (newText: string) => void;
}

export default function TaskItem({
  text,
  completed,
  onClick,
  onDelete,
  onEdit,
}: TaskItemProps) {
  return (
    <li
      className="flex justify-between items-center p-2 border-b  rounded cursor-pointer bg-white dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700 hover:bg-zinc-100"
      onClick={onClick}
      style={{
        padding: '8px',
        borderBottom: '1px solid #ddd',
        cursor: 'pointer',
        transition: '0.2s',
      }}
    >
      <div className="flex items-center">
        <Checkbox
          checked={completed}
          onCheckedChange={() => onClick()}
          className="mr-2"
        />
      </div>
      <span
        className={`text-sm ${completed ? 'line-through text-gray-500' : ''}`}
      >
        {text}
      </span>
      <div className="flex items-center gap-2">
        <EditTaskDialog taskText={text} onSave={(newText) => onEdit(newText)} />
        <button
          className="text-red-500 hover:text-red-700 cursor-pointer"
          title="Delete?"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{ float: 'right', marginLeft: '120px', color: 'red' }}
        >
          x
        </button>
      </div>
    </li>
  );
}
