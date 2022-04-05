import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listAds } from '../../actions/adActions'
import ErrorMessage from '../../components/ErrorMessage'
import SingleAd from '../../components/SingleAd'
import Loading from '../../components/Loading'
import { Button, Container, Row, Col } from 'react-bootstrap'
import Pagination from "@vlsergey/react-bootstrap-pagination";

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
