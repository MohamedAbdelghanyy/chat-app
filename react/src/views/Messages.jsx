import { Fragment, useEffect, useRef, useState } from "react";
import axiosClient from "../clients/axios-client";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import pusherClient from "../clients/pusher-client";
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Snackbar,
    TextField,
    Typography,
    colors,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { blue } from "@mui/material/colors";

export default function Messages() {
    const [receiver, setReceiver] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [messagesClient, setMessagesClient] = useState();
    const [notificationsClient, setNotificationsClient] = useState();

    const [notification, setNotification] = useState();
    const [isNotificationOpen, setIsNotificationOpen] = useState();

    let { id } = useParams();
    const dataRef = useRef();
    const { user } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            iniNotificationsClient();
        }
        if (id && (!receiver.id || receiver.id != id)) {
            getReceiver();
        }
    });

    const getReceiver = () => {
        axiosClient
            .get(`/users/${id}`)
            .then(({ data }) => {
                if (data.length == 1) {
                    setReceiver(data[0]);
                    getMessages();
                } else {
                    navigate("/messages");
                }
            })
            .catch((err) => {
                throw err;
            });
    };

    const getMessages = () => {
        setLoading(true);
        //console.log("LOADED MSGS");
        axiosClient
            .get(`/messages/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setMessages(data);
                iniNotificationsClient();
                iniMessagesClient();
            })
            .catch((err) => {
                throw err;
            });
    };

    const sendMessage = (ev) => {
        ev.preventDefault();
        if (dataRef.current.value.trim().length !== 0) {
            const payload = {
                receiver_id: id,
                data: dataRef.current.value,
            };
            dataRef.current.value = "";
            axiosClient
                .post("/messages", payload)
                .then(({ data }) => {
                    setMessages((current) => [...current, data]);
                })
                .catch((err) => {
                    throw err;
                });
        }
    };

    const iniNotificationsClient = () => {
        if (notificationsClient != null) {
            notificationsClient.disconnect();
            //console.log("UNSUBSCRIBED FROM NOTIFICATIONS");
        }
        //console.log("SUBSCRIBING TO NOTIFICATIONS");
        setNotificationsClient(
            pusherClient(user.id, id, showNotification, true)
        );
    };

    const iniMessagesClient = () => {
        if (messagesClient != null) {
            messagesClient.disconnect();
            //console.log("UNSUBSCRIBED FROM MESSAGES");
        }
        //console.log("SUBSCRIBING TO MESSAGES");
        setMessagesClient(pusherClient(user.id, id, setMessages, false));
    };

    const showNotification = (notificationData) => {
        if (
            notificationData.message.sender_id != id &&
            (!notification ||
                notificationData.message.id != notification.message.id)
        ) {
            setNotification(notificationData);
            setIsNotificationOpen(true);
        }
    };

    const hideNotification = () => {
        setIsNotificationOpen(false);
    };

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: blue[500],
                p: 3,
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }

    const formatDateTime = (dateTime) => {
        return new Date(dateTime).toLocaleString();
    };

    return (
        <div>
            <Snackbar
                open={isNotificationOpen}
                onClose={hideNotification}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                ContentProps={{
                    sx: {
                        background: `${colors.blue[500]}`,
                    },
                }}
                message={
                    notification
                        ? notification.message.sender_name +
                          ": " +
                          notification.message.data
                        : ""
                }
            />
            {!id && (
                <Typography textAlign={"center"}>
                    Select a user to chat now!
                </Typography>
            )}
            {id && loading && (
                <Typography textAlign={"center"}>Loading</Typography>
            )}
            {id && !loading && messages.length == 0 && (
                <Typography textAlign={"center"}>
                    Start conversation with {receiver.name} now!
                </Typography>
            )}
            {id && !loading && (
                <List sx={{ mb: 2 }}>
                    {messages.map((msg) => (
                        <Fragment key={msg.id}>
                            {msg.sender_id == user.id && (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            {...stringAvatar(`${user.name}`)}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={msg.data}
                                        secondary={formatDateTime(
                                            msg.created_at
                                        )}
                                    />
                                </ListItem>
                            )}
                            {msg.receiver_id == user.id && (
                                <ListItem sx={{ textAlign: "right" }}>
                                    <ListItemText
                                        primary={msg.data}
                                        secondary={formatDateTime(
                                            msg.created_at
                                        )}
                                        sx={{ mr: 1 }}
                                    />
                                    <ListItemAvatar>
                                        <Avatar
                                            {...stringAvatar(
                                                `${receiver.name}`
                                            )}
                                        />
                                    </ListItemAvatar>
                                </ListItem>
                            )}
                        </Fragment>
                    ))}
                    <Box
                        component="form"
                        onSubmit={sendMessage}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            inputRef={dataRef}
                            margin="normal"
                            fullWidth
                            id="message"
                            placeholder="Type anything..."
                            name="message"
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        type="submit"
                                        sx={{ ml: 2 }}
                                        variant="contained"
                                        endIcon={<SendIcon />}
                                    >
                                        Send
                                    </Button>
                                ),
                            }}
                            autoFocus
                        />
                    </Box>
                </List>
            )}
        </div>
    );
}
