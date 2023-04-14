import Pusher from 'pusher-js';

const pusherClient =  (userID, receiverID, setMessages) => {
    const pusherAppKey = import.meta.env.VITE_PUSHER_APP_KEY;
    const channelName = `channel-${userID}-${receiverID}`;
    const pusher = new Pusher(pusherAppKey, {
        cluster: "eu",
    });
    const channel = pusher.subscribe(channelName);
    channel.bind("new-message", (data) => {
        setMessages((current) => [...current, data.message]);
    });
    //Pusher.logToConsole = true;
}

export default pusherClient;
