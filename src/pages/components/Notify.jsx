import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Notify.css";
// var ms = new Date(2022 - 1 - 22).getTime();

const endTime = new Date('2022-1-23 18:27:00').getTime();
const LaunchMSG = (props) => {
    const [dis, setdis] = useState(true);
    // const classes = classNames('notification', {
    //     'notification--type-success': (props.type == 'success'),
    //     'notification--type-error': (props.type == 'error'),
    //     'notification--type-notify': (props.type == 'notify'),
    // });
    const [time, setTime] = useState('00:00:00');
    const [diff, setDiff] = useState(0);
    useEffect(() => {
        let cms = new Date().getTime();
        let diff = endTime - cms;
        if (diff <= 0) {
            setdis(false);
        }
    }, [diff])
    setInterval(() => {
        let cms = new Date().getTime();
        let diff = endTime - cms;
        setDiff(diff)
        if (diff >= 0) {
            let hrs = Math.floor(diff / (1 * 60 * 60 * 1000));
            let diff1 = diff % (1 * 60 * 60 * 1000);
            let mns = Math.floor(diff1 / (1 * 60 * 1000));
            let diff2 = diff1 % (1 * 60 * 1000);
            let sec = Math.floor(diff2 / (1000));
            let strt = (hrs < 10 ? "0" + hrs : hrs) + ':' + (mns < 10 ? "0" + mns : mns) + ":" + (sec < 10 ? "0" + sec : sec);
            // console.log(">>", hrs, mns, sec)
            setTime(strt);
        } else {
            setdis(false);
        }
    }, 100);
    return (
        <>
            {dis ?
                <div className='notification--type-success'>
                    <div className="notification__body">
                        Trading and Stacking will be online in <b>{time}</b> hrs
                    </div>
                    <i className="notification__close fa fa-times" onClick={() => { setdis(false) }}></i>
                </div>
            : null}
        </>

    );
};

// Notification.propTypes = {
//     type: React.PropTypes.oneOf(['success', 'error', 'notify']).isRequired,
// };

export default LaunchMSG;