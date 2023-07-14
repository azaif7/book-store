import { useState, lazy, Suspense } from "react";
import Book from "./models/Book";
import { useDispatch } from "react-redux";
import { addBook, deleteBook, updateBook } from "./store/bookSlice";
// Lazy load the components
const BookStore = lazy(() => import("./components/BookStore"));
const AddBook = lazy(() => import("./components/AddBook"));
const AlertMessage = lazy(() => import("./layouts/AlertMessage"));
const ModalWrapper = lazy(() => import("./layouts/Modal"));

function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    id: "",
  });

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCloseAlert = () => {
    setShow(false);
  };

  const addBookHandler = (values: Book, handleClose: () => void) => {
    handleClose();
    dispatch(addBook({ values }));
    setShow(true);
    setMessage("New book has been added successfully.");
  };

  const deleteBookHandler = (bookId: string) => {
    dispatch(deleteBook(bookId));
  };

  const handleAddPopup = () => {
    setOpenModal(true);
    setIsEdit(false);
  };

  const updateBookHandler = (bookId: string, updatedBook: Book) => {
    handleClose();
    dispatch(updateBook({ bookId, updatedBook }));
    setShow(true);
    setMessage("Book has been updated successfully.");
  };

  return (
    <>
      <div className="main-header">
        <div className="row">
          <div className="col-md-6">
            <h3>Book Store</h3>
          </div>
          <div className="col-md-6">
            <div className="text-end">
              <button className="btn btn-primary" onClick={handleAddPopup}>
                Add New Book
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-5">
        <Suspense fallback={<div>Loading Book Store...</div>}>
          {show ? (
            <AlertMessage
              show={show}
              message={message}
              onClose={handleCloseAlert}
            />
          ) : null}

          <ModalWrapper
            title={`${isEdit ? "Edit Book" : "New Book"}`}
            show={openModal}
            handleClose={handleClose}
            classes="confirmation"
          >
            <AddBook
              isEdit={isEdit}
              btnText={`${isEdit ? "Save" : "Add"}`}
              handleClose={handleClose}
              onAddBook={addBookHandler}
              onUpdateBook={updateBookHandler}
              selectedItem={selectedItem}
            />
          </ModalWrapper>
          <BookStore
            onDeleteBook={deleteBookHandler}
            setIsEdit={setIsEdit}
            setOpenModal={setOpenModal}
            setSelectedItem={setSelectedItem}
            handleAddPopup={handleAddPopup}
          />
        </Suspense>
      </div>
    </>
  );
}

export default App;
