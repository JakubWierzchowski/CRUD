import React from "react";
import Styles from "../../App.module.css";

export default function Koszyk({ users, shop }) {
  const categoriesSum = users.map((item) => parseFloat(item.price));
  const sum = categoriesSum.reduce((acc, el) => acc + el, 0);

  return (
    <>
      <h2 className={Styles.h2}>
        Koszyk dla kategorii {shop} wynosi : {sum}$ dla ilości elementów :{" "}
        {users.length}.
      </h2>
    </>
  );
}
