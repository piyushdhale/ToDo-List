import React from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      title: 'Learn React',
      isCompleted: true,
      priority: 'p1',
    },
  ]);

  const [taskName, setTaskName] = React.useState('');
  const [editTask, setEditTask] = React.useState<Task | null>(null);

  const onAddTask = () => {
    if (taskName.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: new Date().getTime(),
          title: taskName,
          isCompleted: false,
        },
      ]);
      setTaskName('');
    }
  };

  const onDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const onEditTask = (task: Task) => {
    setEditTask(task);
  };

  const onSaveTask = () => {
    if (editTask) {
      setTasks(tasks.map((task) => (task.id === editTask.id ? editTask : task)));
      setEditTask(null);
    }
  };

  return (
    <div className='Todolist'>
      <div className='list'>
        <div className='header'>
          <h1>Tasks</h1>
          <label htmlFor="task-input">Add Task: </label>
          <input
            id="task-input"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button onClick={onAddTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {editTask?.id === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTask.title}
                    onChange={(e) => setEditTask({...editTask,title:e.target.value})}
                  />
                  <button onClick={onSaveTask}>Save changes</button>
                </>
              ) : (
                <>
                  {task.title}
                  <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                  <button onClick={() => onEditTask(task)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
