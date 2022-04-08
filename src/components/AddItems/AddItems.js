import React from "react";
import Styles from "../../App.module.css";
import styled from "styled-components";

const Button = styled.button`
  background-color: rgba(18, 178, 7, 0.744);
  width: 100%;
  border-radius: 10px;
  text-align: center;
  padding: 6px 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  margin: 10px 0;
  font-size: 20px;
  @media (max-width: 768px) {
    width: 90%;
    font-size: 12px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  margin: 10px 0;
  font-size: 20px;
  @media (max-width: 768px) {
    width: 90%;
    font-size: 12px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin: 40px auto;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  background-color: rgb(240, 243, 245);
  width: 500px;
  @media (max-width: 768px) {
    width: 80%;
    font-size: 12px;
    padding: 10px;
  }
`;
const CompleteData = styled.div`
  background-color: rgba(253, 7, 7, 0.704);
  width: 100%;
  border-radius: 10px;
  text-align: center;
  padding: 6px 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  margin: 10px 0;
  font-size: 20px;
  @media (max-width: 768px) {
    width: 90%;
    font-size: 12px;
  }
`;

export default function AddItems({
  setPart,
  setFirm,
  setPrice,
  SelectCategories,
  part,
  price,
  firm,
  handleNew,
  setCategories,
}) {
  return (
    <FlexContainer>
      <form>
        <h1 className={Styles.h1}>Rzeczy do kupienia : </h1>
        <label>Nazwa jednostki </label>
        <Input
          placeholder="Procesor, obudowa, głosniki itp"
          onChange={(event) => setPart(event.target.value)}
          required
        />
        <label>Dane szczegółowe</label>
        <Input
          placeholder="Firma i model produktu"
          onChange={(event) => setFirm(event.target.value)}
          required
        />
        <label>Cena</label>
        <Input
          placeholder="Cena"
          onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
          onChange={(event) =>
            setPrice(
              event.target.value < 0
                ? alert("Nie można wpisać ujemnej ceny")
                : event.target.value
            )
          }
          required
          type="number"
          min="0"
          oninput="validity.valid||(value='');"
        />
        <label className={Styles.label}>Kategoria</label>{" "}
        <SelectCategories selectCategory={setCategories} />
        {part.length && firm.length && price.length !== 0 ? (
          <Button onClick={handleNew}>Wyślij</Button>
        ) : (
          <CompleteData>Uzupełnij dane</CompleteData>
        )}
      </form>
    </FlexContainer>
  );
}
