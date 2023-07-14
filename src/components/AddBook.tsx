import { FC } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik, FormikHelpers, FormikValues } from "formik";
import Book from "../models/Book";
import { bookValidation } from "../helpers/validations";

const AddBook: FC<{
  isEdit: boolean;
  btnText: string;
  selectedItem: Book;
  handleClose: () => void;
  onAddBook: (values: Book, handleClose: () => void) => void;
  onUpdateBook: (id: string, values: Book) => void;
}> = (props) => {
  const initialValues: Book = {
    name: props?.isEdit ? props?.selectedItem?.name : "",
    price: props?.isEdit ? props?.selectedItem?.price : "",
    category: props?.isEdit ? props?.selectedItem?.category : "",
    description: props?.isEdit ? props?.selectedItem?.description : "",
    id: props?.isEdit ? props?.selectedItem?.id : "",
  };

  const handleSubmit = (values: Book) => {
    if (props?.isEdit) {
      props?.onUpdateBook(props?.selectedItem?.id, values);
    } else {
      props.onAddBook(values, props.handleClose);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        validationSchema={bookValidation}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          handleChange,
          errors,
          values,
          touched,
          isValid,
          dirty,
          isSubmitting,
          handleBlur,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className="d-flex flex-column modal-body-inner pt-5">
              <div className="content-wrap">
                <Row>
                  <Col md={12}>
                    <Form.Group className={`form-group mb-4`}>
                      <div className="form-floating">
                        <Form.Control
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="name"
                          value={values.name}
                          type="text"
                          id="name"
                          placeholder="Enter Name"
                          maxLength={30}
                        />
                        <label htmlFor="name">Enter Name</label>
                        {touched.name && errors.name ? (
                          <p className="error-msg">{errors.name}</p>
                        ) : null}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className={`form-group mb-4`}>
                      <div className="form-floating position-relative">
                        <Form.Control
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="price"
                          value={values.price}
                          type="text"
                          id="price"
                          placeholder="Enter Price"
                          maxLength={15}
                          className="left-icon"
                        />
                        <label htmlFor="price">Enter Price</label>
                        <span className="price-prefix">$</span>
                        {touched.price && errors.price ? (
                          <p className="error-msg">{errors.price}</p>
                        ) : null}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className={`form-group mb-4`}>
                      <div className="form-floating">
                        <Form.Control
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="category"
                          value={values.category}
                          type="text"
                          id="category"
                          placeholder="Enter Category"
                          maxLength={30}
                        />
                        <label htmlFor="category">Enter Category</label>
                        {touched.category && errors.category ? (
                          <p className="error-msg">{errors.category}</p>
                        ) : null}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className={`form-group mb-4`}>
                      <div className="form-floating">
                        <Form.Control
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="description"
                          value={values.description}
                          type="textarea"
                          id="description"
                          placeholder="Enter Description"
                          maxLength={200}
                        />
                        <label htmlFor="description">Enter Description</label>
                        {touched.description && errors.description ? (
                          <p className="error-msg">{errors.description}</p>
                        ) : null}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div className="footer-wrap text-end">
                <Button
                  id="cancelButton"
                  type="button"
                  variant="dark"
                  onClick={props.handleClose}
                  className="me-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  id="submitButton"
                  variant="primary"
                  disabled={!(isValid && dirty) || isSubmitting}
                >
                  {props?.btnText}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddBook;
