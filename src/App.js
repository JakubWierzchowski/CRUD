import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase-config";
import styled from "styled-components";

import Styles from "./css/App.module.css";
import { doc, deleteDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import Table from "./table";
import Koszyk from "./koszyk";
import SelectCategories from "./SelectCategories";

const Button = styled.button`
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
`;

const Input = styled.input`
  width: 80%;
  padding: 6px 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  margin: 10px 0;
  font-size: 20px;
`;

function AddnewPlayer() {
  const [users, setusers] = useState([{ name: "Loading...", id: "initial" }]);
  const [part, setPart] = useState("");
  const [firm, setFirm] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("Niezbędne");
  const playerCollectionRef = collection(db, "officeEq");
  const [shop, setShop] = useState("Niezbędne");

  const handleNew = async (e) => {
    e.preventDefault();
    await addDoc(playerCollectionRef, {
      part,
      firm,
      price,
      categories,
    });
  };
  useEffect(
    () =>
      onSnapshot(collection(db, "officeEq"), (snapshot) =>
        setusers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  // console.log(users.map((item) => item.categories));
  const x = users.map((item) => parseFloat(item.price));
  const sum = x.reduce((acc, el) => acc + el, 0);

  const handleDelete = async (id) => {
    const docRef = doc(db, "officeEq", id);
    await deleteDoc(docRef);
  };

  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.mainBackground}>
          {" "}
          <div className={Styles.flex}>
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

              <label className={Styles.label}>Kategoria</label>
              <SelectCategories setShop={setShop} />

              {part.length && firm.length !== 0 ? (
                <Button onClick={handleNew}>Wyślij</Button>
              ) : (
                <div>Uzupełnij dane</div>
              )}
            </form>
          </div>{" "}
          <div>
            <Table
              handleDelete={handleDelete}
              users={users}
              setusers={setusers}
              sum={sum}
              len={users.length}
              setShop={setShop}
              part={part}
              firm={firm}
              price={price}
              categories={categories}
            />
          </div>{" "}
          {console.log(part)}
          <div>
            <h2>Wybierz dla której karegori wyliczyć sume :</h2>
            <SelectCategories setShop={setShop} />
            <Koszyk
              users={users.filter((price) => price.categories === shop)}
              shop={shop}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default AddnewPlayer;
