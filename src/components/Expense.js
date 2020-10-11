import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid";
import "./budget.css";

import { Alert } from "./Alert";
import { ExpenseForm } from "./ExpenseForm";
import { ExpenseList } from "./ExpenseList";

// const initialExpenses = [
//   { id: uuid.v4(), charge: "rent", amount: 4000 },
//   { id: uuid.v4(), charge: "car", amount: 3000 },
//   { id: uuid.v4(), charge: "card bill", amount: 1200 },
//   { id: uuid.v4(), charge: "food", amount: 1800 },
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
const Expense = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expenses
  const [charge, setCharge] = useState("");
  // single Amount
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({ show: false });

  // Edit
  const [edit, setEdit] = useState(false);
  // Edit Item
  const [Id, setId] = useState(0);

  //useEffect
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  //handle charge
  const handleCharge = (event) => {
    setCharge(event.target.value);
  };
  //handle amount
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  //handle Alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  };
  //handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === Id ? { ...item, charge, amount } : item;
        });
        console.log(tempExpenses);
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item edited successfully" });
      } else {
        const singleExpense = { id: uuid.v4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item added successfully" });
      }
      setAmount("");
      setCharge("");
    } else {
      //handle alert called
      handleAlert({
        type: "danger",
        text: "charge can't be empty and amount value has to be greater than 0",
      });
    }
  };
  //clear All items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All Items cleared successfully" });
  };
  //handle delete
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item deleted successfully" });
  };
  //handle edit
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  return (
    <div className="container">
      <div className="m-auto">
        {alert.show && <Alert type={alert.type} text={alert.text} />}
        <Alert />
        <h1>expense calculator</h1>
        <main className="App">
          <ExpenseForm
            charge={charge}
            amount={amount}
            handleCharge={handleCharge}
            handleAmount={handleAmount}
            handleSubmit={handleSubmit}
            edit={edit}
          />
          <ExpenseList
            expenses={expenses}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            clearItems={clearItems}
          />
        </main>
        <h1 className="display-5 mb-5">
          Total Expense:
          <span className="text-white bg-danger p-2">
            $
            {expenses.reduce((acc, curr) => {
              return (acc += parseFloat(curr.amount));
            }, 0)}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Expense;
