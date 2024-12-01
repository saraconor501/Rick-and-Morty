/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import LogoTitle from '../../assets/Logo_Title.svg'
import c from '../Characters/Characters.module.css'
import Magnifier from '../../assets/Vector (2).svg'
import ErrorPincle from '../../assets/pickle.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {useContext} from 'react'
import { UserContext } from '../../components/userContext/userContext'
const Characters = () => {
  const providerData = useContext(UserContext)
  console.log(providerData);
  
  const location = useLocation()
  console.log(location);

  const [species, setSpecies] = useState('')
  const [data, setData] = useState([])
  const [isError, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      setTimeout(() => {
        setLoading(false)
      }, 900)
      try {
        setError(false)
        const result = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&gender=${gender}&status=${status}&name=${name}&species=${species}`);
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

  }, [page, gender, status, name, species])
  if (loading) {
    return <div  className={c.loading}><img src='https://raw.githubusercontent.com/Anixii/Rick-Morty/0280b2bdadb018eeb04bf110c975c2f0238073f5/app/assets/img/91%20(1).svg'
     alt=""/></div>
  }
  const onHandleNextPage = () => {
    setPage(page + 1)
  }

  return (
    <>
      
      <div className={c.Logo}>
        <div className={c.LogoTit}>
          <img src={LogoTitle} alt="" />
        </div>
      </div>
      <div className={c.Filters}>
        <div className={c.FiltersIn}>
          <img src={Magnifier} alt="" />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Filter by name...' />
        </div>
        <div className={c.Selects}>
          <select name="" id="" onChange={(e) => setSpecies(e.target.value)}>
            <option value="">Species</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
          </select>
          <select name="" id="" onChange={(e) => setGender(e.target.value)}>
            <option value="">Genders</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Genderless">Genderless</option>
            <option value="Unknown">Unknown</option>
          </select>
          <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="Dead">Dead</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
      </div>
      <div className={c.container}>
        {isError ? (
          <div className={c.error__picle}>
            <img src={ErrorPincle} alt="" className={c.pickle} />
            <h1>Waba Laba Dub Dub! No Data!</h1>
          </div>
        ) : (
          data.map((item, index) => (
            
            <Link to={`/character/${item.id}`} key={index} className={c.container__item}>
              <div >
                <img src={item.image} alt="" className={c.Charac__img} />
                <div className={c.block__name}>
                  <p className={c.title}>{item.name}</p>
                  <p className={c.subtitle}>{item.status} - {item.species}</p>
                </div>
                
              </div>
            </Link>

          ))
        )}
      </div>
      <div className={c.more__button}>
        <button className={c.more__button} onClick={onHandleNextPage}>LOAD MORE</button>

      </div>
    </>

  )
}
export default Characters

