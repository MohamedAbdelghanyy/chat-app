import Pusher from "pusher-js";

const pusherClient = (userID, receiverID, callBack, isGeneralListener) => {
    const pusherAppKey = import.meta.env.VITE_PUSHER_APP_KEY;
    var baseURL = import.meta.env.VITE_API_BASE_URL;
    //Removing http or https from channel name
    baseURL = baseURL.replace("https://", "");
    baseURL = baseURL.replace("http://", "");
    //Replacing : with ; because pusher doesn't support : in channel names
    baseURL = baseURL.replace(":", ";");
    // Changing to lower case because Pusher is case sensitive
    baseURL = baseURL.toLowerCase();
    var channelName = "";
    if (isGeneralListener) {
        channelName = `${baseURL}-${userID}-0`;
    } else {
        channelName = `${baseURL}-${userID}-${receiverID}`;
    }
    const pusher = new Pusher(pusherAppKey, {
        cluster: "eu",
    });
    const channel = pusher.subscribe(channelName);
    if (isGeneralListener) {
        channel.bind("new-message", (data) => {
            callBack(data);
        });
    } else {
        channel.bind("new-message", (data) => {
            callBack((current) => {
                //This statement is to prevent notification duplication
                if (current[current.length - 1].id != data.message.id) {
                    return [...current, data.message];
                }
                return current;
            });
        });
    }
    //Pusher.logToConsole = true;
    return pusher;
};

export default pusherClient;
