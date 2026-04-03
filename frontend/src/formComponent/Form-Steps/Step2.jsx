import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const Step2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack spacing={4} width={"40rem"} marginTop={8} mx={"auto"}>
      <TextField
        label="Enter food expenses"
        type="number"
        inputprop={{ step: "0.01", min: 0 }}
        {...register("fixedExpense.foodExpense", {
          valueAsNumber: true,
          required: "Food expense is required",
          validate: (value) =>
            /^\d+(\.\d{1,2})?$/.test(value.toString()) ||
            "Please enter a valid value up to 2 decimals",
        })}
        error={!!errors.fixedExpense?.foodExpense}
        helperText={errors.fixedExpense?.foodExpense?.message}
      />

      <TextField
        label="Enter travel expenses"
        type="number"
        inputprop={{ step: "0.01", min: 0 }}
        {...register("fixedExpense.travelExpense", {
          valueAsNumber: true,
          required: "Travel expense is required",
          validate: (value) =>
            /^\d+(\.\d{1,2})?$/.test(value.toString()) ||
            "Please enter a valid value up to 2 decimals",
        })}
        error={!!errors.fixedExpense?.travelExpense}
        helperText={errors.fixedExpense?.travelExpense?.message}
      />
      <TextField
        label="Enter stay expenses"
        type="number"
        inputprop={{ step: "0.01", min: 0 }}
        {...register("fixedExpense.stayExpense", {
          valueAsNumber: true,
          required: "Stay expense is required",
          validate: (value) =>
            /^\d+(\.\d{1,2})?$/.test(value.toString()) ||
            "Please enter a valid value up to 2 decimals",
        })}
        error={!!errors.fixedExpense?.stayExpense}
        helperText={errors.fixedExpense?.stayExpense?.message}
      />
    </Stack>
  );
};

export default Step2;
