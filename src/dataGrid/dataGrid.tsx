import { Button, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useMemo, useState } from "react";

const rows: GridRowsProp = [
  { id: 1, name: "Mohammad", lastName: "Mohammadi" },
  { id: 2, name: "Ali", lastName: "Alavi" },
  { id: 3, name: "Saeed", lastName: "Saeedi" },
  { id: 4, name: "saeede", lastName: "Saeedei" },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
];

type StringOperator = "contains" | "equals" | "startsWith";

const stringOperatorList: StringOperator[] = ["contains", "equals", "startsWith"];

interface FilterType {
  column: string;
  operator: StringOperator;
  value: string;
}

(true && true) || true;
true && (true || true);

export default function MyDataGrid() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterType[]>([
    {
      column: "name",
      operator: "contains",
      value: "",
    },
  ]);
  const [conditionOperator, setConditionOperator] = useState<"and" | "or">("and");

  function handleChangeFilterColumn(index: number, value: string) {
    filters[index].column = value;
    setFilters([...filters]);
  }

  function handleChangeFilterOperator(index: number, value: string) {
    filters[index].operator = value as StringOperator;
    setFilters([...filters]);
  }
  function handleChangeFilterValue(index: number, value: string) {
    filters[index].value = value;
    setFilters([...filters]);
  }

  function handleRemoveAllFilter() {
    setFilters([]);
  }

  function handleDeleteFilter(index: number) {
    filters.splice(index, 1);
    setFilters([...filters]);
  }
  function handleAddFilter() {
    filters.push({
      column: columns[0].field,
      operator: stringOperatorList[0],
      value: "",
    });
    setFilters([...filters]);
  }

  const rowsFiltered = useMemo(() => {
    return rows.filter((item) => {
      if (filters.length === 0) return true;
      for (const filter of filters) {
        switch (filter.operator) {
          case "contains":
            if (item[filter.column].toLowerCase().includes(filter.value.toLowerCase())) {
              if (conditionOperator === "or") return true;
            } else {
              if (conditionOperator === "and") return false;
            }
            break;
          case "equals":
            if (item[filter.column].toLowerCase() === filter.value.toLowerCase()) {
              if (conditionOperator === "or") return true;
            } else {
              if (conditionOperator === "and") return false;
            }
            break;
          case "startsWith":
            if (item[filter.column].toLowerCase().startsWith(filter.value.toLowerCase())) {
              if (conditionOperator === "or") return true;
            } else {
              if (conditionOperator === "and") return false;
            }
            break;
        }
      }
      if (conditionOperator === "and") return true;
      else return false;
    });
  }, [rows, filters, conditionOperator]);

  return (
    <div style={{ height: 300, width: "100%", direction: "ltr" }} className="p-6">
      <button onClick={() => setOpen(!open)}>filter</button>
      <Collapse in={open}>
        <div className="p-3 flex flex-col gap-4">
          {filters.map((item, index) => (
            <div className="grid grid-cols-[max-content_0.5fr_1fr_1fr_1fr] gap-3">
              <IconButton onClick={() => handleDeleteFilter(index)}>X</IconButton>
              {index !== 0 ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Condition</InputLabel>
                  <Select
                    value={conditionOperator}
                    label="condition"
                    disabled={index !== 1}
                    onChange={(e) => setConditionOperator(e.target.value as "and" | "or")}
                  >
                    <MenuItem value={"and"}>And</MenuItem>
                    <MenuItem value={"or"}>Or</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <span></span>
              )}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Column</InputLabel>
                <Select
                  value={item.column}
                  label="Column"
                  onChange={(e) => handleChangeFilterColumn(index, e.target.value)}
                >
                  {columns.map((item) => (
                    <MenuItem value={item.field}>{item.headerName}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Operator</InputLabel>
                <Select
                  value={item.operator}
                  label="Operator"
                  onChange={(e) => handleChangeFilterOperator(index, e.target.value)}
                >
                  {stringOperatorList.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Value"
                value={item.value}
                onChange={(e) => handleChangeFilterValue(index, e.target.value)}
                placeholder="value"
              />
            </div>
          ))}
          <div className="flex justify-between mt-2">
            <Button onClick={handleAddFilter}>Add Filter</Button>
            <Button onClick={handleRemoveAllFilter}>Remove All</Button>
          </div>
        </div>
      </Collapse>
      <DataGrid filterMode="client" rows={rowsFiltered} columns={columns} />
    </div>
  );
}
