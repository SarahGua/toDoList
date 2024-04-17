import { Button, Form } from "react-bootstrap"

const FormComponent = () => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Title" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Description" />
                </Form.Group>
                
                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                        Add new one
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default FormComponent