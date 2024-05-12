import React from "react";
import styles from './navbar.module.css';
import bookIcon from '../book-icon.png'; // Import the book icon image

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarList}>
                {/* Display the book icon */}
                <li className={styles.navbarItem}>
                    <img src={bookIcon} alt="Book Icon" className={styles.icon} />
                </li>
                <li className={styles.navbarItem}>PhotoFolio</li>
            </ul>
        </nav>
    );
};

export default Navbar;
