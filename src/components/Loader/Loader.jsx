import React from 'react';
import './Loader.scss';

function Loader() {
  return (
    <div className="loader__area">
      <div className='loader__wrapper'>
        <div className='loader__icon'>
            <img src="https://devplus.edu.vn/assets/images/devplus/logo_loading.png" alt="devplus_logo" />
        </div>
      </div>
    </div>
  )
}

export default Loader