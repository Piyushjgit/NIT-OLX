import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { myAds, deleteAd } from '../../actions/adActions'
import ErrorMessage from '../../components/ErrorMessage'
import SingleAd from '../../components/SingleAd'
import Loading from '../../components/Loading'
import { Container, Row, Col, Tabs, Tab, Button, ProgressBar, Popover } from 'react-bootstrap'
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
                setLoadStatus(loadStatus+1);
            });
            history.push('/home');
        }
    }
    const [key, setKey] = useState('sold');
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
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <Popover>
                <ProgressBar now={loadStatus} className='w-50 mt-1 mb-3' label={`${loadStatus}%`} />
            </Popover>
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 mt-4"
                // transition={false}
                // variant="pills"
                style={{fontWeight:800}}
            >
                <Tab eventKey="notsold" title="In Process" size="lg">
                    <Row>
                        {ads?.map((ad) => (
                            (!(ad?.buyer)) && <Col>
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
                            ((ad?.buyer)) && <Col>
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
