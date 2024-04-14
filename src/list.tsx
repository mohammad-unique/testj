import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCityById, getCityList } from "./city.api";
import { queryClient } from "./queryClient";

const List = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["cityList"],
    queryFn: () => getCityList().then((res) => res.data),
  });

  const { mutate: deleteCity } = useMutation({
    mutationFn: (id: string) => deleteCityById(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey : ["cityList"]
      })
    },
    onError(error) {
      alert(error.message);
    },
  });

  if (isPending) return <p>Loading</p>;
  else if (error) return <p>{error.message}</p>;

  function handleDelete(id: string): void {
    deleteCity(id);
  }

  return (
    <div>
      {data.map((item) => (
        <li>
          {item.name}
          <button onClick={() => handleDelete(item.id)}>x</button>
        </li>
      ))}
    </div>
  );
};

export default List;
