import { FC, ReactElement } from "react";

interface LayoutProps {
  children: ReactElement;
}

const Layout: FC<LayoutProps> = (props) => {


  
  return (
    <div>
      {/* <Header toggleMenu={() => setOpen((open) => !open)}></Header>
      <Sidebar  />
      {children} */}
    </div>
  );
};

export default Layout;
