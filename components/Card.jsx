import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

const Card = () => {
  const supabase = createClient();

  return (
    <Link
      href={"#"}
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-neutral-800"
    >
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src="/1.jpg"
          alt="Макет Figma"
          fill
          sizes="full"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          PixelPaste
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Далеко-далеко за словесными горами в стране гласных, и согласных живут
          рыбные тексты. Они ее напоивший алфавит то.
        </p>
      </div>
    </Link>
  );
};
export default Card;
