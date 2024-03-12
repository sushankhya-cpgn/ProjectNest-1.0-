import { useState } from "react";
import styles from "./Searchbar.module.css";

const data = [
  {
    id: 1,
    fullName: "ProjectNest",
  },
  {
    id: 2,
    fullName: "RentNRead",
  },
  { id: 3, fullName: "Pragati.Ai" },
];

function Searchbar() {
  const [value, setValue] = useState("");
  function onchange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function searchNow(item) {
    setValue(item.fullName);
  }
  return (
    <div className={styles.search}>
      <form className={styles.searchform} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search Projects"
          onChange={onchange}
          value={value}
        ></input>
      </form>
      <div className={styles.dropdown}>
        {data
          .filter((item) => {
            const searchTerm = value.toLowerCase();
            const fullName = item.fullName.toLowerCase();
            return searchTerm && fullName.includes(searchTerm);
          })
          .map((item) => (
            <div
              key={item.id}
              className={styles.datarow}
              onClick={() => searchNow(item)}
            >
              {item.fullName}
              <hr className={styles.hr} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Searchbar;
