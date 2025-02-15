"use client";

import { createClient } from "@/utils/supabase/client";
import Cookies from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext();

export const UserProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser || null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(!initialUser);

  const supabase = createClient();

  const updateUser = useCallback(
    async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        Cookies.remove("profile");
        return;
      }

      try {
        const { data: profileData } = await supabase
          .from("users")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (profileData) {
          setUser(currentUser);
          setProfile(profileData);
          Cookies.set("profile", JSON.stringify(profileData), { expires: 7 });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        updateUser(session.user);
      } else {
        updateUser(null);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [updateUser, supabase]);

  useEffect(() => {
    if (!initialUser) {
      const getCurrentUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          updateUser(user);
        } else {
          setLoading(false);
        }
      };

      getCurrentUser();
    }
  }, [supabase, updateUser, initialUser]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    Cookies.remove("profile");
  };

  return (
    <UserContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
