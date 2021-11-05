import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAuthor from "./components/AddAuthor";
import EditAuthor from "./components/EditAuthor";
import AuthorList from "./components/AuthorList";
import Error from "./components/Error";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [authorList, setAuthorList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/").then((res) => {
      setAuthorList(
        res.data.authors.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        )
      );
      setIsLoaded(true);
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Favorite Authors</h1>
        <Routes>
          <Route
            path=""
            element={
              <AuthorList
                authorList={authorList}
                setAuthorList={setAuthorList}
              />
            }
          />
          <Route
            path="new"
            element={
              <AddAuthor
                authorList={authorList}
                setAuthorList={setAuthorList}
              />
            }
          />
          <Route
            path="edit/:id"
            element={
              <EditAuthor
                authorList={authorList}
                setAuthorList={setAuthorList}
              />
            }
          />
          <Route path="edit/:id/error" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
