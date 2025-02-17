import Description from "@/components/Card/Description";
import Title from "@/components/Card/Title";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

import Image from "next/image";
import Link from "next/link";
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
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="container flex mx-auto p-4 gap-x-5">
          <div className="rounded-xl w-full overflow-hidden shadow-lg bg-white dark:bg-neutral-300 p-5 space-y-6">
            <div className="flex flex-col">
              <Title
                title={project.title}
                className={"text-neutral-800 dark:text-neutral-800 text-6xl"}
              />
              <Description
                desc={project.description}
                className={
                  "text-neutral-800 dark:text-neutral-800 font-medium text-xl"
                }
              />
            </div>
            <div className="flex gap-x-2">
              <Feature title={project.complexity} />

              <Feature title={project.website_format} />
              {project.adaptive && <Feature title={"С адаптивом"} />}
              <Feature title={project.language} />
            </div>
            <div className="flex items-center gap-x-4">
              <Link href={project.figma_link} target="_blank">
                <Button className="p-6 flex items-center dark:bg-neutral-800 text-white rounded-2xl">
                  <Image
                    src={"/Figma.webp"}
                    alt="figma"
                    width={20}
                    height={20}
                  />
                  <span>Ссылка на макет</span>
                </Button>
              </Link>
              <Link href={"https://vk.com/rustamzagitov02"} target="_blank">
                <Button className="p-6 flex items-center dark:bg-neutral-800 text-white rounded-2xl">
                  <Image
                    src={"/Telegram.webp"}
                    alt="figma"
                    width={20}
                    height={20}
                  />
                  <span>Сообщество</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-xl w-full max-w-[412px] overflow-hidden shadow-lg bg-white dark:bg-neutral-800">
            <div className="relative w-full h-[562px] overflow-hidden">
              <Image
                src={project.image_url || "/1.jpg"}
                alt="Макет Figma"
                fill
                sizes="full"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Project;
