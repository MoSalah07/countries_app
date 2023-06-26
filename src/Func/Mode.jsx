import React, {useState} from 'react'

function Mode() {
    const [dark, setDark] = useState( false );

    const switchMode = () => {
      setDark( ( prev ) => !prev );
    }

  return {dark, switchMode}
}

export default Mode;