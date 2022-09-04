import React from 'react';
import { Navigate } from 'react-router-dom';

import HomeBanner from '../components/HomeBanner';

function Home (props) { 
    const {isAuthed} = props;
    return isAuthed ? (
        <div>
            <HomeBanner />
        </div>
    ) : (<Navigate replace to={"login"}/>)
}

export default Home;