import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// (Styled components for the form)
const FormRow = styled.div`
  display: grid;

  align-items: center;

  grid-template-columns: 24rem 1fr 1.2fr;

  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;

    justify-content: flex-end;

    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;

  color: var(--color-red-700);
`;

function CreateCabinForm() {
  // 1. Destructure register, handleSubmit, AND reset from useForm
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(); // Reset the form after successful submission
      toast.success("Cabin created successfully");
    },
    onError: () => {
      toast.error("Error creating cabin");
      throw new Error("Error creating cabin");
    }
  });

  // 2. The submit handler must be defined as an ASYNC function
  async function submitForm(data) {
    const newCabin = {
      name: data.name,
      // RHF utility: use valueAsNumber to ensure these are numbers
      maxCapacity: data.maxCapacity,
      regularPrice: data.regularPrice,
      discount: data.discount,
      description: data.description,
      image: data.image[0], // Access the first file from the FileList
    };

    
      // Await the asynchronous API call
      // await createCabin(newCabin);
      mutate(newCabin);
        
  }

  // 3. The component must RETURN the JSX structure
  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        {/* Best Practice: Add basic required validation */}
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        {/* Use valueAsNumber for number inputs */}
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Capacity is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Price is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", { valueAsNumber: true ,required: "Name is required" })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        {/* Textarea should not have a type="number" */}
        <Textarea
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>

        <Button disabled={isLoading}>
          {isLoading ? "Adding..." : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
