import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { myAds, deleteAd } from '../../actions/adActions'
import ErrorMessage from '../../components/ErrorMessage'
import SingleAd from '../../components/SingleAd'
import Loading from '../../components/Loading'
import { Container, Row, Col, Tabs, Tab, Button, ProgressBar, Popover } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MyAds = () => {
    const [loadStatus, setLoadStatus] = useState(0);
    const dispatch = useDispatch();
    const userAds = useSelector((state) => state.userAds);
    const { loading, ads, error } = userAds;
    const history = useHistory();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const adDelete = useSelector((state) => state.adDelete);
    const { loading:loadingDelete, error:errorDelete } = adDelete;
    const deleteHandler = () => {
        if (window.confirm("Are You Sure you want to delete all sold Ads?")) {
            ads?.map((ad) => {
                (ad?.buyer)&&dispatch(deleteAd(ad._id));
            });
            toast.success("All Sold Ads Deleted Successfully");
            dispatch(myAds());
            history.push('/home');
        }
    }
    const [key, setKey] = useState('notsold');
    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else {
            dispatch(myAds());
        }
    }, [history, userInfo])
    return (
        <Container >
            <ToastContainer
                position="top-center"
                autoClose={3000}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 mt-4"
                // transition={false}
                // variant="pills"
                style={{fontWeight:800}}
            >
                <Tab eventKey="notsold" title="All Ads" size="lg">
                    <Row>
                        {ads?.map((ad) => (
                            <Col>
                                <SingleAd ad={ad} key={ad._id} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="sold" title="Sold Ads">
                    {
                        <Button variant='danger' className='ml-4' onClick={() => deleteHandler()}>Delete All Sold Ads</Button>
                    }
                    <Row>
                        {ads?.map((ad) => (
                            (ad?.buyer) && <Col>
                                <SingleAd ad={ad} key={ad._id} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
            </Tabs>
            {/* <Row>

                    {ads?.map((ad) => (
                <Col>
                        <SingleAd ad={ad} key={ad._id} />
                </Col>
                    ))}
            </Row> */}
        </Container>
    )
}

export default MyAds
