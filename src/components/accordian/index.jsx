import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);

  function handleSingleSelection(getCurrectId) {
    setSelected(getCurrectId === selected ? null : getCurrectId);
  }

  console.log(selected);

  return (
    <div className="acc-wrapper ">
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={() => handleSingleSelection(dataItem.id)}
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {selected === dataItem.id ? (
                <div className="acc-content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data founded!</div>
        )}
      </div>
    </div>
  );
}
