import * as z from "zod";

export const UserSchema = z.object({
  name: z.string().regex(/^[a-zA-Z\s]{2,32}$/, "Please enter a valid name"),
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phone_number: z
    .string()
    .regex(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female"], "Please select a valid gender"),
  batch: z.enum(
    ["25.3", "25.2", "25.1", "24.3", "24.2", "24.1", "23.2", "23.1"],
    "Please select a valid batch"
  ),
  degree: z.enum(
    [
      "Artificial Intelligence",
      "Computer Science",
      "Data Science",
      "Computer Security",
      "Cyber Security",
      "Computer Networks",
      "Software Engineering",
      "Technology Management",
      "Management Information Systems",
    ],
    "Please select a valid degree"
  ),
  isMember: z.stringbool("Please select your status"),
});

export type UserType = z.infer<typeof UserSchema>;
