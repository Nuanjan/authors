import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import AuthorFormContainer from './AuthorFormContainer';

const EditAuthor = ({authorList, setAuthorList}) => {
   const {state} = useLocation();
   const navigate = useNavigate();
   // Put state into the function in case of state == null(mean wrong id or id this not come from author list)
   // so it will return undefined
   // other white it will get error before render the component
   const getIdandName = (state) => {
       if(state){
           return state
       }
       return typeof state;
   }
   const {_id, name} = getIdandName(state);
   console.log(_id, name)
   const [author, setAuthor] = useState({name:name})
   const [errMsg, setErrMsg] = useState("")
   useEffect(() => {
       if(!_id){
           navigate("error")
       }
   })
   const updateAuthorName = author => {
        axios.put("http://localhost:8000/edit/"+_id, author)
        .then((res) => {
            const tempArr = authorList.map(el => el._id === res.data._id ? {...el, name:res.data.name}: el)
            tempArr.sort((a,b) => (a.name > b.name)? 1 : ((b.name > a.name)? -1: 0))
            setAuthorList(tempArr)
        })
        .catch((err) => {setErrMsg(err.response.data.message)});
}
    return (
        <div>
            <a href={"/"}>Home</a>
            <p>Edit exist author:</p>
            <AuthorFormContainer onAuthorSubmit={updateAuthorName} initialAuthor={author} errMsg={errMsg}/>
        </div>
    );
};

export default EditAuthor;