import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteAd, updateAd } from "../../actions/adActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
// import ReactMarkdown from "react-markdown";

function UpdateAd({ match, history }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState([]);

    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const adUpdate = useSelector((state) => state.adUpdate);
    const { loading, error } = adUpdate;

    
    const adDelete = useSelector((state) => state.adDelete);
    const { loading: loadingDelete, error: errorDelete } = adDelete;
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteAd(id));
        }
        history.push("/home");
    };
    const resetHandler = () => {
        setTitle("");
        setDescription("");
        setPrice(0);
        setImage([]);
    };
    

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/ads/${match.params.id}`);
            console.log(data);
            setTitle(data.title);
            setDescription(data.description);
            setPrice(data.price);
            setImage(data.image);
            setDate(Date.now());
        };
        fetching();
    }, [match.params.id]);

    const updateHandler = (e) => {
        e.preventDefault();
        if (!title || !description || !price) return;
        dispatch(updateAd(title, description, image, price, match.params.id));
        resetHandler();
        history.push("/home");
    };

    return (
        
            <Card>
                <Card.Header>Edit your Ad</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="title"
                            value={title}
                            placeholder="Enter the title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="content">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            placeholder="Enter the content"
                            rows={4}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            value={price}
                            placeholder="Enter the content"
                            rows={4}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button variant="primary" type="submit">
                            Update Ad
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(match.params.id)}
                        >
                            Delete Ad
            </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    {/* Updated on - {date.substring(0, 10)} */}
                </Card.Footer>
            </Card>
    );
}

export default UpdateAd;