import React, { useState, useMemo } from 'react';
import api from '../../Services/api';
import { Button, Form, FormGroup, Container, Input, Label, Alert } from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import "./events.css";

//EventsPage show all events
export default function EventsPage(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [sport, setSport] = useState('');
    const [date, setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const submitHandler = async (e) => {
    const user_id = localStorage.getItem('user');
        e.preventDefault();
        const eventData = new FormData();

        eventData.append("thumbnail", thumbnail);
        eventData.append("sport", sport);
        eventData.append("title", title);
        eventData.append("price", price);
        eventData.append("description", description);
        eventData.append("date", date);

    
            try {
                if( title !== "" &&
                    description !== "" &&
                    price !== "" &&
                    sport !== "" &&
                    date !== "" &&
                    thumbnail !== null
                ) {
                    await api.post('/event', eventData, { headers: { user_id } })
                } else {
                    setErrorMessage(true)
                    setTimeout(() => {
                        setErrorMessage(false)
                    }, 2000)

                    console.log("Missing required data")
                }
                
            } catch (error) {
                Promise.reject(error);
                console.log(error.message);
            }

        
        return 
    }

    return(
        <Container>
            <h1>Create your Event</h1>
            <Form onSubmit={submitHandler}>
            <FormGroup>
                <Label>Upload Image:</Label>
                <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                    <Input type="file" onChange={evt => setThumbnail(evt.target.files[0])} />
                    <img src={cameraIcon} style={{ maxWidth: "50px" }} alt="upload icon img" />
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>Sport:</Label>
                <Input id="sport" type="text" value={sport} placeholder={"Sport Name"} onChange={(e) => setSport(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Title:</Label>
                <Input id="title" type="text" value={title} placeholder={"Event Title"} onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Event Description:</Label>
                <Input id="description" type="text" value={description} placeholder={"Event Description"} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Event Price:</Label>
                <Input id="price" type="text" value={price} placeholder={"Event price: £0:00"} onChange={(e) => setPrice(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Event date: </Label>
                <Input id="date" type="date" value={date} placeholder={'Event date'} onChange={(evt) => setDate(evt.target.value)} />
            </FormGroup>
            <Button type="submit">
                Create Event
            </Button>
            </Form>
            {errorMessage ? (
                <Alert className="event-validation" color="danger"> Missing required information</Alert>
            ) : null}
        </Container>
    )
}