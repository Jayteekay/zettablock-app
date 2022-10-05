import { useMutation, useQueryClient } from "react-query";
import { API } from "../types/data/API";

const updateField = async <T>(
  id: string,
  data: Record<string, T>
): Promise<API> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(process.env.REACT_APP_BASE_URL + "/apis/" + id, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("An error occured while fetching APIs!");
  }
  return response.json();
};

type IUseUpdateField = {
  id: string;
  field: string;
};

const useUpdateField = <T>({ id, field }: IUseUpdateField) => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading } = useMutation<
    API,
    any,
    Record<string, T>
  >((data: Record<string, T>) => updateField<T>(id, data), {
    onMutate: async (newUpdates) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["APIs"]);
      const oldAPIs = queryClient.getQueryData<API[]>(["APIs"]);
      if (oldAPIs) {
        const newAPIs = oldAPIs.map((api) =>
          api.id === id ? { ...api, ...newUpdates } : api
        );
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
  });
  const handleUpdate = (value: T) => {
    mutate({ [field]: value });
  };

  return { handleUpdate, isLoading, isSuccess };
};

export default useUpdateField;
