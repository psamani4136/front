import React, {useState} from 'react'
import {CSSTransition} from "react-transition-group"

export const NavItem = (props) => {
    const [open, setOpen] = useState(false)
    return (
        <li className="main-navigation-link" onClick={() => setOpen(!open)}>
            <a>{props.link}</a>
            <CSSTransition in={open} unmountOnExit timeout={120} classNames="main"> 
                <div className="syllabus-main-category">
                    <a>{props.children}</a>
                </div>
            </CSSTransition>
        </li>
    )
}
