import React from "react";
import { Link } from "react-router-dom";

import '../styles/components/EditButton.css'

import edit from '../assets/edit.png'


function EditButton(props) {

    const { postId } = props;
    return(
        <Link to={`/edit/${postId}`}><img src={edit} alt='edit icon' className='edit-icon' /></Link>
    )
        
}

export default EditButton;