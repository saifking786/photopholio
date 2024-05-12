import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs,query,doc,onSnapshot,deleteDoc,where } from 'firebase/firestore';
import { db } from '../../firebase';
import ImageForm from '../ImageForm/Imageform'; // Correct import path
import styles from './Imagelist.module.css'; // Correct import path
import backicon from '../../back.png';
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import Edit from "../../pencil.png";
import Delete from "../../delete-account.png";

function ImageList({ selectedAlbumId, onBack }) {
  const [images, setImages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [id, setId] = useState(null);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
 
  useEffect(() => {
    const fetchImages = async () => {
      const unsubscribe = onSnapshot(collection(db, `album/${selectedAlbumId}/albumPhoto`), (snapshot) => {
        const imageList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imageList);
      });
      return () => unsubscribe();
    };

    fetchImages();
  }, [selectedAlbumId]);

  const handleFormToggle = () => {
    setShowForm(!showForm);
    setEditData(null); // Reset edit data when toggling the form
  };

  const onSearch = async (e) => {
    e.preventDefault();
    console.log("kys",search);
    const q = query(collection(db, `album/${selectedAlbumId}/albumPhoto`), where('PhotoName', '==', search));
    const querySnapshot = await getDocs(q);
    const newimageList = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      newimageList.push({
        id: doc.id,
        ...doc.data(),
      });
      });
      setImages(newimageList); 
    setToggle(true);
  };
  
  
  const edit = async (id) => {
    const docRef = doc(db, `album/${selectedAlbumId}/albumPhoto`, id);
    const docSnap = await getDoc(docRef);
    setEditData(docSnap.data());
    setId(id);
    setShowForm(true); // Show form when editing
  };

  async function removeI(id) {
    try {
      const docRef = doc(db, `album/${selectedAlbumId}/albumPhoto`, id);
      await deleteDoc(docRef);
      toast.success('Image deleted successfully'); // Display success message
    } catch (error) {
      console.error('Error deleting image: ', error);
      toast.error('An error occurred while deleting the image'); // Display error message
    }
  }

  // const handleBack = () => {
  //   setToggle(!toggle);
  //   setSearch("");
  // };

  const filteredImages = images.filter((image) =>
    image.PhotoName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* {toggle ? (
        <button className={styles.searchButton} onClick={handleBack}>Search</button>
      ) : ( */}
        <form onSubmit={onSearch} className={styles.searchForm}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            className={styles.searchInput}
          />
          {/* <button className={styles.searchButton} type="submit">Search</button> */}
        </form>
         {/* )} */}
         {toggle && (
         <div className={styles.albumWrapper}>
              {images.map(image => (
                <div key={image.id} className={styles.albumBox}>
                  <img src={image.PhotoUrl} alt={image.PhotoName} className={styles.albumImage} />
                  <h2 className={styles.albumTitle}>{image.PhotoName}</h2>
                  <div className={styles.buttons}>
                    <div className={styles.edit} onClick={() => edit(image.id)}>
                      <img src={Edit}  alt="Edit" />
                    </div>
                    <div className={styles.delete} onClick={() => removeI(image.id)}>
                      <img src={Delete} alt="Delete" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
      
      {!toggle && (
        <div className={styles.but_back}> 
          <button onClick={onBack} className={styles.backBig}>
            <img src={backicon} alt="Book Icon" className={styles.back} />
          </button>
          <div className={styles.buttonSpacer}></div>
          <button onClick={handleFormToggle} className={styles.but}>
            {showForm ? "Hide Form" : "Add Image"}
          </button>
          {showForm && <ImageForm selectedAlbumId={selectedAlbumId} data={editData} id={id} handleFormToggle={handleFormToggle}/>}
        </div>
      )}

      {!toggle && ( 
        <div>
          {filteredImages.length === 0 ? (
            <h1 style={{ textAlign: 'center', fontFamily: "'Courier New', Courier, monospace", margin: 'auto' }}>No images to display.</h1>
          ) : (
            <div className={styles.albumWrapper}>
              {filteredImages.map(image => (
                <div key={image.id} className={styles.albumBox}>
                  <img src={image.PhotoUrl} alt={image.PhotoName} className={styles.albumImage} />
                  <h2 className={styles.albumTitle}>{image.PhotoName}</h2>
                  <div className={styles.buttons}>
                    <div className={styles.edit} onClick={() => edit(image.id)}>
                      <img src={Edit}  alt="Edit" />
                    </div>
                    <div className={styles.delete} onClick={() => removeI(image.id)}>
                      <img src={Delete} alt="Delete" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ImageList;

