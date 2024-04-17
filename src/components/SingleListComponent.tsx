import { ListGroup } from "react-bootstrap"

const SingleListComponent = () => {
    return (
        <div>
            <ListGroup as="ul" className="mt-5">
                <ListGroup.Item as="li" className="d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Title</h5>
                    <p className="m-0">Description</p>
                    <p className="m-0">DELETE</p>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default SingleListComponent