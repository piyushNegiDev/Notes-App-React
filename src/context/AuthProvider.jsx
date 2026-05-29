import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../config/firebase";
import { OrbitProgress } from "react-loading-indicators";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-bg flex justify-center items-center ">
        <OrbitProgress
          color="var(--color-primary)"
          size="medium"
          text=""
          textColor=""
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
