/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import Burger from '../../../assets/menu_24px.svg'
import close from '../../../assets/close_24px.svg'
import s from '../../Header/Header.module.css'
const BurgerMenu = () => {
    const [isToggle, setToggle] = useState(false)
  return (
    <>
    <ul className={s.nav__list}>
        <li className={s.nav__item}>
          <Link to={"/"}>Characters</Link>
        </li>
        <li className={s.nav__item}>
          <Link to={"/locations"}>Locations</Link>
        </li>
        <li className={s.nav__item}> 
        <Link to={"/episodes"}>Episodes</Link>
        </li> 
      </ul>   
        <div className={s.burger_menu} onClick={() => setToggle(!isToggle)}><img alt='burger-menu' src={isToggle? close : Burger}/></div>
        {isToggle &&  
        <div className={s.burger}> 
            <ul className={s.burger__list}> 
                <li className={s.burger__item}><Link className={isToggle ? 'toggled' : ''} to={"/"}>Characters</Link></li>
                <li className={s.burger__item}><Link to={"/locations"}>Locations</Link></li>
                <li className={s.burger__item}><Link to={"/episodes"}>Episodes</Link> </li>
            </ul>
        </div>}
    </>
  )
}

export default BurgerMenu