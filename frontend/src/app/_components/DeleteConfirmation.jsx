"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { LoaderCircle } from 'lucide-react';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }) => {
   const [loading,setloading]=useState(false)
   const handleDelete = async() => {
   
    setloading(true)
    const val=await onConfirm()
   if(val){
    setloading(false)
    onClose();
   }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this task?
        </DialogDescription>
        <div className="flex justify-end space-x-2">
          <Button onClick={handleDelete}>{loading?<LoaderCircle className="animate-spin" />:null}Yes, Delete</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmation;
