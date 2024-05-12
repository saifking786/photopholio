import React from 'react';
import styles from "./App.module.css";
import Navbar from './Navbar/navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Albumlist from './Components/Albumlist/Albumlist';

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <div className={styles.content}>
        <Albumlist />
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default App;

