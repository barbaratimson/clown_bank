import {useEffect, useState} from "react";
import axios from "axios";
import {useAppSelector} from "../utils/hooks";
import {Notification} from "../utils/types";

const link = process.env.REACT_APP_APIGATEWAY_LINK
const token = localStorage.getItem("token")

const Notifications = () => {
    const user = useAppSelector(state => state.userStore.user)
    const [notifications,setNotifications] = useState(Array<Notification>)
    const fetchNotifications = async (id:string) => {
        try {
            const response = await axios.get(
                `${link}/notification/${id}`,{
                    headers:{
                        "Authorization" : token
                    }
                });
                setNotifications(response.data)
            console.log(response.data)
        } catch (err) {
            console.error('Ошибка при получении списка треков:', err);
            console.log(err)
        }
    };

    useEffect(() => {
        let pingNotifications = setInterval(()=>{
                fetchNotifications(user.uniqueUserId)
        },10000)
        return ()=>{clearInterval(pingNotifications)}
    }, [user]);
    return (
        <div className="notification-wrapper">
            {notifications.map(notification => !notification.seen ? (
                    <NotificationComponent id={notification.id} seen={notification.seen} message={notification.message} timestamp={notification.timestamp} type={notification.type} userUniqueNumber={notification.userUniqueNumber} />
                ):null

            )}
        </div>
    );
};

export default Notifications

const NotificationComponent = (notification:Notification) => {
    const [show,setShow] = useState(true)

    const seenNotification = async (id:bigint) => {
        try {
            const response = await axios.post(
                `${link}/notification/${id}`,null,{
                    headers:{
                        "Authorization" : token
                    }
                });
            console.log(response.data)
        } catch (err) {
            console.error('Ошибка при получении списка треков:', err);
            console.log(err)
        }
    };


    useEffect(() => {
        if(!notification.seen) {
            seenNotification(notification.id)
        }
        let timeout = setTimeout(()=>{
                setShow(false)
        },5000)
        return ()=>{clearTimeout(timeout)}
    }, []);
    return (
        <>
            {show ? (
                <div key={notification.timestamp} className="notification">
                    <div className="notification-time">{notification.timestamp}</div>
                    <div className="notification-message">{notification.message}</div>
                </div>
            ):null}

        </>
    )
}
