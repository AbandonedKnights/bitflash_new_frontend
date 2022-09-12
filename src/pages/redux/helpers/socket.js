import io from "socket.io-client";

function createSocketClient(access_token) {
  //const socket = io("wss://socket.btexapi.cloud", {
  const socket = io("wss://socket.bitflash.finance", {
    auth: {
      token: access_token, //kujgwvfq-a-ghosttown-z-1fhhup0p6
    },
  });
  return socket;
}
export default createSocketClient;
