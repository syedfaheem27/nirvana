import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabin }) {
  const { id: editCabinId, ...editCabinDetails } = cabin ?? {};
  const editSession = Boolean(editCabinId);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editCabinDetails : {},
  });
  const { errors } = formState;

  //For creating a cabin
  const { mutate: createCabin, isLoading: isCreatingCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin succesfully created!");
      queryClient.invalidateQueries(["cabins"]);
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  //For editing a cabin
  const { mutate: editCabin, isLoading: isEditingCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin succesfully edited!");
      queryClient.invalidateQueries(["cabins"]);
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isWorking = isEditingCabin || isCreatingCabin;

  function submitHandler(data) {
    // mutate({ ...data, image: data.image[0] });
    // console.log({ ...data, image: data.image[0] });
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (editCabinId) {
      editCabin({
        newCabinData: {
          ...data,
          image,
        },
        id: editCabinId,
      });
    } else {
      createCabin({ ...data, image: image });
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
