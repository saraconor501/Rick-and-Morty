/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import s from '../../Header/Header.module.css'
import { Link, Route, Routes } from 'react-router-dom'
import Characters from '../../../pages/Characters/Characters'
import Episodes from '../../../pages/Episodes/Episodes'
const HeaderText = () => {
  return (
    <>
    
    <nav className={s.nav__list}>
        <Link to={'/'} className={s.nav__item}>Characters</Link>
        <Link to={'/locations'} className={s.nav__item}>Locations</Link>
        <Link to={'/episodes'} className={s.nav__item}>Episodes</Link>
    </nav>
    </>
  )
}

export default HeaderText