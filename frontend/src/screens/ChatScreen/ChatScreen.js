import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Chat';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { fetchChat } from '../../actions/chatActions';
import Loading from '../../components/Loading';

//To connect client to serve
let socket = ""
function temp() {
    socket = io.connect("https://nit-olx.herokuapp.com/");
    // socket = io.connect("http://127.0.0.1:5000");
}
function ChatScreen({ match }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    // console.log(userInfo);

    const userChats = useSelector((state) => state.userChats);
    const { chatInfo, loading } = userChats;

    const [receiver, setReceiver] = useState();
    // let messages = null
    // let room = ""
    // if (chatInfo) {
    //     messages = chatInfo.messages;
    //     room = chatInfo.room_id;
    // }
    const temp2 = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post('/api/users/getUser', { id: match?.params?.uid }, config);
        setReceiver(data);
    }
    useEffect(() => {
        setReceiver(receiver);
    }, [receiver])
    useEffect(() => {
        temp();
        temp2();
    }, [])
    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else {
            dispatch(fetchChat(match?.params?.aid, match?.params?.uid));
        }
    }, [dispatch, userInfo, history]);
    useEffect(() => {
        socket?.emit("join_room", chatInfo?.room_id);
    }, [chatInfo?.room_id])
    return (
        <>
            {loading ? <Loading /> :
                <Chat socket={socket} sender={userInfo} room={chatInfo?.room_id} messages={chatInfo?.messages} receiver={receiver} adId={match?.params?.aid} />
            }
        </>
    )
}

export default ChatScreen