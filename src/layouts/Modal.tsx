import { FC } from "react";
import Modal from "react-bootstrap/Modal";

interface ModalWrapperProps {
  show: boolean;
  title: string;
  classes?: string;
  handleClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  show,
  title,
  classes,
  handleClose,
  children,
}) => {
  return (
    <>
      <Modal
        className={classes ? classes : ""}
        show={show}
        centered
        animation={false}
        onHide={handleClose}
      >
        <Modal.Header>
          <h1 className="w-100">{title}</h1>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default ModalWrapper;
