import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, setDoc ,getDoc} from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./Imageform.module.css";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

const ImageForm = ({ selectedAlbumId, data, id, handleFormToggle }) => {
  const [formData, setFormData] = useState({ PhotoName: "", PhotoUrl: "" });
  const [album, setAlbumname] = useState("");
  const [updateForm, setUpdateForm] = useState({ PhotoName: "", PhotoUrl: "" }); // Update form state
  
  useEffect(() => {
    const fetchAlbum = async () => {
      // Fetch album details
      try {
        const docRef = doc(db, `album/${selectedAlbumId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAlbumname(docSnap.data().albumName);
        }
      } catch (error) {
        console.error("Error fetching album: ", error);
      }
    };
    fetchAlbum();
  }, [selectedAlbumId]);

  useEffect(() => {
    // Populate updateForm with data from props when data changes
    if (data) {
      setUpdateForm({
        PhotoName: data.PhotoName,
        PhotoUrl: data.PhotoUrl,
      });
    }
  }, [data]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!data) {
        // Add new image
        const docRef = await addDoc(collection(db, `album/${selectedAlbumId}/albumPhoto`), {
          PhotoName: formData.PhotoName,
          PhotoUrl: formData.PhotoUrl,
          createdOn: new Date(),
        });
        toast.success("Image added successfully"); // Display success message
        console.log("Document written with ID: ", docRef.id);
      } else {
        // Update existing image
        await setDoc(doc(db, `album/${selectedAlbumId}/albumPhoto`, id), {
          PhotoName: updateForm.PhotoName,
          PhotoUrl: updateForm.PhotoUrl,
          createdOn: new Date(),
        });
        toast.success("Image updated successfully"); // Display success message
      }
      setFormData({ PhotoName: "", PhotoUrl: "" }); // Reset form data
      handleFormToggle();
    } catch (error) {
      console.error("Error adding/editing document: ", error);
      toast.error("An error occurred"); // Display error message
    }
  };

  const handleClear = () => {
    setFormData({ PhotoName: "", PhotoUrl: "" });
  };

  return (
    <>
            {!data && (
              <div className={styles.formContainer}>
                <h2>Add image to {album}</h2>
                <div className={styles.formContainer2}>
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="PhotoName"
                      value={formData.PhotoName}
                      onChange={(e) => setFormData({ ...formData, PhotoName: e.target.value })}
                      placeholder="Title"
                      required
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="PhotoUrl"
                      value={formData.PhotoUrl}
                      onChange={(e) => setFormData({ ...formData, PhotoUrl: e.target.value })}
                      placeholder="Image URL"
                      required
                      className={styles.inputField}
                    />
                    <button type="submit" className={styles.submitButton}>
                      Submit
                    </button>
                  </form>
                  <button type="button" onClick={handleClear} className={styles.clearButton}>
                    Clear
                  </button>
                </div>
              </div>
            )}
            {data && (
              <div className={styles.formContainer}>
                <h2>Edit image in {album}</h2>
                <div className={styles.formContainer2}>
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="PhotoName"
                      value={updateForm.PhotoName} // Use updateForm here
                      onChange={(e) => setUpdateForm({ ...updateForm, PhotoName: e.target.value })} // Update updateForm
                      placeholder="Title"
                      required
                      className={styles.inputField}
                    />
                    <input
                      type="text"
                      name="PhotoUrl"
                      value={updateForm.PhotoUrl} // Use updateForm here
                      onChange={(e) => setUpdateForm({ ...updateForm, PhotoUrl: e.target.value })} // Update updateForm
                      placeholder="Image URL"
                      required
                      className={styles.inputField}
                    />
                    <button type="submit" className={styles.submitButton}>
                      Submit
                    </button>
                  </form>
                  <button type="button" onClick={handleClear} className={styles.clearButton}>
                    Clear
                  </button>
                </div>
              </div>
            )}
          </>
  );
};

export default ImageForm;
