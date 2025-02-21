import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const isOverdue = (dueDate,task) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    currentDate.setHours(0, 0, 0, 0);
    taskDueDate.setHours(0, 0, 0, 0);
    if(task.status=="Done"){
      return
    }
    // console.log(taskDueDate, currentDate);
    
    return taskDueDate < currentDate;  
  };
  const canDue = (dueDate) => {
    const now = new Date();
    const taskDueDate = new Date(dueDate);
    now.setHours(0, 0, 0, 0);
    taskDueDate.setHours(0, 0, 0, 0);
   
    const timeDiff = taskDueDate - now;
  
 
    const hoursDiff = timeDiff / (1000 * 60 * 60);
  console.log( hoursDiff );
  // console.log(hoursDiff,task.status);
  
    return timeDiff>= 0 && hoursDiff <= 24;
  };
  
  return (
    <Table className="font-semibold  border-separate border-spacing-y-3">
      <TableHeader className="font-bold text-2xl">
        <TableRow className="hover:bg-[#2c2638]">
          <TableCell>Title</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Due Date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody className="space-y-2">
        {tasks.map((task) => (
          <TableRow key={task.id} className={`my-5 border-2  ${isOverdue(task.dueDate, task) ? " bg-red-50 opacity-80 rounded-lg hover:bg-red-50 text-zinc-800" : "hover:bg-[#2c2638]"}`}
>
            <TableCell className={task.status=="Done"?"line-through":""}>{task.title}</TableCell>
            <TableCell className={task.status=="Done"?"line-through":"" }>{task.status}</TableCell>
            <TableCell className={`${task.status=="Done"?"line-through":""} text-red-500 font-semibold`}>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A"}
            </TableCell>
            <TableCell className="flex">
              <Button onClick={() => onEdit(task)} variant="secondary"  size="sm">
                Edit
              </Button>
              <Button
                onClick={() => onDelete(task)}
                variant="destructive"
                size="sm"
                className="ml-2"
              >
                Delete
              </Button>
             
                {canDue(task.dueDate)?<TriangleAlert color="red" className="mx-2" />:null}
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskList;
