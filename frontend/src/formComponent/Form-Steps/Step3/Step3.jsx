import OtherExpenses from "./OtherExpenses";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { Button } from "@mui/material";

const Step3 = () => {
  const {
    control,
    getValues,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: "otherExpense",
  });

  const calculateTotal = () => {
    const values = getValues("otherExpense") || [];
    const total = values.reduce(
      (acc, item) => acc + Number(item?.otherExpenses || 0),
      0,
    );
    const roundedTotal = Number(total.toFixed(2));
    setValue("totalOtherExpenses", total);
    return roundedTotal;
  };

  const totalExpenses = watch("totalOtherExpenses") || 0;
  const handleAddExpense = () => {
    append({
      otherExpenseName: "",
      otherExpenses: "",
    });
  };

  return (
    <div>
      <h2 className="flex justify-center mt-4 font-bold text-xl">
        Add Other Expenses
      </h2>
      <div className="w-45 flex mx-auto mt-4">
        <Button
          type="button"
          variant="contained"
          startIcon={<IoMdAdd />}
          onClick={handleAddExpense}
        >
          Add Expenses
        </Button>
      </div>

      {fields?.map((item, index) => (
        <div className="flex mx-auto items-center justify-center" key={index}>
          <OtherExpenses
            index={index}
            data={item}
            remove={remove}
            calculateTotal={calculateTotal}
          />
        </div>
      ))}
      <div className="shadow-md rounded-md bg-green-400 text-white font-semibold text-base w-55 h-25 flex flex-col items-center mt-4 mx-auto p-2">
        <h3 className="font-bold items-center">Total Summary</h3>
        <div className="items-center inline mx-auto mt-2 justify-between">
          <span>Total Other Expenses :</span>
          <span className="flex flex-row">
            <FaRupeeSign className="mt-1" />
            {totalExpenses}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Step3;
