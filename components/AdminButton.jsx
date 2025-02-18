import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const AdminButton = () => {
  return (
    <Link href={"/admin/secret"} className="hidden md:block">
      <Button className="dark:bg-neutral-900 bg-neutral-300 hover:bg-red-600 hover:dark:bg-red-600 flex items-center gap-x-2">
        <Image src={"/Admin.webp"} alt={"admin"} width={20} height={20} />
        <span className="dark:text-white text-neutral-800 font-bold text-sm">
          Admin
        </span>
      </Button>
    </Link>
  );
};
export default AdminButton;
