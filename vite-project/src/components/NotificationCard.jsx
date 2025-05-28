import { MdDelete } from "react-icons/md";
import "../styles/NotificationCard.css"

export const NotificationCard = ({notification, onDeleteNoti}) => {
    return (
        <div className="notification-card">
            <div className='info-noti'>
                <p>{notification.mensaje}</p>
            </div>
            <div className='noti-actions' >
                <button onClick={() => onDeleteNoti(notification.id)} className='notification-delete-button' ><MdDelete /></button>
            </div>
        </div>
    )
}
