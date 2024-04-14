import { FC, useMemo, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | string[];
  setValue: (value: string | string[]) => void;
  multiple?: boolean;
  label: string;
}

const Select: FC<SelectProps> = (props) => {
  const { options, setValue, label, value, multiple } = props;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    return options
      .filter((item) => !search || item.label.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.label.localeCompare(b.label))
      .sort((a, b) => multiple ?  (value.includes(a.value) ? -1 : 1) : 1)
      .slice(0, 7);
  }, [multiple, options, search, value]);

  const handleItemClick = (clickedValue: string) => {
    if (multiple) {
      if (value.includes(clickedValue)) setValue((value as string[]).filter((item) => item !== clickedValue));
      else setValue([...value, clickedValue]);
    } else {
      setValue(clickedValue);
    }
  };

  const handleSelectAll = () => {
    if (search) {
      setValue(filteredOptions.map((item) => item.value));
    } else {
      if (value.length === options.length) setValue([]);
      else setValue(options.map((item) => item.value));
    }
  };

  const labelValue = useMemo(() => {
    if (multiple) {
      if (value.length === 1) return options.find((item) => item.value === value[0])?.label;
      else if (value.length > 1) return label + ` (${value.length})`;
      else return label;
    } else {
      if (value) return options.find((item) => item.value === value)?.label;
      return label;
    }
  }, [label, multiple, options, value]);

  function handleClear(): void {
    if (multiple) setValue([]);
    else setValue("");
  }

  return (
    <div className="relative">
      <div className="border rounded-xl z-10 p-2 flex gap-5 cursor-pointer" onClick={() => setOpen(true)}>
        <span>{labelValue}</span>
        <span className="rotate-90">{">"}</span>
        {value.length > 0 && (
          <span onClick={handleClear} className="rotate-90">
            {"x"}
          </span>
        )}
      </div>
      {open && (
        <>
          <div className="shadow-lg z-10 w-[200px] left-0 top-full mt-3 p-4 absolute flex flex-col gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border"
              type="text"
              placeholder="search ..."
            />
            <ul>
              {multiple && !search && (
                <li onClick={handleSelectAll} className="flex gap-2 items-center cursor-pointer hover:bg-red-300 p-1">
                  {multiple && <input checked={value.length === options.length} type="checkbox" />}
                  <span>All</span>
                </li>
              )}
              {filteredOptions.map((item) => (
                <li
                  onClick={() => handleItemClick(item.value)}
                  className="flex gap-2 items-center cursor-pointer hover:bg-red-300 p-1"
                >
                  {multiple && <input checked={value.includes(item.value)} type="checkbox" />}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div onClick={() => setOpen(false)} className="fixed top-0 z-0 left-0 w-full h-screen "></div>
        </>
      )}
    </div>
  );
};

export default Select;
