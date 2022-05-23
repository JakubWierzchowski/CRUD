import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase-config";
import { H2 } from "./components/CategoriesSum/CategoriesSum";

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

  const [shop, setShop] = useState("Niezbędne");

  const parseFloatItemPrice = users.map((item) => parseFloat(item.price));
  const sumItem = parseFloatItemPrice.reduce((acc, el) => acc + el, 0);

  const filterCategorySum = users.filter((price) => price.categories === shop);
  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.mainBackground}>
          <AddItems SelectCategories={SelectCategories} setShop={setShop} />

          {/* <div>
            <H2 className={Styles.h2}>
              Wybierz dla której karegori wyliczyć sume :
            </H2>
            <SelectCategories selectCategory={setShop} />
            <CategoriesSum
              users={filterCategorySum}
              shop={shop}
              sumItem={sumItem}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
export default AddITComponents;
