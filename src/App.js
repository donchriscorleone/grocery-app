import React, { useState, useEffect } from "react";
import { MdShoppingCart } from "react-icons/md";
import { getLocalStorage } from "./utils/storage";
import List from "./components/List";
import { IconContext } from "react-icons";
import Alert from "./components/Alert";

function App() {
  const [item, setItem] = useState("");
  const [itemId, setItemId] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEdit, SetIsEdit] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item) {
      setAlert({ show: true, message: "Input is blank", type: "danger" });
      return;
    } else if (item && isEdit) {
      setList(
        list.map((l) => {
          if (l.id === itemId) {
            return { ...list, name: item };
          }
          return l;
        })
      );
      setItemId("");
      setItem("");
      SetIsEdit(false);
      setAlert({
        show: true,
        message: "Successfully Edited!",
        type: "success",
      });
      return;
    }

    const newItem = { id: new Date().getTime().toString(), name: item };
    setList([...list, newItem]);
  };

  const handleDelete = (id) => {
    const newArray = list.filter((i) => i.id !== id);
    setList(newArray);
  };

  const handleEdit = (item, id) => {
    setItem(item);
    setItemId(id);
    SetIsEdit(true);
  };

  const resetAlert = () => {
    setAlert({ message: "", show: false, type: "" });
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div className="heading-container">
        <h1>
          <IconContext.Provider value={{ className: "shopping-cart-icon" }}>
            <MdShoppingCart />
          </IconContext.Provider>
          Grocery Checklist
        </h1>
      </div>
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          removeAlert={resetAlert}
        />
      )}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="item"
          className="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          Add
        </button>
      </form>
      {list.length > 0 && (
        <List list={list} handleDelete={handleDelete} handleEdit={handleEdit} />
      )}
    </>
  );
}

export default App;
