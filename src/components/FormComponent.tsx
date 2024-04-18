import { useState } from "react"
import { Button, Form } from "react-bootstrap"

const FormComponent = () => {

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetch('http://localhost:3001/notes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((res) => {
            if(res.ok){
                setFormData({title: '', description: ''})
                window.location.reload();
            } else {
                throw new Error('errore nel post')
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control 
                    type="text" 
                    placeholder="Title"
                    name= 'title'
                    value={formData.title}
                    onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                    type="text" 
                    placeholder="Description"
                    name= 'description'
                    value={formData.description}
                    onChange={handleChange}
                    />
                </Form.Group>
                
                <div className="d-flex justify-content-center">
                    <Button variant="success" type="submit">
                        Add new one
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default FormComponent