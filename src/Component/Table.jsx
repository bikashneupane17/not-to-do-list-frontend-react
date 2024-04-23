import React, { useState } from "react";
import { deleteTasks } from "../utils/axiosHelper";

export const Table = ({ itemList, switchTask, fetchAllTasks }) => {
  const [idsToDelete, setIdsToDelete] = useState([]);

  const entries = itemList.filter((task) => task.type === "entry");

  const badList = itemList.filter((task) => task.type === "bad");

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const { status } = await deleteTasks(idsToDelete);
      if (status === "success") {
        setIdsToDelete([]);
        fetchAllTasks();
      }
    }
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    checked
      ? setIdsToDelete([...idsToDelete, value])
      : setIdsToDelete(idsToDelete.filter((_ids) => _ids !== value));
  };

  const handleOnSelectAll = (e) => {
    const { checked, value } = e.target;

    const ids =
      value === "entry"
        ? entries.map((item) => item._id)
        : badList.map((item) => item._id);

    checked
      ? setIdsToDelete([...idsToDelete, ...ids])
      : setIdsToDelete(idsToDelete.filter((id) => !ids.includes(id)));
  };

  const displayEntryRow = () => {
    return entries.map((item, index) => (
      <tr key={item._id}>
        <td>
          <input
            type="checkbox"
            className="form-check-input"
            onChange={handleOnSelect}
            value={item._id}
            checked={idsToDelete.includes(item._id)}
          />
        </td>
        <th>{index + 1}</th>
        <td>{item.task}</td>
        <td>{item.hour} hrs</td>
        <td className="text-end">
          <button
            className="btn btn-success"
            onClick={() => switchTask(item._id, "bad")}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </td>
      </tr>
    ));
  };

  const displayBadRow = () => {
    return badList.map((item, index) => (
      <tr key={item._id}>
        <td>
          <input
            type="checkbox"
            className="form-check-input"
            onChange={handleOnSelect}
            value={item._id}
            checked={idsToDelete.includes(item._id)}
          />
        </td>
        <th>{index + 1}</th>
        <td>{item.task}</td>
        <td>{item.hour} hrs</td>
        <td className="text-end ">
          <button
            className="btn btn-warning make-colourful"
            onClick={() => switchTask(item._id, "entry")}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="row mt-5 gap-2">
        {/* Entry list */}
        <div className="col-md">
          <h3 className="text-center">Task Entry List</h3>
          <hr />
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="selectEntryList"
              onChange={handleOnSelectAll}
              value="entry"
              checked={entries.every((item) => idsToDelete.includes(item._id))}
            />
            <label htmlFor="selectEntryList">Select All Entry List</label>
          </div>

          <table className="table table-custom table-hover border">
            <tbody id="table-entry-list">{displayEntryRow()}</tbody>
          </table>
        </div>

        {/* Bad list */}
        <div className="col-md ">
          <h3 className="text-center">Bad List</h3>
          <hr />
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="selectBadList"
              onChange={handleOnSelectAll}
              value="bad"
              checked={badList.every((item) => idsToDelete.includes(item._id))}
            />
            <label htmlFor="selectBadList">Select All Bad List</label>
          </div>
          <table className="table table-custom table-hover border table-bad">
            <tbody id="table-not-to-do-lsit">{displayBadRow()}</tbody>
          </table>
        </div>
        <div className="d-grid mb-3">
          <button className="btn btn-danger btn-lg" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i> Delete {idsToDelete.length}{" "}
            task(s)
          </button>
        </div>
      </div>
    </>
  );
};
