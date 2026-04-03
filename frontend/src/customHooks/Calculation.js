import React from "react";
// Total amount of fixed expenses
export const getFixedExpenses = (fixedExpense) => {
  return Object.values(fixedExpense).reduce((acc, sum) => {
    const num = Number(sum);
    if (!isNaN(num)) {
      return acc + num;
    }
    return acc;
  }, 0);
};

// Calculate per person cost
export const calculatePerPerson = (fixedExpense, persons) => {
  const total = getFixedExpenses(fixedExpense);
  const perPersonCost = total / persons;
  const roundedPerPersonCost = Number(perPersonCost.toFixed(0));
  return roundedPerPersonCost;
};
