import { MenuNode } from "./MenuNode"

export const MenuItem = ({arbol}) => {

    return (
    <div className='node-container'>
        <ul className='menu-list'>
        {arbol.map((item, index) => (
            <MenuNode key={index} item={item} />
        ))}
        </ul>
    </div>
    )
}
