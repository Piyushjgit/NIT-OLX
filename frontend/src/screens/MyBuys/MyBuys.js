import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { myBuys } from '../../actions/adActions'
import ErrorMessage from '../../components/ErrorMessage'
import SingleAd from '../../components/SingleAd'
import Loading from '../../components/Loading'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MyAds = () => {
    const dispatch = useDispatch();
    const userAds = useSelector((state) => state.userAds);
    const { loading, ads, error } = userAds;
    const history = useHistory();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [key, setKey] = useState('bought');
    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else {
            dispatch(myBuys());
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
                style={{ fontWeight: 800 }}
            >
                <Tab eventKey="pending" title="Requested" size="lg">
                    <Row>
                        {ads?.map((ad) => (
                            (!(ad?.buyer)) && <Col>
                                <SingleAd ad={ad} key={ad._id} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="bought" title="Bought">
                    <Row>
                        {ads?.map((ad) => (
                            ((ad?.buyer)) && <Col>
                                <SingleAd ad={ad} key={ad._id} />
                            </Col>
                        ))}
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default MyAds
