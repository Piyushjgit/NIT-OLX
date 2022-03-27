import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listAds } from '../../actions/adActions'
import ErrorMessage from '../../components/ErrorMessage'
import SingleAd from '../../components/SingleAd'
import Loading from '../../components/Loading'
import { Button, Container, Row, Col } from 'react-bootstrap'
const HomeScreen = () => {
    const dispatch = useDispatch();
    const adList = useSelector((state) => state.adList);
    // console.log(adList);
    const { loading, ads, error } = adList;
    console.log(ads);
    const history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const adCreate = useSelector((state) => state.adCreate);
    const { success: successCreate } = adCreate;

    const adUpdate = useSelector((state) => state.adUpdate);
    const { success: successUpdate } = adUpdate;

    const adDelete = useSelector((state) => state.adDelete);
    const { success: successDelete } = adDelete;
    useEffect(() => {
        if (!userInfo) {
            history.push('/');
        }
        else {
            dispatch(listAds());
        }
    }, [dispatch, history, userInfo, successCreate, successUpdate, successDelete])

    return (
        <Container className='mt-4'>
            <Link to='/createad'>
                <Button>
                    Create Ad
                </Button>
            </Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            {/* <Container> */}
            <Row>
                {(ads) && (ads?.map((ad) => (
                    <Col>
                        <SingleAd ad={ad} key={ad._id} />
                    </Col>
                )))}
            </Row>
            {/* </Container> */}
        </Container>
    )
}

export default HomeScreen
