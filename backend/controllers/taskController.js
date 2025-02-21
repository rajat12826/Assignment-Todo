import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: true,  
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      include: {
        user: true,  
      },
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
};


export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, userId } = req.body;

    if (!title || !status || !userId) {
      return res.status(400).json({ error: 'Title, Status, and User ID are required' });
    }

    const dueDateValue = dueDate ? new Date(dueDate) : null;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        dueDate: dueDateValue,
        user: {
          connect: { id: userId }  
        }
      }
    });

    console.log('Created task:', task);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ error: error.message || "Error creating task" });
  }
};



export const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, userId } = req.body;
    const dueDateValue = dueDate ? new Date(dueDate) : null;
    const task = await prisma.task.update({
      where: { id: req.params.id},
      data: {
        title,
        description,
        status,
        dueDate:dueDateValue,
        user: userId ? {
          connect: { id: parseInt(userId) },  
        } : undefined,
      },
      include: {
        user: true,  
      },
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error});
  }
};


export const deleteTask = async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
