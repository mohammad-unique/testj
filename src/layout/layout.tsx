import { FC, ReactElement, useEffect, useState } from "react";
import Header from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import axios, { AxiosResponse } from "axios";

interface LayoutProps {
  children: ReactElement;
}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  const [open, setOpen] = useState("dsdsd");
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    axios.get<string[]>("someAddress").then((res) => {
      setData(res.data);
    });
  }, []);

  
  return (
    <div>
      <Header toggleMenu={() => setOpen((open) => !open)}></Header>
      <Sidebar open={open} setOpen={setOpen} />
      {children}
    </div>
  );
};

export default Layout;
