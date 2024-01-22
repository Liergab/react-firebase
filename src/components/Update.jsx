/* eslint-disable react/prop-types */
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../config/firebase';


const Update = ({ movie, getMovie, setShowUpdateForm}) => {
  const [updateTitle, setUpdateTitle] = useState(movie?.title || '');
  const [updateReleaseDate, setUpdateReleaseDate] = useState(movie?.releaseDate || 0 );

  const handleUpdate = async () => {
    const movieDoc = doc(db, 'movies', movie?.id);
   
    try {
      await updateDoc(movieDoc, { title: updateTitle, releaseDate: updateReleaseDate });
      getMovie
      setShowUpdateForm(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Update</h1>
      <input
        type="text"
        placeholder="New title..."
        value={updateTitle}
        onChange={(e) => setUpdateTitle(e.target.value)}
        className="Button"
      />

      <input
        type="text"
        placeholder="New release date..."
        value={updateReleaseDate}
        onChange={(e) => setUpdateReleaseDate(e.target.value)}
        className="Button"
      />
      <button onClick={handleUpdate} className="bg-lime-700 px-4 py-2 border-solid border-2 rounded-md">
        Update
      </button>
    </>
  );
};

export default Update;