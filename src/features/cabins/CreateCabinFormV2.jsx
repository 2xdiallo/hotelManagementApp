import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useCreateEditCabin from "./useCreateEditCabin";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { createEditCabin } from "../../services/apiCabins";
import { useCreateCabin } from "./useCreateCabin";

const Error = styled.span`
  font-size: 1.4rem;
  color: red;
`;

function CreateCabinForm({ cabinToEdit = {} , onCloseModal}) {
  const { id: editedId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editedId);
   
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const {isCreating, createCabin} = useCreateCabin();


  const {editCabin,isEditing} = useCreateEditCabin();

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0]; 
    // const payload = {
    //   ...data,
    //   image: data.image[0], // always pick the first file
    // };

    if (isEditSession) {
      editCabin({ newCabinData: {...data, image}, id: editedId },{
        onSuccess: () => {
          reset();
          onCloseModal?.()
        }
      });
    } else {
      createCabin({...data, image: image },{
        onSuccess: () => {
          reset();
          onCloseModal?.()
        }
      });
    }
  };

  const onError = (errors) => console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          {...register("name", { required: "Name is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          {...register("maxCapacity", {
            required: "Capacity is required",
            valueAsNumber: true,
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          {...register("regularPrice", { required: "Price is required", valueAsNumber: true })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"   
          {...register("discount", {
            valueAsNumber: true,
            validate: (value) =>
              value < getValues("regularPrice") || "Discount must be less than price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea {...register("description")}  />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          type="file"
          accept="image/*"
          {...register("image", { required: !isEditSession })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" variation="secondary" disabled={isCreating} onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
