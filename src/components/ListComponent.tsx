import { Button, Form, ListGroup } from "react-bootstrap"
import SingleListComponent from "./SingleListComponent"
import FormComponent from "./FormComponent"
// import { Trash } from "react-bootstrap-icons"

const ListComponent = () => {
    return (
        <div>
            <div className="d-flex justify-content-center my-3">
                <h1>TO DO LIST</h1>
            </div>
            <div>
                <FormComponent />
                <SingleListComponent />
            </div>
        </div>
    )
}

export default ListComponent