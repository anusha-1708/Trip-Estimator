import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Step1 from "./Form-Steps/Step1";
import Step2 from "./Form-Steps/Step2";
import Step3 from "./Form-Steps/Step3/Step3";
import { Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createTripAsync, updateTripAsync } from "../store/trip.store";
import { handleSuccess } from "../utils/common";
const renderComponent = (step) => {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
  }
};
const stepFields = {
  0: ["tripName", "destination", "startDate", "endDate", "persons"],
  1: ["fixedExpense"],
  2: ["otherExpense"],
};
const steps = ["Trip Info", "Expenses", "Other Expenses"];
const StepperForm = ({ selectedId, onClose }) => {
  const trip = useSelector((state) =>
    state.stepper.trips.find((t) => t._id === selectedId),
  );
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const { trigger, reset } = methods;
  useEffect(() => {
    if (trip) {
      reset(trip);
    } else {
      reset();
    }
  }, [trip]);

  const handleNext = async () => {
    const fields = stepFields[activeStep];
    const isValid = await trigger(fields);
    if (isValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
      }
    }
  };
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleSubmission = (data) => {
    if (activeStep === steps.length - 1) {
      if (trip) {
        dispatch(updateTripAsync({ id: trip._id, data: data }));
        onClose();
        handleSuccess("Form updated successfully");
      } else {
        dispatch(createTripAsync(data));
        onClose();
        handleSuccess("Form submitted successfully");
      }
      reset();
    } else {
      handleNext();
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>{renderComponent(activeStep)}</div>
          <Stack
            direction={"column"}
            width={200}
            mx={"auto"}
            spacing={3}
            mt={3}
          ></Stack>
          <Stack direction={"row"} width={150} mx={"auto"} spacing={2} mt={2}>
            <Button type="button" onClick={handlePrev} variant="contained">
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                type="button"
                onClick={() => handleSubmission(methods.getValues())}
                variant="contained"
              >
                Submit
              </Button>
            ) : (
              <Button type="button" onClick={handleNext} variant="contained">
                Next
              </Button>
            )}
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};

export default StepperForm;
