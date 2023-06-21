import React from 'react'
import './Header.css';

const Header = ({ text ,count}) => {
    return (
      <div className="container mt-3 p-2">
        {text}
        <div className="rounded mx-2 align-items-center d-flex justify-content-center">
          {count}
        </div>
      </div>
    );
};

export default Header