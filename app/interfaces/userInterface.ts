// Basic Interface
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Extended Interfaces with utility types
export interface BaseUser {
  name: string;
  email: string;
  password: string;
}

export interface User extends BaseUser {
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// For creating a new user (omitting auto-generated fields)
export type CreateUser = Omit<
  User,
  "id" | "isActive" | "createdAt" | "updatedAt"
>;

// For updating a user (all fields optional except id)
export type UpdateUser = Partial<Omit<User, "id">> & { id: number };

// For public user data (excluding sensitive information)
export type PublicUser = Omit<User, "password">;

// For user response from API
export interface UserResponse {
  success: boolean;
  data: PublicUser;
  message?: string;
}

export interface CreateUserErrors {
  name?: string;
  email?: string;
  password?: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}
