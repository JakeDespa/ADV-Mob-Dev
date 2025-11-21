import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../lib/auth";

export function useAuth() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const signup = async (user: Omit<User, "name"> & { name: string }) => {
    try {
      const existingUsersString = await AsyncStorage.getItem("users");
      const existingUsers: User[] = existingUsersString
        ? JSON.parse(existingUsersString)
        : [];

      if (existingUsers.some((u) => u.email === user.email)) {
        setError("User with this email already exists.");
        return;
      }

      existingUsers.push(user);
      await AsyncStorage.setItem("users", JSON.stringify(existingUsers));
      router.replace({ pathname: "/home" });
    } catch (e) {
      setError("An error occurred during signup.");
    }
  };

  const login = async (credentials: Omit<User, "name">) => {
    try {
      const existingUsersString = await AsyncStorage.getItem("users");
      const existingUsers: User[] = existingUsersString
        ? JSON.parse(existingUsersString)
        : [];

      const foundUser = existingUsers.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (foundUser) {
        router.replace({ pathname: "/home" });
      } else {
        setError("Invalid email or password.");
      }
    } catch (e) {
      setError("An error occurred during login.");
    }
  };

  return { signup, login, error };
}
