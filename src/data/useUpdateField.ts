import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ActionContext } from "../components/table/hooks/useActions";
import { API } from "../types/data/API";

type IUpdateData = Partial<API> & { id: string; isUndoOrRedo?: boolean };

const updateField = async ({
  isUndoOrRedo,
  id,
  ...data
}: IUpdateData): Promise<API> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(process.env.REACT_APP_BASE_URL + "/apis/" + id, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      isUndoOrRedo
        ? "Unable to perform action."
        : "An error occured while updating API!"
    );
  }
  return response.json();
};

const useUpdateField = () => {
  const queryClient = useQueryClient();
  const { addAction, actionIndex, removeAction } = useContext(ActionContext);
  const { mutate, isSuccess, isLoading } = useMutation<API, any, IUpdateData>(
    updateField,
    {
      onMutate: async ({ isUndoOrRedo, id, ...newUpdates }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["APIs"]);

        //Save old data befor performing optimistic update
        const oldAPIs = queryClient.getQueryData<API[]>(["APIs"]);
        if (oldAPIs) {
          let apiToUpdate: API | null = null;
          const newAPIs = oldAPIs.map((api) => {
            if (api.id === id) {
              apiToUpdate = api;
              return { ...api, ...newUpdates };
            }
            return api;
          });

          // Perform optimistic update
          queryClient.setQueryData(["APIs"], () => newAPIs);

          // Add update that are not previously in actions log
          if (!isUndoOrRedo && apiToUpdate) {
            const updatedFields = Object.keys(newUpdates);
            const oldUpdates = Object.fromEntries(
              updatedFields.map((key) => [
                key,
                apiToUpdate ? apiToUpdate[key as keyof API] : undefined,
              ])
            );
            addAction({
              type: "update",
              id,
              from: oldUpdates,
              to: newUpdates,
            });
            return { oldAPIs, actionIndex };
          }
        }
        return { oldAPIs };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newTodo, context) => {
        const { actionIndex, oldAPIs } = context as {
          actionIndex?: number;
          oldAPIs: API[];
        };

        oldAPIs && queryClient.setQueryData(["APIs"], oldAPIs);
        actionIndex && removeAction(actionIndex);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["APIs"]);
      },
    }
  );

  return { handleUpdate: mutate, isLoading, isSuccess };
};

export default useUpdateField;
