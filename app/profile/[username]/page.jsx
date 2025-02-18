import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavProfile from "@/components/NavProfile";
import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";

const Profile = async ({ params }) => {
  const { username } = await params;
  const supabase = createClient();

  const fetchProfile = async () => {
    try {
      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (error) {
        console.error(error);
        return null;
      }

      return profile;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const profile = await fetchProfile();

  if (!profile) {
    return notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="max-w-screen-2xl w-full mx-auto p-4 flex flex-col">
          <NavProfile />
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Profile;
