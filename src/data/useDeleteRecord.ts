import { useMutation, useQueryClient } from "react-query";
import { API } from "../types/data/API";

const deleteRecord = async (id: string): Promise<API> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(process.env.REACT_APP_BASE_URL + "/apis/" + id, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("An error occured while fetching APIs!");
  }
  return response.json();
};

type IUseDeleteRecord = {
  id: string;
};

const useDeleteRecord = ({ id }: IUseDeleteRecord) => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading } = useMutation<API, any>(
    () => deleteRecord(id),
    {
      onMutate: async () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["APIs"]);
        const oldAPIs = queryClient.getQueryData<API[]>(["APIs"]);
        if (oldAPIs) {
          const newAPIs = oldAPIs.filter((api) => api.id !== id);
          queryClient.setQueryData(["APIs"], () => newAPIs);
        }
        return { oldAPIs };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          ["APIs"],
          (context as { oldAPIs: API[] }).oldAPIs
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(["APIs"]);
      },
    }
  );
  const handleDelete = () => {
    mutate();
  };

  return { handleDelete, isLoading, isSuccess };
};

export default useDeleteRecord;
