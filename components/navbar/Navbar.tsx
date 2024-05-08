import { IconPlusBtn } from "../common/ui/IconPlusBtn";
import { IconChevronDown } from "../common/ui/IconChevronDown";
import { IconMenu } from "../common/ui/IconMenu";
import { MobileLogo } from "./MobileLogo";
import { TaskSection } from "./TaskSection";
import { Board, Column } from "@prisma/client";

interface IconSectionProps {
  children: React.ReactNode;
}

interface NavbarProps extends Board {
  columns: Column[];
}

// IconSection Component
const IconSection: React.FC<IconSectionProps> = ({ children }) => {
  return <section className="xs-custom:hidden">{children}</section>;
};

// TitleSection Component
const TitleSection: React.FC<{ boards: NavbarProps[] }> = ({ boards }) => {
  return (
    <section className="flex items-center h-full">
      {/* only for mobile */}
      <h2
        className="
        xs-custom:hidden 
        text-lg font-bold 
        text-primary-black 
        dark:text-primary-white"
      >
        Platform Launch
      </h2>
      <IconChevronDown className="xs-custom:hidden" />
      {/* for small to high screen */}
      <ul className="h-full flex">
        <MobileLogo boards={boards} />
        <li
          className="
          flex 
          items-center 
          sm-custom:border-l-[1px] 
          sm-custom:border-primary-lines-light dark:sm-custom:border-primary-lines-dark"
        >
          <h2
            className="
            text-lg font-bold 
            text-primary-black 
            dark:text-primary-white 
            ml-8 hidden 
            sm-custom:block"
          >
            Platform Launch
          </h2>
        </li>
      </ul>
    </section>
  );
};

const ActionSection: React.FC = () => {
  return (
    <section className="xs-custom:hidden">
      <IconPlusBtn />
    </section>
  );
};

export const Navbar: React.FC<{ boards: NavbarProps[] }> = ({ boards }) => {
  return (
    <header
      className="
      xs-custom:h-[81px] 
      sm-custom:h-24 
      md-custom:h-[97px] 
      bg-primary-white 
      dark:bg-primary-dark-grey 
      flex gap-4 justify-between 
      items-center 
      h-16 px-4"
    >
      <IconSection>
        <IconMenu />
      </IconSection>
      <TitleSection boards={boards} />
      <ActionSection />
      <TaskSection boards={boards} />
    </header>
  );
};
