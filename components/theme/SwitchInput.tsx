import { useTheme } from "next-themes";

const SwitchInput = () => {
  const { setTheme, theme } = useTheme();
  const isDark: boolean = theme === "dark";

  const handleCheckboxChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <>
      <label className="relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isDark}
          onChange={handleCheckboxChange}
        />
        <span
          className={`
          flex 
          h-[20px] 
          w-[40px] 
          items-center 
          rounded-full 
          p-1 
          duration-200 
          bg-primary-main-purple
          `}
        >
          <span
            className={`h-[14px] w-[14px] rounded-full bg-white duration-200 ${
              isDark ? "translate-x-[18px]" : ""
            }`}
          ></span>
        </span>
      </label>
    </>
  );
};

export default SwitchInput;
