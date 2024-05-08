"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface SidebarContextProps {
  children: ReactNode;
}

interface SidebarState {
  isShow: boolean;
  isMobile: boolean;
}

interface SidebarContextValue {
  sidebarState: SidebarState;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

export const SidebarProvider: React.FC<SidebarContextProps> = ({
  children,
}) => {
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    isShow: false,
    isMobile: false,
  });

  const openSidebar = () => {
    setSidebarState((prevState) => ({ ...prevState, isShow: true }));
  };

  const closeSidebar = () => {
    setSidebarState((prevState) => ({ ...prevState, isShow: false }));
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setSidebarState((prevState) => ({ ...prevState, isMobile }));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const contextValue: SidebarContextValue = {
    sidebarState,
    openSidebar,
    closeSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
