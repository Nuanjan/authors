import React, {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ButtonContainer from './ButtonContainer';
import { useNavigate } from 'react-router-dom';
const boxStyle={
    width: "50%",
    margin: '2rem auto',
    padding: "1rem",
    border: "solid 1px grey"

}
const buttonContainerStyle={
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly"
}
const errStyle={
    color: "red"
}
const AuthorFormContainer = ({onAuthorSubmit, initialAuthor, errMsg, cancelClick}) => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
       name: initialAuthor.name
    })
    const onAuthorSubmitHandler = (e) => {
        e.preventDefault();
        onAuthorSubmit(input)
        if(input.name.length > 3){
            navigate("/")
        }
    }

const onClickCancel=() => {
    navigate("/")
}
    return (
        <form style={boxStyle} onSubmit={onAuthorSubmitHandler}>
        <FormControl sx={{ width: '25ch' }} > 
            <TextField
            id="name"
            name="name"
            value={input.name}
            label="name"
            onChange={(e) => setInput({...input, [e.target.name]: e.target.value})}
            sx={{mb: '20px'}}
            />
            {errMsg&& <p style={errStyle}>{errMsg}</p>}
            <div style={buttonContainerStyle}>
                <ButtonContainer type="submit" color={"secondary"} text={"Cancel"} type={"button"} onClickHandler={onClickCancel}/>
                <ButtonContainer type="button" color={"primary"} text={"Submit"} type={"submit"}/>
            </div>
            </FormControl>
            </form>
    );
};

export default AuthorFormContainer;