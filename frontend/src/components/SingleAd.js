import React from 'react'
import { Card, Button, Container, Col, Row, Modal, Alert, Badge } from 'react-bootstrap'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { deleteAd } from '../actions/adActions';
const SingleAd = ({ ad }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const history = useHistory();

    const dispatch = useDispatch();
    const adDelete = useSelector((state) => state.adDelete);
    const { loading, error } = adDelete;
    const deleteHandler = (id) => {
        if (window.confirm("Are You Sure ?")) {
            dispatch(deleteAd(id));
            history.push('/home');
        }
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-4 mx-auto adCard' style={{width:'18rem' }}>
                        <Card.Img variant="top" src={ad.image[0]} style={{ width: '100%', height: '25vh' }} />
                        <Card.Body>
                            <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <> {ad.title.length > 12 ? (ad.title.substr(0, 12)+"...") : ad.title}</>
                                {(ad.seller._id === userInfo._id) &&
                                    (<div className="icons">
                                        <Link to={`updatead/${ad._id}`}><AiFillEdit /></Link>
                                        <AiFillDelete onClick={() => deleteHandler(ad._id)} style={{ cursor: 'pointer' }} />
                                    </div>)
                                }
                            </Card.Title>
                            <Card.Subtitle className="mb-2 font-weight-bold">₹{ad.price}</Card.Subtitle>
                            <Card.Text>
                                {ad.description.length > 25 ? (ad.description.substr(0, 25)+"...") : ad.description}
                            </Card.Text>
                            <div style={{ display: 'flex', justifyContent: 'space-between',alignItems:'center' }}>
                                <footer className="blockquote-footer">
                                    Created On- <cite title="Source Title">
                                        {new Date(ad?.updatedAt).toLocaleString()}</cite>
                                </footer>
                                {ad?.buyer?
                                    (
                                        <Button variant="outline-success" disabled size='sm'>Sold to - {ad?.buyer?.name}</Button>
                                    ) :
                                    (<Link to={`ad/${ad._id}`}><Button variant="danger">
                                        {/* {(ad?.seller?._id === userInfo._id) ? "View" : "Buy"} */}
                                        View
                                    </Button></Link>)
                                }
                            </div>
                        </Card.Body>
                            {/* <footer className="blockquote-footer" style={{display:'flex',justifyContent:'flex-end'}}>
                                Created On- <cite title="Source Title">
                                {new Date(ad?.createdAt).toLocaleString()}</cite>
                            </footer> */}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default SingleAd
