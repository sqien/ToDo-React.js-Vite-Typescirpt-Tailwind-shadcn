import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EditTaskDialogProps {
  taskText: string;
  onSave: (newText: string) => void;
}
const schema = z.object({
  task: z.string().min(1, 'Input at least 1 symbol'),
});

export function EditTaskDialog({ taskText, onSave }: EditTaskDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ task: string }>({
    resolver: zodResolver(schema),
    defaultValues: { task: taskText },
  });

  const onSubmit = (data: { task: string }) => {
    onSave(data.task);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          Edit task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your task</DialogTitle>
          <DialogDescription>Here you can edit your task</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <input
            {...register('task')}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="New task text"
          />
          {errors.task && (
            <p className="text-red-500 text-sm">{errors.task.message}</p>
          )}
          <DialogFooter>
            <DialogClose>
              <Button className="cursor-pointer " type="submit">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
