import React from "react";

export default function Koszyk({ users, shop }) {
  const categoriesSum = users.map((item) => parseFloat(item.price));
  const sum = categoriesSum.reduce((acc, el) => acc + el, 0);

  return (
    <>
      <h2>
        Koszyk dla kategorii {shop} wynosi : {sum}$ dla ilości elementów :{" "}
        {users.length}
      </h2>
    </>
  );
}
