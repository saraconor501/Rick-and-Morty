import es from '../EpisodeSingle/EpisodeSingle.module.css'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import c from '../../Characters/Characters.module.css'
import { Link } from 'react-router-dom'
import  pickle from  '../../../assets/pickle.png'
import GoBack from '../../../assets/GoBack.svg'
const EpisodeSingle = () => {
    const params = useParams()
    console.log(params);
    const [characters, setCharacter] = useState([])
    const [episode, setEpisode] = useState('')
    useEffect(() => {
      const getData = async () => {
        const result = await fetch(`https://rickandmortyapi.com/api/episode/${params.id}`)
        const dataJson = await result.json()
        setEpisode(dataJson)
      const characterData = await Promise.all(dataJson.characters.map((url) => fetch(url).then((res) => res.json()))
    )
        setCharacter(characterData)
  
      }
      getData()
    }, [params.id])
    if (!episode) {
      return <div className={c.error__picle}><img src={pickle} alt="" className={c.pickle}/>
      <h1>Waba Laba Dub Dub! No Data!</h1></div>
    }
  return (
    <>
    <Link to={'/episodes/'}>
        <img src={GoBack} alt="" className={es.back__button}/>
        </Link>
    <div>
        <h1 className={es.title}>{episode.name}</h1>
        <div className={es.container}>
            <div className={es.subtitles}>
            <p>Episode</p>
            <p>Date</p>
            </div>
            <div className={es.subres}>
            <p>{episode.episode}</p>
            <p>{episode.air_date}</p>
            </div>
        </div>
        <h2 className={es.subtitle}>Cast</h2>
        <div className={c.container}>
          {characters.map((character) => (
            <Link to={`/character/${character.id}`} key={character.id} className={c.container__item}>
              <div>
                <img src={character.image} alt="" className={c.Charac__img}/>
                <div className={c.block__name}>
                <p className={c.title}>{character.name}</p>
                <p className={c.subtitle}>{character.status} - {character.species}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
    </>
  )
}

export default EpisodeSingle