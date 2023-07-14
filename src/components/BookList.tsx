import { FC } from "react";
import { Col, Card, Button } from "react-bootstrap";
import Book from "../models/Book";

const BookList: FC<{
  name: string;
  price: string;
  category: string;
  description: string;
  id: string;
  setIsEdit: (value: boolean) => void;
  setOpenModal: (value: boolean) => void;
  onDeleteBook: () => void;
  setSelectedItem: ({}: Book) => void;
}> = (props) => {
  const handleEditPopup = () => {
    props.setIsEdit(true);
    props.setOpenModal(true);
    props.setSelectedItem({
      name: props?.name,
      price: props?.price,
      category: props?.category,
      description: props?.description,
      id: props?.id,
    });
  };
  return (
    <>
      <Col md={4} className="d-flex flex-column">
        <Card className="cursor-pointer mb-4 flex-auto">
          <Card.Header onClick={handleEditPopup} className="card-bg">
            <h4>Title:&nbsp;{props?.name}</h4>
          </Card.Header>
          <Card.Body onClick={handleEditPopup}>
            <p>
              <b>Price:&nbsp;</b>
              {`$` + props?.price}
            </p>
            <p>
              <b>Category:</b>&nbsp;{props?.category}
            </p>
            <p>
              <b>Description:&nbsp;</b>
              {props?.description}
            </p>
          </Card.Body>
          <Button
            variant="danger"
            className="w-100"
            onClick={props.onDeleteBook}
          >
            Delete
          </Button>
        </Card>
      </Col>
    </>
  );
};

export default BookList;
