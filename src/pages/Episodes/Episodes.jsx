/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import ep from '../Episodes/Episodes.module.css'
import Logo from '../../assets/episodes_logo.svg'
import Magnifer from '../../assets/Vector (2).svg'
import ErrorPincle from '../../assets/pickle.png'
import { Link } from 'react-router-dom'
const Episodes = () => {
  const [page, setPage] = useState(1)
  const [air_date, setAirDate] = useState('')
  const [filter, setFilter] = useState('')
  const [data, setData] = useState([])
  const [isError, setError] = useState(false)
  const [name, setName] = useState('')
  const [episode, setEpisode] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      setTimeout(() => {
        setLoading(false)
      }, 900)
      try {
        setError(false)
        const result = await fetch(`
          https://rickandmortyapi.com/api/episode/?page=${page}&name=${name}&episodes=${episode}&air_date=${air_date}`)
          if (!result.ok) {
            return setError(true)
          }
        const resultJson = await result.json()
        setData(resultJson.results)
      } catch (e) {
        console.log('error');
        setError(true)
      }
    }
    getData()
  }, [name, episode, air_date, page])
  if (loading) {
    return <div  className={ep.loading}><img src='https://raw.githubusercontent.com/Anixii/Rick-Morty/0280b2bdadb018eeb04bf110c975c2f0238073f5/app/assets/img/91%20(1).svg'
     alt=""/></div>
  }
  const onHandleNextPage = () => {
    setPage(page + 1)
  }
  
  return (
    <>
      <div className={ep.Logo}><img src={Logo} alt="" /></div>
      <div className={ep.Input}>
        <div className={ep.filter__inp}>
          <img src={Magnifer} alt="" />
          <input type="text" placeholder='Filter by name or episode (ex. S01 or S01E02)' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className={ep.container}>
        {isError ? (
          <><div className={ep.error__picle}>
            <img src='https://github.com/Anixii/Rick-Morty/blob/main/app/assets/img/pngegg.png?raw=true' alt="" className={ep.pickle} />
          </div><div className={ep.error_title}>
              <h1>No Data!</h1>
            </div></>
        ) : (
          data.map((item, index) => (
            <Link to={`/episodes/${item.id}`} key={index} className={ep.container__item}>
              <h5>{item.name}</h5>
              <p>{item.episode}</p>
              <h3>{item.air_date}</h3>
            
            </Link>
          ))
        )
        }
      </div>
      <div className={ep.more__button}>
        <button className={ep.more__button} onClick={onHandleNextPage}>LOAD MORE</button>
      </div>
    </>
  )
}

export default Episodes