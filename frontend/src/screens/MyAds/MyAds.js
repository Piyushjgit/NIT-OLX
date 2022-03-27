import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { myAds } from '../../actions/adActions'
import ErrorMessage from '../../components/ErrorMessage'
import SingleAd from '../../components/SingleAd'
import Loading from '../../components/Loading'
import { Container, Row, Col } from 'react-bootstrap'
const MyAds = () => {
    const dispatch = useDispatch();
    const userAds = useSelector((state) => state.userAds);
    console.log(userAds);
    const { loading, ads, error } = userAds;
    const history = useHistory();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else {
            dispatch(myAds());
        }
    }, [dispatch, history, userInfo])
    return (
        <Container>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <Row>

                    {ads?.map((ad) => (
                <Col>
                        <SingleAd ad={ad} key={ad._id} />
                </Col>
                    ))}
            </Row>
        </Container>
    )
}

export default MyAds
