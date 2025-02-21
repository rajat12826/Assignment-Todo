"use client"
import React, { useEffect, useState } from 'react';
import api from '@/lib/api'; // Import the api helper
import TaskList from './TaskList';
import TaskFormModal from './TaskFormModal';
import StatusFilter from './StatusFilter';
import DeleteConfirmation from './DeleteConfirmation';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';



export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading,setloading]=useState(false)
  const [userId, setUserId] = useState(null);
  const router=useRouter()
  

  
  useEffect(() => {
    const storedUserId = localStorage.getItem('user');
    if (!storedUserId) {
      
      router.push("/auth/register")
      return;
    }
    setUserId(storedUserId);  
  }, []); 

  useEffect(() => {
    if (userId) {
      fetchTasks();  
    }
  }, [userId]);
  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      // setTasks(data)
      setTasks(data.filter(task=>task.userId==userId));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  
  useEffect(() => {
    if (selectedStatus && selectedStatus !== 'All') {
      setFilteredTasks(tasks.filter(task => task.status === selectedStatus));
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, selectedStatus]);
  useEffect(() => {
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);

      if (dateA.getTime() === dateB.getTime()) return 0;

      
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredTasks(sortedTasks);
  }, [sortOrder]);
  
  const handleTaskSubmit = async (formData) => {
    // setloading(true)
    try {
      const userId =parseInt(localStorage.getItem('user'))
  
     
      const taskData = { ...formData, userId };
  
      if(currentTask){
        const reponse=await api.put(`/tasks/${currentTask.id}`, taskData);
        setCurrentTask(null)
      } 
      
  else{
    const reponse=await api.post('/tasks', taskData);
  }
      // setIsFormOpen(false);
      // setloading(false)
      fetchTasks();  
    } catch (error) {
      console.error('Error saving task:', error);
    }
    return true
  };
  
  
  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
    
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  
    return true
  };

  const confirmDelete = async () => {
    try {
      console.log(taskToDelete);
      
      await api.delete(`/tasks/${taskToDelete.id}`);
      setTaskToDelete(null);
      setIsDeleteModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  const toggleSortOrder = () => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };
  return (
    <div className='p-8 px-20 font-product bg-[#2c2638]  h-screen text-white'>
      <div className='flex justify-between pr-10'>
      <h1 className='text-2xl font-bold  my-5'>To-Do List</h1>
      {
        userId&&<Button onClick={() =>{
          localStorage.removeItem("user")
          router.push('/auth/login')
        }} className="bg-red-500 hover:bg-red-600 my-5">
        Log Out
      </Button>
      }
      </div>
      <h2 className='text-2xl font-semibold my-2'>My Tasks</h2>
      <StatusFilter currentStatus={selectedStatus} onChange={setSelectedStatus} />
      <Button onClick={() => { setCurrentTask(null); setIsFormOpen(true); }} className="bg-blue-500 hover:bg-blue-600">Add New Task</Button>
      <Button onClick={toggleSortOrder} className={`mt-2 mb-4 mx-5 ${sortOrder === 'asc' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
        Sort by Due Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </Button>
      <TaskList tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete} />

      {isFormOpen && (
        <TaskFormModal 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleTaskSubmit}
          initialData={currentTask}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmation 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
