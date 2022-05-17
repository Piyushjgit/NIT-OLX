import React, { useState, useEffect } from 'react'
import { Container, Card, Button, OverlayTrigger, Popover, DropdownButton, Dropdown, Alert, Col, Row, Image, NavDropdown, Badge } from 'react-bootstrap'
import { AiFillEdit, AiFillDelete, AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { currentAd } from '../../actions/adActions'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { AD_UPDATE_SUCCESS, AD_UPDATE_FAIL, AD_LIST_SUCCESS } from '../../constants/adsConstant';
import { io } from "socket.io-client";
import NotificationBadge, { Effect } from 'react-notification-badge';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from '../NotFound';
import { fetchChat } from '../../actions/chatActions';
const AdScreen = ({ match }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const history = useHistory();
    const dispatch = useDispatch();
    const singleAd = useSelector((state) => state.singleAd);
    const { loading, ads, error } = singleAd;
    const [errMessage, setErrMessage] = useState('');
    const url = "https://wa.me/91"

    const [clear, setClear] = useState(false);
    const [desc, setDesc] = useState([]);
    useEffect(() => {
        ads?.requesters?.map((val) => {
            if ((val._id).toString() === (userInfo?._id).toString())
                setClear(true);
        })
        setDesc(ads?.description?.split('.'));
    }, [ads])
    useEffect(() => {
        setDesc(desc);
    }, [desc])
    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else {
            dispatch(currentAd(match.params.id));
        }
    }, [dispatch, userInfo, history]);

    const chatHandler = (e) => {
        e.preventDefault();
        window.open(`${url}9771139594`);
    }
    const requestHandler = async (e) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`,
                },
            };
            const { data } = await axios.post(`/api/ads/${match.params.id}/buyrequest`, {}, config);
            (data?.requesters?.includes(userInfo?._id) ? (
                <>
                    {toast.success("Request Cancelled Successfully")}
                    {setClear(false)}
                </>
            ) :
                (<>
                    {toast.success("Request Sent Successfully")}
                    {setClear(true)}
                </>));
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            setErrMessage(message);
            toast.warn("Something Wrong ! Please Refresh");
        }
    }
    const acceptRequest = async (user) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`,
                },
            };
            const { data } = await axios.post(`/api/ads/${match.params.id}/${user._id}/confirmrequest`, {}, config);
            dispatch({ type: AD_UPDATE_SUCCESS, payload: data });
            toast.success("Product Sold !");
            dispatch(currentAd(match.params.id));
            setErrMessage('');
            // console.log(data);
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            console.log(message);
            dispatch({ type: AD_UPDATE_FAIL, payload: message });
            setErrMessage(message);
        }
    }
    return (
        <Container className='mt-5'>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            {error ? (<NotFound />) : (
                <>
                    {loading && <Loading />}
                    {errMessage && <ErrorMessage variant="danger">{errMessage}</ErrorMessage>}
                    <Row>
                        <Col sm={8}>
                            <Card>
                                <Card.Body variant="top" >
                                    <Carousel variant="dark" className='bg-warning'>
                                        {
                                            ads?.image?.map((pic, i) => (
                                                <Carousel.Item variant="dark">
                                                    <img
                                                        src={pic}
                                                        alt={i}
                                                        style={{ maxWidth: '100%', height: '60vh' }}
                                                    />
                                                    <Carousel.Caption>
                                                        <h3>{ads?.price + i}</h3>
                                                        <p>{ads?.title}</p>
                                                    </Carousel.Caption>
                                                </Carousel.Item>
                                            ))
                                        }
                                    </Carousel>
                                    <hr />
                                    <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong><h2>{ads?.title}</h2></strong>
                                    </Card.Title>
                                    <hr />
                                    <h3 style={{ textDecoration: 'underline' }}>Description</h3>
                                    <Card.Text>
                                        {
                                            desc?.map((des) => (
                                                <div>{des}</div>
                                            ))
                                        }
                                    </Card.Text>
                                    <hr />
                                    {
                                        (ads?.seller?._id === userInfo._id && ads?.buyer === null) &&
                                        (<>
                                            <DropdownButton id="dropdown-basic-button"
                                                title=
                                                {<><Badge pill bg="danger" size='large'>{ads?.requesters?.length}</Badge> {' '}Requesters </>}>
                                                {
                                                    ads?.requesters?.length === 0 && "No Requests Found"
                                                }
                                                {
                                                    (ads?.requesters?.map((aa) => (
                                                        <>
                                                            <Dropdown.Item style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                                                {aa.name}
                                                                <AiFillCheckCircle onClick={() => acceptRequest(aa)} />
                                                            </Dropdown.Item>
                                                        </>
                                                    )))
                                                }
                                            </DropdownButton>
                                        </>)
                                    }
                                    {
                                        (ads?.seller?._id !== userInfo._id) &&
                                        <><Button variant="danger" onClick={requestHandler}>{clear ? ("Cancel Req") : ("Send Req")}</Button>
                                        </>
                                    }
                                    {
                                        ads?.buyer && <Alert variant='success' className='w-75 font-weight-bold'><h6>Product Sold to {ads?.buyer?.name}</h6></Alert>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card >
                                <Card.Body variant="top" >
                                    <Card.Title>
                                        <h3><strong> ₹ {ads?.price}</strong></h3>
                                    </Card.Title>
                                    <Card.Text>
                                        {desc?.map((des) => (
                                            <div>{des}</div>
                                        ))}
                                    </Card.Text>
                                    {/* <Card.Subtitle className="mb-2 text-muted">{ads?.seller?.name}</Card.Subtitle> */}
                                    <footer className="blockquote-footer">
                                        Posted On - {ads?.createdAt?.substring(0, 10)}
                                    </footer>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body variant="top" >
                                    <Card.Title>
                                        Seller Description
                            </Card.Title>
                                    <Card.Text>
                                        <Image src={ads?.seller?.pic?.url} fluid responsive
                                            style={{ width: '4em', height: '4em', borderRadius: '2em' }}
                                        />
                                        {' '}
                                        <b>{ads?.seller?.name}</b>
                                        {ads?.seller?._id === userInfo?._id ?" --- This is your own ad" :
                                            <Link to={`/chat/${ads?.seller?._id}/${ads?._id}`} >
                                                <Button variant="primary" className='ml-5'>Chat With Seller</Button>
                                            </Link>
                                        }
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>)}
        </Container>
    )
}

export default AdScreen
