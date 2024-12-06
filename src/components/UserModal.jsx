import { useEffect, useState } from "react";

export default function UserModal() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLocal = localStorage.getItem("userID");
    if (userLocal) setUser(userLocal);
  }, []);

  return <div className="absolute right-0 top-14 z-20 rounded-md border border-accent bg-secondary p-2 sm:right-4 sm:w-[550px]"></div>;
}
