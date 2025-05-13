import type { CreateUser } from "~/interfaces/userInterface";
import prisma from "../db.server";

export const getUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId), // Ensure ID is a number for the query
    },
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

export const createUser = async (user: CreateUser) => {
  const newUser = await prisma.user.create({
    data: user,
  });
  return newUser;
};

export const updateUser = async (userId: number, user: any) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: user,
  });
  return updatedUser;
};

export const deleteUser = async (userId: number) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  return deletedUser;
};
