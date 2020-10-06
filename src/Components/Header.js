import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
function Header(){
    return (
        <header class="header-login-signup">
            <div class="header-limiter">
                <h1><a href="/">StudyFind</a></h1>
                <ul>
                    <li><Link to="/login">Log in</Link></li>
                    <li><Link to="/signup">Sign up</Link></li>
                </ul>
            </div>

        </header>
    )
}
export default Header