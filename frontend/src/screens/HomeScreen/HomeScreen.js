import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listAds } from '../../actions/adActions'
import ErrorMessage from '../../components/ErrorMessage'
import SingleAd from '../../components/SingleAd'
import Loading from '../../components/Loading'
import { Button, Container, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap'
import Pagination from "@vlsergey/react-bootstrap-pagination";
import axios from 'axios'

const HomeScreen = ({ search }) => {
    const dispatch = useDispatch();
    const adList = useSelector((state) => state.adList);
    // console.log(adList);
    const { loading, ads, error } = adList;
    // console.log(ads);
    const history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const adCreate = useSelector((state) => state.adCreate);
    const { success: successCreate } = adCreate;

    const adUpdate = useSelector((state) => state.adUpdate);
    const { success: successUpdate } = adUpdate;

    const adDelete = useSelector((state) => state.adDelete);
    const { success: successDelete } = adDelete;

    const [currentPage, setCurrentPage] = useState(1);
    const [currentAds, setCurrentAds] = useState(ads?.slice(0, 6));
    const adsPerPage = 6;
    var totalPages;
    useEffect(() => {
        const indexOfLastAd = currentPage * adsPerPage;
        const indexOfFirstAd = indexOfLastAd - adsPerPage;
        setCurrentAds(ads?.slice(indexOfFirstAd, indexOfLastAd));
    }, [currentPage])
    // const currentAds = ads?.slice(indexOfFirstAd, indexOfLastAd);
    useEffect(() => {
        totalPages = Math.ceil(ads?.length / adsPerPage);
        setCurrentAds(ads?.slice(0, 6));
    }, [ads])
    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else {
            dispatch(listAds());
        }
    }, [dispatch, history, userInfo, successCreate, successUpdate, successDelete]);


    const [chats, setChats] = useState([]);
    useEffect(() => {
        setChats(chats);
    }, [chats])
    const ChatList = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat/singleChats`, {}, config);
            setChats(data);
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            console.log(message);
        }
    }
    useEffect(() => {
        ChatList();
    }, [history, userInfo])
    const popover = (
        <Popover id="popover-basic" style={{ maxHeight: '50vh', overflowY: 'scroll', minWidth: '13vw' }}>
            <Popover.Header className='h5' style={{ backgroundColor: '#158CBA', color: 'white', fontFamily: 'cursive', fontSize: 'bolder' }}>Messages</Popover.Header>
            <Popover.Body style={{ backgroundColor: 'azure' }}>
                {chats?.map((chat) => {
                    const user1 = chat.room_id.split(" ")[0];
                    const user2 = chat.room_id.split(" ")[1];
                    const corresAd = chat.room_id.split(" ")[2];
                    const user = (userInfo._id === user1 ? user2 : user1);
                    let message = chat?.messages;
                    message = message[message?.length - 1];
                    let in1 = message?.indexOf('author');
                    let in2 = message?.indexOf('message');
                    let in3 = message?.indexOf('time');
                    {/* const author = message?.substring(in1 + 9, in2 - 3); */}
                    const msg = message?.substring(in2 + 10, in3 - 3);
                    return (
                        <>
                            <a href={`/chat/${user}/${corresAd}`}>
                                <h6>
                                    <Button href={`/ad/${corresAd}`} target="_blank" size='sm'>Ad Link</Button>
                                    {msg?.length > 15 ? (msg?.substr(0, 15) + " ...") : (msg)}
                                </h6>
                            </a>
                            <hr />
                        </>
                    );
                })}

            </Popover.Body>
        </Popover>
    );

    return (
        <Container className='mt-4'>
            <OverlayTrigger trigger="click" rootClose placement="left" overlay={popover}>
                <Button variant="success" style={{ position: 'fixed', right: '1em', top: '40em', zIndex: '20' }}>Chats</Button>
            </OverlayTrigger>
            <Link to='/createad'>
                <Button className='ml-4'>
                    Create Ad
                </Button>
            </Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            {search ? (
                <Row>
                    {ads &&
                        ads?.filter((filteredads) =>
                            filteredads.title.toLowerCase().includes(search.toLowerCase()))
                            .reverse().map((ad) => (
                                <Col>
                                    <SingleAd ad={ad} key={ad._id} />
                                </Col>
                            ))}
                </Row>
            ) : (<>
                <Row>
                    {(currentAds?.map((ad) => (
                        <Col>
                            <SingleAd ad={ad} key={ad._id} />
                        </Col>
                    )))}
                </Row>
                <Pagination value={currentPage - 1} totalPages={Math.ceil(ads?.length / 6)}
                    showFirstLast={false} onChange={(e) => setCurrentPage(e.target.value + 1)}
                    className='mt-4 justify-content-center'
                />
            </>
                )}
        </Container>
    )
}

export default HomeScreen
