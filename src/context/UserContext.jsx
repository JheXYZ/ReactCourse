import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}
