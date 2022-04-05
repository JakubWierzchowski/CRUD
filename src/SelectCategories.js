import React from "react";
import Styles from "./css/App.module.css";

export default function SelectCategories({ setShop }) {
  return (
    <>
      {" "}
      <select
        className={Styles.select}
        onChange={(event) => setShop(event.target.value)}
      >
        <option className={Styles.option} value="Niezbędne">
          Niezbędne do działania komputera
        </option>
        <option value="Audio">Audio</option>
        <option value="Video">Video</option>
        <option value="Inne">Inne</option>
      </select>
    </>
  );
}
