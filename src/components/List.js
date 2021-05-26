import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";

const List = ({ list, handleDelete, handleEdit }) => {
  return (
    <div className="list-container">
      {list.map((item) => {
        return (
          <div className="item-container" key={item.id}>
            <p>{item.name}</p>
            <button
              onClick={() => {
                handleEdit(item.name, item.id);
              }}
            >
              <MdModeEdit />
            </button>
            <button
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              <MdDelete />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
