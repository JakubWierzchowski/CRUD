import React from "react";
import styled from "styled-components";
export const H2 = styled.h2`
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 425px) {
    font-size: 12px;
  }
`;
export default function Koszyk({ users, shop }) {
  const categoriesSum = users.map((item) => parseFloat(item.price));
  const sum = categoriesSum.reduce((acc, el) => acc + el, 0);

  return (
    <>
      <H2>
        Koszyk dla kategorii {shop} wynosi : {sum}$ dla ilości elementów :{" "}
        {users.length}.
      </H2>
    </>
  );
}
