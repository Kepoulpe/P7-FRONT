import React from 'react';
import { Navigate } from 'react-router-dom';

import FormNewPost from "../components/FormNewPost"

function CreateNewPost(props) {
    const {isAuthed} = props;

    return isAuthed ? (
        <section>
            <FormNewPost />
        </section>
    ) : (<Navigate replace to={"/login"} />)
};

export default CreateNewPost;