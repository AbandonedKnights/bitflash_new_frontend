import React, { useEffect } from "react";
import { M_messageHeader } from "../redux/helpers/api_functions_new";
import NotificationAlert from 'react-notification-alert';

export default function MessageHeader() {
    const [data, SetData] = React.useState(true);
    useEffect(() => {
        M_messageHeader("message")
          .then((d) => {
            SetData(d)
          })
          .catch((e) => {
            console.log(e);
          });
      }, []);
  return (
    <>
        {/* <NotificationAlert ref="notify" zIndex={9999} onClick={() => console.log("hey")} > */}
        {data && (data.status == 200) ? (
            <>
                <div
                className="bg-info p-4"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
                >
                    <h3>{data.message}</h3>
                </div>
            
            </>
        ) : ''}
    </>
  );
}
