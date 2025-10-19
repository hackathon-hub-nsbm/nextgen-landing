import * as z from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be less than 32 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phone_number: z
    .string()
    .regex(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female"]),
  batch: z.enum([
    "25.3",
    "25.2",
    "25.1",
    "24.3",
    "24.2",
    "24.1",
    "23.2",
    "23.1",
  ]),
  degree: z.enum([
    "Artificial Intelligence",
    "Computer Science",
    "Data Science",
    "Computer Security",
    "Cyber Security",
    "Computer Networks",
    "Software Engineering",
    "Technology Management",
    "Management Information Systems",
  ]),
});

export type UserType = z.infer<typeof UserSchema>;
