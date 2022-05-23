import React, { useReducer } from "react";
import { FlexContainer, Input, Button, H1 } from "./AdditemsStyle";
import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase-config";
import SelectCategories from "../SelectCategories/SelectCategories";
import Table from "../Table/Table";
import FormField from "../molecules/FormField/FormField";

const initialValue = {
  part: "",
  firm: "",
  price: "",
  categories: "Niezbędne",
  // checkbox: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT CHANGE":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "CLEAR VALUES":
      return initialValue;
    // case "CHECKBOX":
    //   return {
    //     ...state,
    //     checkbox: !state.checkbox,
    //   };
    case "ERROR":
      return {
        ...state,
        error: action.errorValue,
      };

    default:
      return state;
  }
};

export default function AddItems({}) {
  const playerCollectionRef = collection(db, "officeEq");

  const [formValues, dispatch] = useReducer(reducer, initialValue);

  const handleInputChange = (e) => {
    dispatch({
      type: "INPUT CHANGE",
      field: e.target.name,
      value: e.target.value,
    });
  };
  const handleNew = async (e) => {
    e.preventDefault();
    await addDoc(playerCollectionRef, {
      ...formValues,
    });
    dispatch({ type: "CLEAR VALUES" });
    // dispatch({ type: "ERROR", errorValue: "Uzupełnij cos!" });
  };
  return (
    <>
      <FlexContainer>
        <form onSubmit={handleNew}>
          <H1>Rzeczy do kupienia: </H1>
          <FormField
            label="Nazwa"
            id="part"
            name="part"
            value={formValues.part}
            onChange={handleInputChange}
            placeholder="Procesor, obudowa, głosniki itp"
            type="text"
          />

          <FormField
            placeholder="Firma"
            onChange={handleInputChange}
            value={formValues.firm}
            name="firm"
            id="firm"
            label="Firma"
            type="text"
          />
          <FormField
            placeholder="Cena"
            onChange={handleInputChange}
            value={formValues.price}
            name="price"
            id="price"
            label="Cena"
            type="number"
            min="0"
            oninput="validity.valid||(value='');"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <label>Kategoria</label>
          <SelectCategories
            handleInputChange={handleInputChange}
            value={formValues.categories}
            name="categories"
          />
          {/* <label>Akceptuję politykę prywatności</label> */}
          {/* <Input
            type="checkbox"
            handleInputChange={() => dispatch({ type: "CHECKBOX" })}
            value={formValues.checkbox}
            name="checkbox"
          /> */}
          {/* {formValues.error ? <p>{formValues.error}</p> : null} */}

          <Button
            type="submit"
            disabled={
              !formValues.part.length ||
              !formValues.firm.length ||
              !formValues.price.length
            }
          >
            Wyślij
          </Button>
        </form>
      </FlexContainer>
      <div>
        <Table {...formValues} />
      </div>
    </>
  );
}
