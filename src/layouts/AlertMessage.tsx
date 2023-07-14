import { FC } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage: FC<{
  show: boolean;
  message: string;
  onClose: () => void;
}> = (props) => {
  return (
    <>
      <Alert
        variant="success"
        role="alert"
        onClose={props?.onClose}
        dismissible
      >
        {props?.message}
      </Alert>
    </>
  );
};

export default AlertMessage;
