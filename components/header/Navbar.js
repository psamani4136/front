import React from 'react'

export const Navbar = (props) =>{
    return (
        <nav className="main-navigation-wrapper">
            <ul className="main-navigation-main">
                {props.children}
            </ul>
         </nav> 

    )
}
