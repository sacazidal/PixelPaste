"use client";

import { createClient } from "@/utils/supabase/client";
import Card from "./Card/Card";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const CardItems = () => {
  const supabase = createClient();
  const [layouts, setLayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const { data: layoutsData, error: fetchError } = await supabase
          .from("layouts")
          .select("*");

        if (fetchError) throw fetchError;
        setLayouts(layoutsData);
      } catch (error) {
        console.error(error);
        setError("Произошла ошибка при загрузке карточек");
      } finally {
        setLoading(false);
      }
    };
    fetchLayouts();
  }, [supabase]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!layouts.length) return <div>No layouts found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {layouts.map((layout) => (
        <Card key={layout.id} projectId={layout.id} />
      ))}
    </div>
  );
};
export default CardItems;
