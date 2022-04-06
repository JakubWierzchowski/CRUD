import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase-config";

import Styles from "./App.module.css";
import { doc, deleteDoc } from "firebase/firestore";
import Table from "./components/table/table";
import CategoriesSum from "./components/CategoriesSum/CategoriesSum";
import SelectCategories from "./components/SelectCategories/SelectCategories";
import AddItems from "./components/AddItems/AddItems";

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
          />
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
            <CategoriesSum
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
