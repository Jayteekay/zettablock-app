import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import useUpdateField from "../../../data/useUpdateField";

type EdittableDescriptionProps = {
    value: string;
    id: string;
}

type DescriptionFormProps = EdittableDescriptionProps & { onSubmit: () => void }

const DescriptionForm = ({ value, id, onSubmit }: DescriptionFormProps) => {
    const [editValue, setEditValue] = useState(value);

    const { handleUpdate, isLoading } = useUpdateField<string>({ id, field: "description" })

    const handleValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEditValue(event.target.value);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleUpdate(editValue)
        onSubmit()
    }
    return <form onClick={(event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
    }} onSubmit={handleSubmit}>
        <textarea value={editValue} onChange={handleValueChange}></textarea>
        <button>{isLoading ? "..." : "Update"}</button>
    </form>
}

const EdittableDescription = ({ value, id }: EdittableDescriptionProps) => {
    const [isEditting, setIsEditting] = useState(false);

    const startEditing = (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        setIsEditting(true);
    }

    return isEditting ? <DescriptionForm onSubmit={() => setIsEditting(false)} value={value} id={id} /> : <span onClick={startEditing}>{value}</span>
}

export default EdittableDescription;