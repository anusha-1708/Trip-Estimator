import { Stack, TextField, FormControl } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

const Step1 = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  const minDate = dayjs("2024-01-01");
  const maxDate = dayjs("2029-01-01");
  return (
    <Stack spacing={2} width={"40rem"} marginTop={8} mx={"auto"}>
      <TextField
        label="Enter Trip Name"
        variant="outlined"
        {...register("tripName", {
          required: "Trip name is required",
          pattern: {
            value: /^[A-Za-z'\-\s]{2,50}$/,
            message: "Name should be character not numeric",
          },
        })}
        error={!!errors.tripName}
        helperText={errors.tripName?.message}
      />
      <TextField
        label="Destination"
        variant="outlined"
        {...register("destination", {
          required: "Destination place is required",
          pattern: {
            value: /^[A-Za-z'\\-\\s]{2,50}$/,
            message: "Destination must contain atleast 2 character",
          },
        })}
        error={!!errors.destination}
        helperText={errors.destination?.message}
      />

      <FormControl fullWidth={"true"}>
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: "Start date is required",
            validate: (value) => {
              const date = dayjs(value);
              if (date.isBefore(minDate)) {
                return "Date should not be less than 01-01-2024";
              }

              if (date.isAfter(maxDate)) {
                return "Date should not be more than 01-01-2029";
              }

              return true;
            },
          }}
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              minDate={minDate}
              maxDate={maxDate}
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => {
                if (newValue && dayjs(newValue).isValid()) {
                  field.onChange(newValue.toISOString());
                } else {
                  field.onChange(null);
                }
              }}
              slotProps={{
                textField: {
                  error: !!errors.startDate,
                  helperText: errors.startDate?.message,
                },
              }}
            />
          )}
        />
      </FormControl>

      <FormControl fullwidth={"true"}>
        <Controller
          name="endDate"
          control={control}
          rules={{
            required: "End date is required",
            validate: (value) => {
              const date = dayjs(value);
              if (date.isBefore(minDate)) {
                return "Date should not be less than 01-01-2024";
              }
              if (date.isAfter(maxDate)) {
                return "Date should not be more than 01-01-2029";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <DatePicker
              label="End Date"
              variant="outlined"
              minDate={minDate}
              maxDate={maxDate}
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => {
                if (newValue && dayjs(newValue).isValid()) {
                  field.onChange(newValue.toISOString());
                } else {
                  field.onChange(null);
                }
              }}
              slotProps={{
                textField: {
                  error: !!errors.endDate,
                  helperText: errors.endDate?.message,
                },
              }}
            />
          )}
        ></Controller>
      </FormControl>
      <TextField
        label="Enter Number of Persons"
        variant="outlined"
        type="number"
        {...register("persons", {
          required: "Number of persons is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Persons should not be in decimal",
          },
          min: {
            value: 1,
            message: "Atleast 1 person is required",
          },
          max: {
            value: 99,
            message: "Person should not exceed more than 99",
          },
        })}
        error={!!errors.persons}
        helperText={errors.persons?.message}
      />
    </Stack>
  );
};

export default Step1;
