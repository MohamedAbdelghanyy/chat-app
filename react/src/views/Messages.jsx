import { Fragment, useEffect, useRef, useState } from "react";
import axiosClient from "../clients/axios-client";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import pusherClient from "../clients/pusher-client";
import {
    Avatar,
    Box,
    Button,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";

export default function Messages() {
    const [receiver, setReceiver] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    let { id } = useParams();
    const dataRef = useRef();
    const { user } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && (!receiver.id || receiver.id != id)) {
            getReceiver();
        }
    });

    const getReceiver = () => {
        setLoading(true);
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
        axiosClient
            .get(`/messages/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setMessages(data);
                pusherClient(user.id, id, setMessages);
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

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: blue[500],
                width: 35,
                height: 35,
                p: 3,
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }

    const formatDateTime = (timestamp) => {
        return new Date(timestamp*1000).toLocaleString();
    };

    return (
        <div>
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
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send
                        </Button>
                    </Box>
                </List>
            )}
        </div>
    );
}
