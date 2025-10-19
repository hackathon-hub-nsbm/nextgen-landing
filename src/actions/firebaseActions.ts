"use server";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { UserType } from "@/types/user";

// user creating function
export async function createUser(user: UserType): Promise<UserType> {
  try {
    const usersRef = collection(db, "users");

    // checks if the user already exists
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("User already exists");
    }

    const docRef = await addDoc(usersRef, {
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      batch: user.batch,
      degree: user.degree,
      isMember: user.isMember,
      created_at: new Date(),
    });

    return {
      ...user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
