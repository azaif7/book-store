import { FC } from "react";
import Book from "../models/Book";
import BookList from "./BookList";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../store/store";

const BookStore: FC<{
  setIsEdit: (value: boolean) => void;
  setOpenModal: (value: boolean) => void;
  onDeleteBook: (bookId: string) => void;
  setSelectedItem: ({}: Book) => void;
  handleAddPopup: () => void;
}> = (props) => {
  const books = useSelector((state: RootState) => state.book);
  return (
    <>
      {books.books.length === 0 ? (
        <>
          <h5>No books in the store.</h5>
          <button className="btn btn-primary" onClick={props?.handleAddPopup}>
            Add New Book
          </button>
        </>
      ) : (
        <Row className="ul-todos mt-5">
          {books.books?.map((item, index) => (
            <BookList
              key={index}
              name={item?.name}
              price={item?.price}
              category={item?.category}
              description={item?.description}
              id={item?.id}
              setIsEdit={props?.setIsEdit}
              setOpenModal={props?.setOpenModal}
              setSelectedItem={props?.setSelectedItem}
              onDeleteBook={props.onDeleteBook.bind(null, item?.id)}
            />
          ))}
        </Row>
      )}
    </>
  );
};

export default BookStore;
