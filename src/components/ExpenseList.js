import { Button } from "@material-ui/core";
import React from "react";
import { ExpenseItem } from "./ExpenseItem";
export const ExpenseList = ({
  expenses,
  clearItems,
  handleDelete,
  handleEdit,
}) => {
  return (
    <React.Fragment>
      <ul>
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              key={expense.id}
              expense={expense}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <Button
          className="btn-clear alert alert-danger btn btn-lg btn-danger"
          onClick={clearItems}
          variant="contained"
          color="secondary"
        >
          Clear Expenses
        </Button>
      )}
    </React.Fragment>
  );
};
