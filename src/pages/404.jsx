import React from "react";
import { Link } from "react-router-dom";


function NotFoundPages() {
    return (
        <section>
            <h1> ERREUR 404</h1>
            <p>Cette page n'existe pas</p>
            <Link to="/">Retourner a la page d'accueil</Link>
        </section>

    )
}

export default NotFoundPages;