import React from "react";
import { useNavigate } from "react-router-dom";


export function Homefn() {
    const history = useNavigate();

    return <div>
        <h1>Welcome to our page</h1>
        <h2>Make your e-business card</h2>
        <button
            style={{ padding: 10, margin: 10 }}
            onClick={() => history('/user-home')}
        >
            User
        </button>
        <button
            style={{ padding: 10, margin: 10 }}
            onClick={() => history('/admin-home')}
        >
            Admin
        </button>
    </div>;
}
