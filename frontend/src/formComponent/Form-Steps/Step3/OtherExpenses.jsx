import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
const OtherExpenses = ({ index, remove, calculateTotal }) => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  const nameError = errors?.otherExpense?.[index]?.otherExpenseName;
  const expenseError = errors?.otherExpense?.[index]?.otherExpenses;

  const isNameTouched = touchedFields?.otherExpense?.[index]?.otherExpenseName;
  const isExpenseTouched = touchedFields?.otherExpense?.[index]?.otherExpenses;

  return (
    <div className="w-200 h-80 m-4 p-4 shadow-xl">
      <div className="relative">
        <IoMdClose
          className="absolute top-2 right-2 w-5 h-5 cursor-pointer"
          onClick={() => remove(index)}
        />
      </div>

      <Stack spacing={4} width={"40rem"} marginTop={8} mx={"auto"}>
        <TextField
          label="Name of expenses"
          {...register(`otherExpense.${index}.otherExpenseName`, {
            required: "Name of other expenses required",
            pattern: {
              value: /^[A-Za-z'\-\s]{2,50}$/,
              message: "Name donot contain numeric value",
            },
          })}
          error={!!(isNameTouched && nameError)}
          helperText={isNameTouched ? nameError?.message : ""}
        />
        <TextField
          label="Enter other expenses"
          type="text"
          inputMode="decimal"
          {...register(`otherExpense.${index}.otherExpenses`, {
            required: "Other expense is required",
            validate: (value) =>
              /^\d+(\.\d{1,2})?$/.test(value?.toString()) ||
              "Please enter a valid value up to 2 decimals",
          })}
          onBlur={calculateTotal}
          error={!!(isExpenseTouched && expenseError)}
          helperText={isExpenseTouched ? expenseError?.message : ""}
        />
      </Stack>
    </div>
  );
};

export default OtherExpenses;
