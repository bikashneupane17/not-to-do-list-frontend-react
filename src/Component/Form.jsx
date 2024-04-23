import React, { useState } from "react";
import { postNewTask } from "../utils/axiosHelper";

const initialState = {
  task: "",
  hour: "",
  type: "entry",
};

const totalWeekHours = 7 * 24;

export const Form = ({ fetchAllTasks, totalHours }) => {
  const [form, setForm] = useState(initialState);

  const [respone, setResponse] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    respone.message && setResponse({});

    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (totalHours + +form.hour > totalWeekHours) {
      setForm(initialState);
      return alert("sorry Boss not enough hours left to fit this task");
    }

    const result = await postNewTask(form);
    setResponse(result);
    if (result.status === "success") {
      setForm(initialState);
      fetchAllTasks();
    }
  };

  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className="mt-5 border p-5 rounded shadow-lg bg-transparent"
      >
        {respone?.message && (
          <div className="row">
            <div
              className={
                respone.status === "success"
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
            >
              {respone.message}
            </div>
          </div>
        )}

        <div className="row g-2 ">
          <div className="col-md-6">
            <input
              type="text"
              name="task"
              value={form.task}
              className="form-control"
              placeholder="Task"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="hour"
              value={form.hour}
              className="form-control"
              placeholder="Hours"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-primary">Add New Task</button>
          </div>
        </div>
      </form>
    </>
  );
};
