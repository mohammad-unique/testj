import { FC } from "react";

interface HeaderProps {
    toggleMenu : ()=>void
}

const Header :FC<HeaderProps>= ({toggleMenu}) => {
  return (
    <div>
      Logo
      <button onClick={toggleMenu}>menu</button>
    </div>
  );
};

export default Header;
