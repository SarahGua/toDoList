import { useEffect, useState } from "react"
import { Col, ListGroup, Row } from "react-bootstrap"
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
                                                    <p className="m-0">MODIFY</p>
                                                    <TrashFill onClick={() => {
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
        </div>
    )
}

export default SingleListComponent