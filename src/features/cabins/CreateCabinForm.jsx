import { useCreateCabin } from "./useCreateCabin";
import { useEditcabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";

function CreateCabinForm({ cabin }) {
  const { id: editCabinId, ...editCabinDetails } = cabin ?? {};
  const editSession = Boolean(editCabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editCabinDetails : {},
  });
  const { errors } = formState;

  //Create a cabin
  const { isCreatingCabin, createCabin } = useCreateCabin();

  //For editing a cabin
  const { isEditingCabin, editCabin } = useEditcabin();

  const isWorking = isEditingCabin || isCreatingCabin;

  function submitHandler(data) {
    // mutate({ ...data, image: data.image[0] });
    // console.log({ ...data, image: data.image[0] });
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (editCabinId) {
      editCabin(
        {
          newCabinData: {
            ...data,
            image,
          },
          id: editCabinId,
        },
        {
          //Data returned by the createEditCabin function passed in the mutate property in
          //the useMutation hook
          // console.log(data);
          onSuccess: () => {
            // console.log(data);
            reset();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            //Data returned by the createEditCabin function passed in the mutate property in
            //the useMutation hook
            // console.log(data);
            reset();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(submitHandler, onError)}>
      <FormRow label="Cabin Name" errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is mandatory",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" errors={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is mandatory",
            min: {
              value: 1,
              message: "The minimum capacity should be atleast 1",
            },
            max: {
              value: 30,
              message: "The maximum capacity can't be greater than 30",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" errors={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is mandatory",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" errors={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is mandatory",
            validate: (value) =>
              Number(getValues().regularPrice) >= Number(value) ||
              "The discount should be less than the regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errors={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is mandatory",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editSession ? false : "This field is mandatory",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {editSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
