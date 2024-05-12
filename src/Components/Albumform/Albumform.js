import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./Albumform.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const [formData, setFormData] = useState({ albumName: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "album"), {
                albumName: formData.albumName,
                createdOn: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
            // Show success toast message
            toast.success('Album created successfully', { autoClose: 3000 });
            // Reset form data after successful submission
            setFormData({ albumName: "" });
        } catch (error) {
            console.error("Error adding document: ", error);
            // Show error toast message
            toast.error('Error creating album. Please try again later.', { autoClose: false });
        }
    }
    

    const handleClear = () => {
        setFormData({ albumName: "" });
    }

    return (
        <>
        <div className={styles.formContainer}>
            <h2>Create an Album</h2>
            <div className={styles.formContainer2}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input type="text" name="albumName" value={formData.albumName} onChange={(e) => setFormData({
                        albumName: e.target.value
                    })} placeholder="Album Name" required className={styles.inputField} />
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
                <button type="button" onClick={handleClear} className={styles.clearButton}>Clear</button>
            </div>
        </div>
        <ToastContainer />
        </>
    );
}

export default Form;
