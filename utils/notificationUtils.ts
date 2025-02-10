// utils/notificationUtils.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

interface Notification {
    id?: string; // Optional because Firestore generates this automatically
    userId: string;
    title: string;
    message: string;
    time: Date | firebase.firestore.Timestamp; // Firestore Timestamp or JavaScript Date
    type: "success" | "warning" | "info"; // Only these three types are allowed
  }
  export const addNotification = async (
    userId: string,
    title: string,
    message: string,
    type: Notification["type"]
  ): Promise<void> => {
    try {
      await addDoc(collection(db, "notifications"), {
        userId,
        title,
        message,
        time: serverTimestamp(), // Firestore server timestamp
        type,
      });
      console.log("Notification added successfully!");
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };