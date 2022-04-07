### Opis projektu

Aplikacja składa się z operacji CRUD umożliwiających dodawanie, usuwanie oraz edycje komponentów z wykorzystaniem firestore database(firebase). W projekcie zostały zainstalowane 4 biblioteki :     
1. "jspdf": "^2.5.1", 
2. "jspdf-autotable": "^3.5.23",     
3. "react-beautiful-dnd": "^13.1.0",    
4. "styled-components": "^5.3.5".

Pierwsze dwie pozwalają na exportowanie stworzonej tabeli do pliku pdf, trzecia umożliwia użycie drag and drop na produktach zawartych w tabeli oraz czwarta odpowiada za stylowanie w plikach js. W projekcie można znaleźć również filtrowanie po kategoriach oraz sortowanie alfabetyczne po kliknięciu w nagłówek tabeli. Aby wszystko działało należy wgrać swoj firebaseConfig oraz zmienić firestore/rules znajdującym się w nowo utworzonym projekcie firebase na : allow read, write: if true;

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
