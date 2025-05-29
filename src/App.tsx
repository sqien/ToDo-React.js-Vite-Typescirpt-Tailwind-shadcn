import { useState } from 'react';
import { useEffect } from 'react';
import TaskItem from './TaskItem';
import { Button } from '@/components/ui/button';
import { H1 } from '@/components/ui/typography';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ConfirmDeleteAllAlert } from '@/components/ConfirmDeleteAllAlert';
import { ToasterUI } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';


interface Task {
  text: string;
  completed: boolean;
}

function App() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const getInitialTasks = (): Task[] => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  };
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);



  const addTask = () => {
    const trimmed = inputValue.trim();
    if (trimmed === '') return;

    const newTask: Task = { text: trimmed, completed: false };
    setTasks([...tasks, newTask]);
    setInputValue('');

    toast({
      title: 'New task added',
      description: `${trimmed} has been added to your tasks`,
      variant: 'default',
    });
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <>
      <div className="min-h-screen bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white flex items-center justify-content-center transition-colors duration-300">
        <div
          className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow w-full max-w-md"
          style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}
        >
          <div className="max-w-lg p-3">
            <div className="flex justify-between mb-2">
              <div className="w-full mb-1 text-left">
                <H1 />
              </div>
              <ThemeToggle />
              <ConfirmDeleteAllAlert
                onConfirm={() => {
                  setTasks([]);
                  toast({
                    title: 'All tasks have been cleared',
                    description: 'Your task list is now empty.',
                    variant: 'default',
                  });
                }}
              />
            </div>

            <div className="flex gap-2 mb-4">
              <input
                className="autoFocus flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-400"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="New Task"
                style={{ padding: '8px', width: '80%' }}
              />

              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={addTask}
                style={{ padding: '8px', marginLeft: '5px' }}
              >
                Add
              </Button>
            </div>
            <div className="flex gap-2 justify-center mb-4">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="cursor-pointer"
              >
                All
              </Button>

              <Button
                variant={filter === 'active' ? 'default' : 'outline'}
                onClick={() => setFilter('active')}
                className="cursor-pointer"
              >
                Active
              </Button>

              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilter('completed')}
                className="cursor-pointer"
              >
                Completed
              </Button>
            </div>
            <ul
              className="bg-white dark:bg-zinc-900"
              style={{ listStyle: 'none', padding: 0 }}
            >
              {filteredTasks.map((task, index) => (
                <TaskItem
                  key={index}
                  text={task.text}
                  completed={task.completed}
                  onClick={() => toggleTask(index)}
                  onDelete={() => {
                    const updated = [...tasks];
                    updated.splice(index, 1);
                    setTasks(updated);
                    toast({
                      title: `${task.text}` + ' Deleted',
                      description: 'You deleted your task.',
                      variant: 'default',
                    });
                  }}
                  onEdit={(newText) => {
                    const updated = [...tasks];
                    updated[index].text = newText;
                    setTasks(updated);
                    toast({
                      title: 'Task edited!',
                      description: `New text: ${newText}`,
                      variant: 'default',
                    });
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
        <ToasterUI />
      </div>
    </>
  );
}
export default App;
