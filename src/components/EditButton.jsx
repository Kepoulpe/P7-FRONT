import React from "react";
import { Link } from "react-router-dom";

import '../styles/components/EditButton.css'

import edit from '../assets/edit.png'


function EditButton(props) {

    const { isCreator, postId } = props;
    // isCreator ? 
    return (

        <Link to={`edit/${postId}`}><img src={edit} alt='edit icon' className='edit-icon' /></Link>
    )
    // ) :
    //     <span></span>
}

export default EditButton;