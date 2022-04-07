import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase-config";

import Styles from "./App.module.css";
import { doc, deleteDoc } from "firebase/firestore";
import Table from "./components/Table/Table";
import CategoriesSum from "./components/CategoriesSum/CategoriesSum";
import SelectCategories from "./components/SelectCategories/SelectCategories";
import AddItems from "./components/AddItems/AddItems";

function AddITComponents() {
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

  const parseFloatItemPrice = users.map((item) => parseFloat(item.price));
  const sumItem = parseFloatItemPrice.reduce((acc, el) => acc + el, 0);

  const handleDelete = async (id) => {
    const docRef = doc(db, "officeEq", id);
    await deleteDoc(docRef);
  };

  const filterCategorySum = users.filter((price) => price.categories === shop);
  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.mainBackground}>
          <AddItems
            setPart={setPart}
            setFirm={setFirm}
            setPrice={setPrice}
            SelectCategories={SelectCategories}
            setShop={setShop}
            part={part}
            firm={firm}
            handleNew={handleNew}
            price={price}
            setCategories={setCategories}
          />
          <div>
            <Table
              handleDelete={handleDelete}
              users={users}
              setusers={setusers}
              sumItem={sumItem}
              len={users.length}
              setShop={setShop}
              part={part}
              firm={firm}
              price={price}
              categories={categories}
            />
          </div>
          <div>
            <h2>Wybierz dla której karegori wyliczyć sume :</h2>
            <SelectCategories selectCategory={setShop} />
            <CategoriesSum
              users={filterCategorySum}
              shop={shop}
              sumItem={sumItem}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default AddITComponents;
