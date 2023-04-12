import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteSubscriptionPlanService } from "../../services/subscription.service";
import { getAllPlans } from "../../store/subscription";

const ConfirmBox = (props) => {
  const dispatch = useDispatch();

  const deleteSubscriptionPlan = async () => {
    if (props.planid) {
      const res = await deleteSubscriptionPlanService(props.planid);
      if (res.success) {
        dispatch(getAllPlans());
        props.onHide();
        props.setplanid();
      }
    }
  };

  const handleClose = () => {
    props.onHide();
    props.setplanid();
  };

  return (
    <Modal
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4> {props?.Message || "Message"}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={deleteSubscriptionPlan}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmBox;
