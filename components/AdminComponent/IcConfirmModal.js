import { useRouter } from "next/router";
import { type } from "os";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { icStatusUpdate } from "../../services/ic.service";

import { useDispatch, useSelector } from "react-redux";
import { getAllIc } from "../../store/ic";

const IcConfirmModal = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { _id, firstName, lastName } = props?.apidata;

  console.log(props);
  const statusUpdate = (event, status, id) => {
    event.preventDefault();

    const payload = {
      action: status,
      userId: id,
    };
    console.log(payload, "payload");
    icStatusUpdate(payload, status).then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(getAllIc({ type: "All", pageNumber: 1, search: "" }));
        // router.reload();
        props.onHide();
      }
    });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4 className="text-center py-4">
          Are you sure you want to approve {firstName} {lastName}?
        </h4>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={(e) => statusUpdate(e, "Approve", _id)}
        >
          Approve
        </Button>
        <Button
          variant="primary"
          onClick={(e) => statusUpdate(e, "Decline", _id)}
        >
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IcConfirmModal;
