import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAd } from "../../actions/adActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
function CreateAd({ history }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState([]);
    const [picMessage, setPicMessage] = useState("");
    const [fiImage, setFiImage] = useState([]);

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
            return setPicMessage("Please Select a Picture");
        }
        setPicMessage(null);
        image?.map((pic) => {
            if (pic.type === "image/jpeg" || pic.type === "image/png") {
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
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                return setPicMessage("Please Select an Image");
            }
        })
    }, [image])
    // useEffect(() => {
    //     setFiImage((prevState) => ([...prevState,fiImage]))
    // }, [fiImage])
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(createAd(title, description, fiImage, price));
        if (!title || !description || !price || !image) {
            return "Please fill all fields";
        }
        resetHandler();
        history.push("/home");
    }

    return (
        <Card>
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
                            type='number'
                            min={0}
                            value={price}
                            placeholder="Enter the content"
                            rows={4}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                    <span>Uplaod Image</span>
                    <input type="file" multiple
                        onChange={(e) => {
                            var result = Object.values(e.target.files)
                            setImage(result)
                        }} />
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
    );
}

export default CreateAd;