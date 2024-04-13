import React, { useState, useEffect } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            setIsDarkMode(true);
            document.querySelector("body").setAttribute("data-theme", "dark");
        }
    }, []);

    const setDarkMode = () => {
        setIsDarkMode(true);
        document.querySelector("body").setAttribute("data-theme", "dark");
        localStorage.setItem("darkMode", "true");
    };

    const setLightMode = () => {
        setIsDarkMode(false);
        document.querySelector("body").setAttribute("data-theme", "light");
        localStorage.setItem("darkMode", "false");
    };

    const toggleTheme = () => {
        if (isDarkMode) {
            setLightMode();
        } else {
            setDarkMode();
        }
    };

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                checked={isDarkMode}
                onChange={toggleTheme}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
