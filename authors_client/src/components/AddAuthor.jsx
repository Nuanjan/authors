import React, { useState } from 'react';
import AuthorFormContainer from './AuthorFormContainer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddAuthor = ({authorList, setAuthorList}) => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("")
    const createAuthor = author => {
        axios.post("http://localhost:8000/new", author)
        .then((res) => {
            console.log(res, " this is res")
            const tempArr = [...authorList, res.data.author]
            tempArr.sort((a,b) => (a.name > b.name)? 1 : ((b.name > a.name)? -1: 0))
            setAuthorList(tempArr)
            setErrMsg("")
            navigate("/")
        })
        .catch((err) => {
            console.log("error", err.response.data.message)
            setErrMsg(err.response.data.message)
        })
  }

    return (
        <div>
            <a href={"/"}>Home</a>
            <p>Add a new author:</p>
            <AuthorFormContainer onAuthorSubmit={createAuthor} initialAuthor={{name: ""}} errMsg={errMsg}/>
        </div>
    );
};

export default AddAuthor;