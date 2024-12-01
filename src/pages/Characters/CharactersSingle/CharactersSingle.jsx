

import { useState, useEffect } from "react"
import sc from '../CharactersSingle/CharactersSingle.module.css'
import { Link, useParams } from "react-router-dom"
import Hr from '../../../assets/divider.svg'
import Line from '../../../assets/Color.svg'
import GoBack from '../../../assets/GoBack.svg'


const CharactersSingle = () => {
  const params = useParams()
  console.log(params);
  const [data, setData] = useState()
  // const [locations, setLocations] = useState([])
  const [episodes, setEpisodes] = useState([])
  useEffect(() => {
    const getData = async () => {
      const result = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
     
      const dataJson = await result.json()
      setData(dataJson)
      console.log(data)

      const episodeUrls = dataJson.episode
      const responceEpisodes = await Promise.all(
        episodeUrls.map((url) => fetch(url).then((res)=>res.json()))
      )
      setEpisodes(responceEpisodes)
      
    //   const locationsUrls = dataJson.location
    //   const responceLocations = await Promise.all(
    //     locationsUrls.map((url) => fetch(url).then((res) => res.json()))
    //   )
    //  setLocations(responceLocations)
    }
    getData()
    // const getEpisodes = async()=>{
    //   const res = await fetch(`https://rickandmortyapi.com/api/episode/`)
    //   const dataJson = await res.json()
    //   setEpisodes(dataJson)
    // }
    // getEpisodes()
  }, [params.id])

  console.log(data);
  console.log(episodes);
  // console.log(locations);
  
  

  return (
    <>
      <div>
        <div className={sc.container}>
        <Link to={'/'}>
        <img src={GoBack} alt="" className={sc.back__button}/>
        </Link>
          <div className={sc.charact__img}>
            <img src={data?.image} alt="" />
          </div>
          <h1>{data?.name}</h1>
          <div className={sc.containers}>
            <div className={sc.block}>
              <h2>Informations</h2>
              <p>Gender</p>
              <h6>{data?.gender}</h6>
              <img src={Hr} alt="" />
              <p>Status</p>
              <h6>{data?.status}</h6>
              <img src={Hr} alt="" />
              <p>Specie</p>
              <h6>{data?.species}</h6>
              <img src={Hr} alt="" />
              <p>Origin</p>
              <h6>{data?.origin.name}</h6>
              <img src={Hr} alt="" />
              <p>Type</p>
              <h6>{data?.type === '' ? 'Unknown' : data?.type.toLocaleLowerCase()}</h6>
              <img src={Hr} alt="" />
              <p>Location</p>
              
                <Link to={`/location/${data?.id}`} className={sc.nav2}><h6>{data?.location.name}<img src={Line} className={sc.line} /></h6></Link>
              
            </div>
            <div className={sc.block}>
              <h2>Episodes</h2>
              {/* <h1>{episodes.episode}</h1> */}
              {/* <p>{episodes.map((item, index) => {
                <p key={index}>{item.episode}</p>
              })}</p> */}
              {/* <h6>{episodes.name}</h6> */}
              {/* {episodes.map((item, index)=>{
                <div key={index}>
                <p>{item.episode}</p>
            
                </div>
              })} */}
              {/* <p>{episodes.name}</p> */}
            {episodes.slice(0,4).map((ep)=>(
              <Link to={`/episodes/${ep.id}`} key={ep.id} className={sc.nav}>
                <p>{ep.episode}</p>
                <h6>{ep.air_date}<img src={Line} className={sc.line}/></h6>
                <h3>{ep.air_date.toUpperCase()}</h3>
                <img src={Hr} alt="" />
              </Link>
            ))}
             

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharactersSingle