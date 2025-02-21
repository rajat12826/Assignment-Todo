"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";

const TaskFormModal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To-Do",
    dueDate: "",
    ...initialData,
  });
 const [loading,setloading]=useState(false)
  useEffect(() => {
   
    setFormData({ ...formData, ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setloading(true)
    const val=await onSubmit(formData);
   if(val){
    setloading(false)
    onClose();
   }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Form</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="To-Do">To-Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit">{loading?<LoaderCircle className="animate-spin" />:null}Save</Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormModal;
