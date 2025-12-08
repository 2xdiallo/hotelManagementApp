import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import toast from "react-hot-toast";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    }={},
    isLoading,
    error,
  } = useSettings();


  const { updateSettings, isUpdating } = useUpdateSettings();
  // const {minBookingLength, maxGuestPerBooking, breakfastPrice,maxBookingLength} = settings;
  if (isLoading) return <Spinner />;
  if (error) {
    return (
      <>
        <div>Error loading settings: {error.message}</div>
        {toast.error(error.message || "An error occurred")}
      </>
    );
  }

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;

    updateSettings({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
