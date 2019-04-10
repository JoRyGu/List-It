import React from 'react';

import './NavMenuButton.css';

export default (props) => {
    return (
        <button className="NavMenuButton" onClick={props.handleMenuClick}>
            <i className="fas fa-bars"></i>
        </button>
    )
}