import { useEffect, useState } from "react"
import { Button, Col, ListGroup, Modal, Row, Form } from "react-bootstrap"
import { TrashFill } from "react-bootstrap-icons";

export interface Note {
    ID: number;
    title: string;
    description: string;
}

export interface NoteList {
    success: boolean;
    data: Note[];
}

const SingleListComponent = () => {

    const [notes, setNotes] = useState<NoteList>()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (note: Note) => {
        setSelectedNote(note)
        setUpdatedTitle(note.title)
        setUpdatedDescription(note.description)
        setShow(true);
    }
        

    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    const [updatedTitle, setUpdatedTitle] = useState('')
    const [updatedDesription, setUpdatedDescription] = useState('')


    useEffect(() => {
        fetch('http://localhost:3001/notes')
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error('errore nella fetch')
            }
        })
        .then((data) => {
            console.log(data)
            setNotes(data)
        })
        .catch((err) => console.log('errore nel recupero dati', err))
    }, [])

    const deleteNote = (id: number) => {
        fetch(`http://localhost:3001/notes/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            if(res.ok){
                window.location.reload()
                return res.json()
            } else {
                throw new Error(`errore nell'eliminazione`)
            }
        })
        .catch((err) => console.log(err))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        if(name === 'title'){
            setUpdatedTitle(value)
        } else if(name === 'description'){
            setUpdatedDescription(value)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateNote()
    }

    const updateNote = () => {
        const updatedNote = {
            ...selectedNote,
            title: updatedTitle, 
            description: updatedDesription
        }
        fetch(`http://localhost:3001/notes/${selectedNote?.ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedNote)
            })
            .then((res) => {
                if(res.ok){
                    handleClose()
                    window.location.reload()
                    return updatedNote
                } else {
                    throw new Error('errore nella modifica note')
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <ListGroup as="ul" className="mt-5">
                {
                    notes && (
                        notes.data.map((note) => {
                            console.log('ecco le notes', notes)
                            return (
                                <ListGroup.Item as="li" key={note.ID} className="mb-1">
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <h5 className="m-0">{note.title}</h5>
                                                </Col>
                                                <Col className="d-flex justify-content-center">
                                                    <p className="m-0">{note.description}</p>
                                                </Col>
                                                <Col className="d-flex justify-content-around align-items-center">
                                                    <p className="m-0" style={{ cursor: 'pointer' }} onClick={() => handleShow(note)}>MODIFY</p>
                                                    <TrashFill 
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                        deleteNote(note.ID) 
                                                        console.log(note.ID)
                                                        }}/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })
                    )
                }
            </ListGroup>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Modify your note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                            type="text" 
                            placeholder="Title"
                            name= 'title'
                            value={updatedTitle}
                            onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control 
                            type="text" 
                            placeholder="Description"
                            name= 'description'
                            value={updatedDesription}
                            onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateNote}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SingleListComponent