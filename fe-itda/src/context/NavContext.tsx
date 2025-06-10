import { createContext, useContext, useState } from "react";

const NavContext = createContext<{
  isNavVisible: boolean;
  toggleNav: () => void;
}>({
  isNavVisible: false,
  toggleNav: () => {},
});

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const toggleNav = () => {
    setIsNavVisible((prev) => !prev);
  };

  return (
    <NavContext.Provider value={{ isNavVisible, toggleNav }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);
