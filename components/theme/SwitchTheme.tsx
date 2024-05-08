import { useTheme } from "next-themes";
import { IconDarkTheme, IconLightTheme } from "@/components/common/icon";
import SwitchInput from "./SwitchInput";

export const SwitchTheme = () => {
  const { setTheme, theme } = useTheme();

  const darkPointer = theme !== "dark" ? "cursor-pointer" : "";
  const lightPointer = theme !== "light" ? "cursor-pointer" : "";

  const handleSwitchTheme = (nextTheme: "dark" | "light") => {
    if (theme === nextTheme) return;

    setTheme(nextTheme);
  };

  return (
    <footer
      className="
        h-12
        bg-primary-light-grey-light
        dark:bg-primary-very-dark-grey
        mx-5
        mt-6
        rounded-md
        flex
        gap-4
        justify-center
        items-center
      "
    >
      <IconLightTheme
        onClick={() => handleSwitchTheme("light")}
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className={`${lightPointer} fill-primary-medium-grey`}
      />
      <SwitchInput />
      <IconDarkTheme
        onClick={() => handleSwitchTheme("dark")}
        viewBox="0 0 24 24"
        width={24}
        height={24}
        className={`${darkPointer} fill-primary-medium-grey`}
      />
    </footer>
  );
};
