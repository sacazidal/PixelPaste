"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import Title from "./Title";
import Description from "./Description";
import { useEffect, useState } from "react";
import Loader from "../Loader";

const Card = ({ projectId }) => {
  const supabase = createClient();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data: projectData, error: fetchError } = await supabase
          .from("layouts")
          .select("*")
          .eq("id", projectId)
          .single();

        if (fetchError) throw fetchError;

        setProject(projectData);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, supabase]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>No project found</div>;

  return (
    <Link
      href={`/project/${project.id}`}
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-neutral-800"
    >
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={project.image_url || "/1.jpg"}
          alt="Макет Figma"
          loading="lazy"
          fill
          sizes="full"
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      <div className="p-4">
        <Title title={project.title} className={"text-lg text-neutral-900"} />
        <Description
          desc={project.description}
          className={"text-sm text-neutral-600 dark:text-neutral-400"}
        />
      </div>
    </Link>
  );
};
export default Card;
