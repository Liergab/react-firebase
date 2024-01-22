import React, { useEffect, useState } from 'react'
import './App.css'
import Register from './components/Register'
import { db, auth, storage } from './config/firebase'
import {getDocs, collection, addDoc, deleteDoc, doc} from 'firebase/firestore'
import Update from './components/Update'
import {ref, uploadBytes} from 'firebase/storage'
const App = () => {
  const [moviesList, setMoviesList] = useState([])

  // new movie state
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newMovieRelease, setNewMovieRelease]= useState(0)
  const [newMovieOscar, setNewMovieOscar] = useState(false)
// state for login in update
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  // state for storage
  const [fileUpload, setFileUpload] = useState(null)

  const collectionRef = collection(db, "movies")

  const getMovieList = async() => {
    try {
      const data = await getDocs(collectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), id:doc.id
      }))
      setMoviesList(filteredData)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
      getMovieList()
  },[])

    const onSubmitMovie = async() => {
      try {

        await addDoc(collectionRef, {
          title: newMovieTitle,
          releaseDate: newMovieRelease,
          recieveAnOscar: newMovieOscar,
          userId: auth?.currentUser?.uid
         })

         getMovieList()
         setNewMovieRelease("")
         setNewMovieTitle("")
       
      } catch (error) {
        console.error(error)
      }
    }

    const handleDelete = async(id) => {
      const movieDoc = doc(db, "movies", id)
      try {
        await deleteDoc(movieDoc)
        getMovieList()
      } catch (error) {
        console.log(error)
      }
    }

    const uploadFile = async() => {
      if(!fileUpload) return;
      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
      try {
        await uploadBytes(filesFolderRef, fileUpload)
      } catch (error) {
        console.error(error)
      }
    }
  


  return (
    <div className='h-screen w-full flex flex-col  items-center  text-left space-y-20'>
      <Register />
      <div className='flex items-center  gap-3'>

        <input 
          type="text" 
           placeholder='Title ..' 
           className='Button' 
           onChange={(e) => setNewMovieTitle(e.target.value)}
          />

        <input type="number" 
          placeholder='Date release .. '
          className='Button'
          onChange={(e) => setNewMovieRelease(Number(e.target.value))}
        />
        <input 
          type='checkbox' 
          className='Button'
          checked={newMovieOscar}
          onChange={(e) => setNewMovieOscar(e.target.checked)}
        />
        <label>Recieve an oscar</label>

        <button onClick={onSubmitMovie}>Submit movie</button>

      </div>

      <div className=''>
        <table className='table-auto'>
          <thead>
            <tr>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Creator</th>
              <th className='px-4 py-2'>Title</th>
              <th className='px-4 py-2'>Release Date</th>
              <th className='px-4 py-2'>Oscar Award</th>
              <th className='px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {moviesList.map((movie) => (
              <tr key={movie?.id}>
                <td className='px-4 py-2'>{movie?.id}</td>
                <td className='px-4 py-2'>{movie?.userId}</td>
                <td className='px-4 py-2'>{movie?.title}</td>
                <td className='px-4 py-2'>{movie?.releaseDate}</td>
                <td className='px-4 py-2'>{movie?.recieveAnOscar ? 'True' : 'False'}</td>
                {auth?.currentUser?.uid === movie?.userId &&
                <td className='px-4 py-2 
                  border-solid border-2
                 bg-red-800 rounded-md cursor-pointer' onClick={() =>handleDelete(movie?.id)}>Delete movie</td>}
                {auth?.currentUser?.uid === movie?.userId &&<td><button onClick={() => setShowUpdateForm(!showUpdateForm)}>
                  {showUpdateForm ? 'Cancel Update' : 'Update'}
                </button></td>  }
                {showUpdateForm && <Update movie={movie} getMovie={getMovieList()} setShowUpdateForm={setShowUpdateForm}/>}
              </tr>
            ))}
          </tbody>
       </table>
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  )
}

export default App