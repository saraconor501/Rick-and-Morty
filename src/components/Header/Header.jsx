/* eslint-disable no-unused-vars */
import React from 'react'
import s from '../Header/Header.module.css'
import Logo from '../../assets/logo.svg'
import BurgerMenu from './BurgerMenu/BurgerMenu'
const Header = () => {

  return (
    <>
    <header className={s.header}> 
            <div className={s.header__container}> 
                <div className={s.header__logo}>
                    <img src={Logo} alt="" />
                </div>
                <BurgerMenu/>
            </div>
        </header>
    </>
  )
}

export default Header
