// Albumlist.jsx

import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Form from "../Albumform/Albumform";
import Gallery from "../../gallery.png";
import ImageList from "../ImageList/Imagelist";
import styles from "./Albumlist.module.css";

const Albumlist = () => {
    const [albums, setAlbums] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "album"), (snapshot) => {
            const updatedAlbums = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setAlbums(updatedAlbums);
        });
        return () => unsubscribe();
    }, []);

    const handleFormToggle = () => {
        setShowForm(!showForm);
    };

    const handleViewAlbum = (id) => {
        console.log("Viewing album:", id);
        setSelectedAlbumId(id);
         // Set the selected album ID
    };
    const handleBack = () =>  setSelectedAlbumId(null);;
    return (
        <div className={styles.albumContainer}>

            {!selectedAlbumId && (
                <>
                    <button onClick={handleFormToggle} className={styles.but}>{showForm ? "Hide Form" : "Add Album"}</button>
                    {showForm && <Form />}
                    <h1 className={styles.h1style}>Your Albums</h1>
                    <div className={styles.albumWrapper}>
                        {albums.map((album) => (
                            <div key={album.id} className={styles.albumBox} onClick={() => handleViewAlbum(album.id)}>
                                <img src={Gallery} alt={album.title} className={styles.albumImage} />
                                <h2 className={styles.albumTitle}>{album.albumName}</h2>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {selectedAlbumId && <ImageList selectedAlbumId={selectedAlbumId} onBack={handleBack} />}
        </div>
    );
};

export default Albumlist;
