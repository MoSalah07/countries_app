import React, {useContext} from 'react';
import { BsMoon } from 'react-icons/bs';
import {FiSun} from 'react-icons/fi'
import { AllData } from '../App'

function Header() {

  const { dark, switchMode, handelLocal } = useContext( AllData );

  return (
      <header className={`header ${dark ? 'dark-mode' : ''}`}>
          <nav className={`container`}>
              <h2 className="logo flex-center ">where in the world ?</h2>
              <div onClick={switchMode} className="switch-mode flex-center">
                    { dark ? <BsMoon /> : <FiSun />}
                    <span >{dark ? 'dark mode' : 'light mode'}</span>
              </div>
          </nav>
    </header>
  )
}

export default Header