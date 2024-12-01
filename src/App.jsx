/* eslint-disable no-unused-vars */
import React from 'react'
import Header from './components/Header/Header'
import Characters from './pages/Characters/Characters'
import Episodes from './pages/Episodes/Episodes'
import { Route, Routes } from 'react-router-dom'
import Error from './assets/pickle.png'
import LoadingSpinner from './components/Loading/Loading'
import { useNavigate } from 'react-router-dom'
import CharactersSingle from './pages/Characters/CharactersSingle/CharactersSingle'
import Locations from './pages/Locations/Locations'
import EpisodeSingle from './pages/Episodes/EpisodeSingle/EpisodeSingle'
import { useState, useEffect } from 'react'
import { UserContext } from './components/userContext/userContext'
import LocationsSingle from './pages/Locations/LocationsSingle/LocationsSingle'
const App = () => {
  const [data, setData] = useState([])
  const providerData = {
    onChange: setData,
    poducts:data
    
  }
  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(true);
      setTimeout(()=>{
        isLoading(false)
      }, 300)
    };
    const handleLoad = () => {
      setIsLoading(false);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  {isLoading && <LoadingSpinner />}
  return (
    <>
      <Header />
    <UserContext.Provider value={providerData}>
      <Routes>
        <Route path={'/'} element={<Characters />} />
        <Route path={'/episodes'} element={<Episodes />} />
        <Route path={'/locations'} element={<Locations />} />
        <Route path={'/character/:id'} element={<CharactersSingle />} />
        <Route path={'/episodes/:id'} element={<EpisodeSingle/>}/>
        <Route path={'/location/:id'} element={<LocationsSingle/>}/>
      </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
