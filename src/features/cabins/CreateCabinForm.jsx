import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";

function CreateCabinForm({ cabin, onCloseModal }) {
  const { id: editCabinId, ...editCabinDetails } = cabin ?? {};
  const editSession = Boolean(editCabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editCabinDetails : {},
  });
  const { errors } = formState;

  //Create a cabin
  const { isCreatingCabin, createCabin } = useCreateCabin();

  //For editing a cabin
  const { isUpdatingCabin, updateCabin } = useUpdateCabin();

  const isWorking = isUpdatingCabin || isCreatingCabin;

  function submitHandler(data) {
    // mutate({ ...data, image: data.image[0] });
    // console.log({ ...data, image: data.image[0] });
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (editCabinId) {
      updateCabin(
        {
          newCabinData: {
            ...data,
            image,
          },
          id: editCabinId,
        },
        {
          onSuccess: () => {
            // console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }
  /*
Setting a type prop for customizing styling on the Form 
if onCloseModal is defined => cabinForm is to be displayed inside a modal
"regular" - form rendered outside a modal
"modal" - form rendered inside a modal
  */

  return (
    <Form
      // onClick={(e) => e.stopPropagation()}
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(submitHandler, onError)}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is mandatory",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
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

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is mandatory",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
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
        error={errors?.description?.message}
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
      {/*
  We need to make sure that if we use the CabinForm outside the modal
  where we won't have an onCloseModal prop, the code shouldn't break.
  That's why we will use optional chaining
  */}

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
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
