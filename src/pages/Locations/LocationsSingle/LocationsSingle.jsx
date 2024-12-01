/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import ls from '../LocationsSingle/LocationsSingle.module.css'
import c from '../../Characters/Characters.module.css'
import GoBack from '../../../assets/GoBack.svg'
const LocationsSingle = () => {
        const params = useParams()
        console.log(params);
        const [characters, setCharacters] = useState([])
        const [location, setLocation] = useState('')
        useEffect(() => {
          const getData = async () => {
            const result = await fetch(`https://rickandmortyapi.com/api/location/${params.id}`)
            const dataJson = await result.json()
            setLocation(dataJson)
          const characterData = await Promise.all(dataJson.residents.map((url) => fetch(url).then((res) => res.json()))
        )
            setCharacters(characterData)
      
          }
          getData()
        }, [params.id])
  return (
    
    <>
    <div>
    <Link to={'/locations/'}>
        <img src={GoBack} alt="" className={ls.back__button}/>
        </Link>
        <h1 className={ls.title}>{location.name}</h1>
        <div className={ls.container}>
            <div className={ls.subtitles}>
            <p>Type</p>
            <p>Dimension</p>
            </div>
            <div className={ls.subres}>
            <p>{location.type}</p>
            <p>{location.dimension}</p>
            </div>
        </div>
        <h2 className={ls.subtitle}>Residents</h2>
        <div className={c.container}>
          {characters.map((residents) => (
            <Link to={`/character/${residents.id}`} key={residents.id} className={c.container__item}>
              <div>
                <img src={residents.image} alt="" className={c.Charac__img}/>
                <div className={c.block__name}>
                <p className={c.title}>{residents.name}</p>
                <p className={c.subtitle}>{residents.status} - {residents.species}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
    </>
  )
}

export default LocationsSingle