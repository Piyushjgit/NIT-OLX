import React, { useEffect, useState } from "react";
import { Button, Card, Form, Offcanvas, Modal, ListGroup, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAd } from "../../actions/adActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Rules from './Rules'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreateAd({ history }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [image, setImage] = useState([]);
    const [picMessage, setPicMessage] = useState("");
    const [fiImage, setFiImage] = useState([]);
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();
    const adCreate = useSelector((state) => state.adCreate);
    const { loading, error } = adCreate;

    const resetHandler = () => {
        setTitle("");
        setDescription("");
        setPrice(0);
        setImage([]);
    };

    useEffect(() => {
        if (!image) {
            toast.error("Please Add Images");
            return;
        }
        setPicMessage(null);
        var len = 0;
        image?.map((pic) => {
            if (pic.type === "image/jpeg" || pic.type === "image/png"||true) {
                // console.log(image);
                const data = new FormData();
                data.append("file", pic);
                data.append("upload_preset", "NotesApp");
                data.append("cloud_name", "pdpcn");
                fetch(`https://api.cloudinary.com/v1_1/pdpcn/image/upload`, {
                    method: "post",
                    body: data,
                }).then((res) => res.json())
                    .then((dataa) => {
                        // console.log(dataa?.url);
                        // setFiImage([...fiImage,dataa?.url]);
                        setFiImage((prevState) => ([...prevState, dataa?.url]));
                        len++;
                        setProgress(len / image.length * 100);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                toast.error("Please Select jpeg or png image");
                return;
            }
        })
    }, [image])
    // useEffect(() => {
    //     setFiImage((prevState) => ([...prevState,fiImage]))
    // }, [fiImage])
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!title || !description || !price || !image) {
            toast.error("Please fill all fields.");
            return;
        }
        dispatch(createAd(title, description, fiImage, price));
        resetHandler();
        toast.success("Ad Created successfully");
        history.push("/home");
    }
    const [load, setLoad] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoad(false);
        }, 500)
        return () => clearTimeout(timeout);
    }, [])
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            {load ? <Loading /> :
                <>
                    {show && (<Modal show={show} onHide={() => setShow(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        scrollable={true}
                    >
                        <Modal.Header className='justify-content-center'>
                            <Modal.Title>Some Important Points</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ListGroup variant='flush' as="ol" numbered>
                                {Rules.map((rule) => (
                                    <ListGroup.Item as="li">{rule}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                Close
                    </Button>
                        </Modal.Footer>
                    </Modal>)}
                    <Card>
                        <Form.Group className='d-flex'>
                            <Button className="mx-2 w-5" onClick={() => setShow(true)} variant="danger">
                                Rules
                    </Button>
                        </Form.Group>
                        <Card.Header>Create a new Ad</Card.Header>
                        <Card.Body>
                            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                            {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="title"
                                        value={title}
                                        placeholder="What is your product ?"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="content">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={description}
                                        placeholder="Add 3-4 lines describing your product"
                                        rows={4}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        min={0}
                                        value={price}
                                        placeholder="Enter the Price"
                                        rows={4}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className='mt-3'>
                                    <span className='mr-2'>Uplaod Image</span>
                                    <input type="file" multiple
                                        onChange={(e) => {
                                            var result = Object.values(e.target.files)
                                            setImage(result)
                                        }} />
                                    <ProgressBar now={progress} className='w-25 mt-1 mb-3' label={`${progress}%`} />
                                    {/* {console.log(typeof(image))} */}
                                    {/* {console.log(image)} */}
                                    {loading && <Loading size={50} />}
                                    <Button type="submit" variant="primary">
                                        Create Ad
                                </Button>
                                    <Button className="mx-2" onClick={resetHandler} variant="danger">
                                        Reset Feilds
                                </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>

                        <Card.Footer className="text-muted">
                            Creating on - {new Date().toLocaleDateString()}
                        </Card.Footer>
                    </Card>
                </>
            }
        </>
    );
}

export default CreateAd;