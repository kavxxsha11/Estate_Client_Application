import React, { useRef } from "react";
import navCSS from './../Nav/Nav.module.css'

function Nav() {

    const Menu = useRef();

    const Menuhandler = () => {
        Menu.current.classList.toggle(navCSS.showNav);
    }



    return (
        <div className={`${navCSS.Nav_wrapper}`}>
            <div className={navCSS.logo}>
                <a href="#">Home4u</a>
            </div>

            <ul ref={Menu}>
                <li><a href="#">Home</a></li>
                <li><a href="#">Advantage</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Location</a></li>
                <li><a href="#">New Listning</a></li>
                <li><a href="#">Agents</a></li>
                <li><a href="#">Estimate</a></li>
                <li><a href="#">Contact</a></li>
            </ul>

            <div className={navCSS.nav_btns}>
                <button>Login</button>
                <button>Add Listing</button>
                <i className="ri-menu-2-line" id={navCSS.bars} onClick={Menuhandler}></i>
            </div>


        </div>
    )
}

export default Nav;