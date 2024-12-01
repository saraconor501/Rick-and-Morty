/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import ln from '../Locations/Location.module.css'
import Logo from '../../assets/locations.webp'
import Magnifer from '../../assets/Vector (2).svg'
import ErrorPincle from '../../assets/pickle.png'
import { useState, useEffect } from 'react'
import { locationsAPI } from '../../api/locations.api'
import { Link } from 'react-router-dom'
const Locations = () => {
    const [page, setPage] = useState(1)
    const [isError, setError] = useState(false)
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [dimension, setDimension] = useState('')
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
          }, 900)
        const getData = async () => {
            try {
                setError(false)
                const result = await fetch(`
            https://rickandmortyapi.com/api/location?page=${page}&name=${name}&type=${type}&dimension=${dimension}`)
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
    }, [name, page, type, dimension])
    if (loading) {
        return <div  className={ln.loading}><img src='https://raw.githubusercontent.com/Anixii/Rick-Morty/0280b2bdadb018eeb04bf110c975c2f0238073f5/app/assets/img/91%20(1).svg'
         alt=""/></div>
      }
    const onHandleNextPage = () => {
        setPage(page + 1)
    
    }

    return (
        <>
            <div className={ln.Logo}><img src={Logo} alt="" /></div>
            <div className={ln.Input}>
                <div className={ln.filter__inp}>
                    <img src={Magnifer} alt="" />
                    <input type="text" placeholder='Filter by name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
            <div className={ln.container}>
                {isError ? (
                    <div className={ln.error__picle}>
                        <img src='https://i.pinimg.com/736x/a5/2f/02/a52f021392fe91fc5733f11166529f35.jpg' alt="" className={ln.pickle} />
                        <h1>Where is the date? There is no data</h1>
                    </div>
                ) : (
                    data.map((item, index) => (
                        <Link to={`/location/${item.id}`} className={ln.container__item}>
                            <h5>{item.name}</h5>
                            <p>{item.type}</p>
                            <h3>{item.dimension}</h3>
                        </Link>
                    ))
                    // <div className={ln.container__item}>
                    //         <h5>{name}</h5>
                    //         <p>{type}</p>
                    //         <h3>{dimension}</h3>
                    //     </div>
                )
                }
            </div>
            <div className={ln.more__button}>
                <button className={ln.more__button} onClick={onHandleNextPage}>LOAD MORE</button>
            </div>
            
        </>

)
}

export default Locations