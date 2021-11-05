import React from 'react';
import Button from '@mui/material/Button';
const ButtonContainer = ({color, text, type, onClickHandler}) => {
    return (
        <div>
            {type === "submit"
            ?
            <Button variant="contained" color={color} type={type}>{text}</Button>
            :
            <Button variant="contained" color={color} type={type} onClick={() => onClickHandler()}>{text}</Button>
            }
        </div>
        
    );
};

export default ButtonContainer;