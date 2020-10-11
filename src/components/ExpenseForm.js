import { Button, IconButton } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";

export const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="expense" className="lead">
                Charge
              </label>
              <input
                type="text"
                className="form-control lead"
                id="charge"
                name="charge"
                onChange={handleCharge}
                value={charge}
                placeholder="e.g. rent"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group px-5">
              <label htmlFor="amount" className="lead">
                Amount
              </label>
              <input
                type="number"
                className="form-control lead"
                id="amount"
                name="amount"
                onChange={handleAmount}
                value={amount}
                placeholder="e.g. 100"
              />
            </div>
          </div>
        </div>
        <button className="btn-submit alert alert-success btn-lg">
          {edit ? <EditIcon /> : <SendIcon />}
        </button>
      </div>
    </form>
  );
};
