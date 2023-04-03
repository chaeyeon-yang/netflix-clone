import React, { useEffect, useState } from "react";
import "./Nav.css";

export default function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        // console.log("window scrollY", window.scrollY);
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                handleShow(true);
            } else {
                handleShow(false);
            }

            return () => {
                window.removeEventListener("scroll", () => {});
            };
        });
    });

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img
                alt="Netflix logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/440px-Netflix_2015_logo.svg.png"
                className="nav__logo"
                onClick={() => window.location.reload()}
            />
            <img
                alt="User logged"
                src="https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg"
                className="nav__avatar "
            />
        </nav>
    );
}
