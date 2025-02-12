import Description from "@/components/Card/Description";
import Title from "@/components/Card/Title";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/client";

import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 120;

const Project = async ({ params }) => {
  const { projectid } = await params;
  const supabase = createClient();

  const { data: project, error } = await supabase
    .from("layouts")
    .select("*")
    .eq("id", projectid)
    .single();

  if (error) {
    console.error(error);
    return <div>Проект не найден</div>;
  }

  if (!project) {
    return notFound();
  }
  return (
    <>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-neutral-800">
            <div className="relative w-full h-96 overflow-hidden">
              <Image
                src={project.image_url || "/1.jpg"}
                alt="Макет Figma"
                fill
                sizes="full"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <Title title={project.title || "PixelPaste"} />
              <Description desc={project.description} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Project;
