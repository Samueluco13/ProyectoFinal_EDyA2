import {useState} from 'react'
import { Link } from "react-router-dom";
import { MenuItem } from "./MenuItem";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export const MenuNode = ({item}) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <li className="item-list">
            {item.ruta ? (
                    <p><Link to={item.ruta} className="menu-link" >{item.title}</Link></p>
                ) : (
                    item.onClick ? (
                        <p className="menu-children" onClick={item.onClick} >
                            {item.title}
                        </p>
                    ) : (
                    <p className="menu-children" onClick={() => setOpenMenu(!openMenu)}>
                        {item.title}  
                        <span className="arrow" >{openMenu ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
                    </p>
                ))}
            {item.children && openMenu && <MenuItem arbol={item.children} className="submenu" />}
        </li>
    )
}
