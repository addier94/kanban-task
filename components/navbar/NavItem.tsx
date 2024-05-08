import Helper from "@/utils/helper";
import { usePathname } from "next/navigation";
import { IconBoard } from "../common/icon";
import Link from "next/link";

interface NavItemProps {
  board: { id: string; name: string };
}

export const NavItem = ({ board }: NavItemProps) => {
  const pathName = usePathname();
  const name = Helper.slugify(board.name);
  const currentLink = `/${name}/${board.id}`;

  const activeNavClass =
    currentLink === pathName
      ? "rounded-br-full text-primary-white bg-primary-main-purple rounded-tr-full"
      : "";

  return (
    <li className="pr-6">
      <Link
        href={currentLink}
        className={`
          flex
          items-center
          gap-3
          py-3
          px-6
          cursor-pointer
          ${activeNavClass}  
        `}
      >
        <IconBoard width={16} height={16} />
        <p>{board.name}</p>
      </Link>
    </li>
  );
};
