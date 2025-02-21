import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });
  res.status(201).json(user);
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  
 
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }


  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1d" });

 
  res.cookie("token", token, { httpOnly: true }).json({
    message: "Logged in",
    userId: user.id 
  });
};

