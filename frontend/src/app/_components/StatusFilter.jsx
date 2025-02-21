import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatusFilter = ({ currentStatus, onChange }) => {
  return (
   <div className="my-5">
     <Select value={currentStatus} onValueChange={onChange} >
      <SelectTrigger>
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="To-Do">To-Do</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
   </div>
  );
};

export default StatusFilter;
