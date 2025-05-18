import { create } from "zustand";

interface CredentialsType {
  username: string;
  password: string;
}

interface AuthInterface {
  credentials: CredentialsType | null;
  handleGetCredentials: () => void;
  logout: () => void;
  isAuthenticated?: boolean;
  // loginState: "loggedOut" | "loggedIn";
  authCheck: boolean;
}

export const useAuthStore = create<AuthInterface>((set) => ({
  // loginState: "loggedOut",
  authCheck: false,
  credentials: null,
  isAuthenticated: false,
  logout: () => {
    localStorage.removeItem("credentials");
    set({ credentials: null, isAuthenticated: false });
  },
  handleGetCredentials: () => {
    try {
      const authData = localStorage.getItem("credentials");
      if (!authData) {
        set({ authCheck: true });
        return;
      }
      const parsedCredentials = JSON.parse(authData || "[]");

      if (
        parsedCredentials.password !== "milan" ||
        parsedCredentials.username !== "Milan"
      ) {
        alert("Invalid credentials");
        set({ authCheck: true });

        return;
      }

      set({
        credentials: parsedCredentials,
        isAuthenticated: true,
        // loginState: "loggedIn",
        authCheck: true,
      });
    } catch (error) {
      alert(error);
      set({
        credentials: null,
        isAuthenticated: false,
        authCheck: true,
      });
    }
  },

  handleSetCredentials: (data: CredentialsType) => {
    localStorage.setItem("credentials", JSON.stringify(data));
  },
}));
