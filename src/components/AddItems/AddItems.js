import React from "react";
import Styles from "../../App.module.css";
import {
  CompleteData,
  FlexContainer,
  Input,
  Button,
  H1,
} from "./AdditemsStyle";

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
        <H1 className={Styles.h1}>Rzeczy do kupienia : </H1>
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
        <label>Kategoria</label>
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
