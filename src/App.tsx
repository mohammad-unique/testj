import { useState } from "react";
import { CoinModel } from "./coin.model";
import mockData from "./coins.json";
import List from "./list";

function App() {
  const [data, setData] = useState<CoinModel[]>(mockData);
  const [industry, setIndustry] = useState<string[]>([]);
  const [coin, setCoin] = useState<string>("");

  const handleChangeInputIndustry = (value: string | string[]) => {
    if (Array.isArray(value)) setIndustry(value);
  };

  const handleChangeCoin = (value: string | string[]) => {
    if (typeof value === "string") setCoin(value);
  };

  return (
    <div style={{ direction: "ltr" }} className="flex items-center justify-center w-screen">
      {/* <Select
        label="Industry"
        value={industry}
        setValue={handleChangeInputIndustry}
        options={data.map((item) => ({ label: item.name, value: item.id }))}
        multiple
      />

      <Select
        label="Coin"
        value={coin}
        setValue={handleChangeCoin}
        options={data.map((item) => ({ label: item.name, value: item.id }))}
      /> */}

      <List></List>

      {/* <pre>{JSON.stringify(industry,undefined,2)}</pre> */}
    </div>
  );
}

export default App;
