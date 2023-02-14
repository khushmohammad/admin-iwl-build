import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {memberStatusUpdate} from '../../services/member.service';

function ModalForICEdit(props) {


    // console.log(props.apidata, "apidata")
    const { _id, firstName, lastName, gender, userName, dateOfBirth, isAccountVerified, isActive, isDeleted, isEmailVerified } = props?.apidata

    // dateOfBirth, isAccountVerified, isActive, isDeleted, isEmailVerified

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    IC Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.apidata &&
                    <div>
                        <table className="table">

                            <tbody>
                                {/* <tr>
                                    <th scope="row">Id</th>
                                    <td>{_id && _id}</td>
                                </tr> */}
                                <tr>
                                    <th scope="row">User Name</th>
                                    <td>{userName && userName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">First Name</th>
                                    <td>{firstName && firstName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last Name</th>
                                    <td>{lastName && lastName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Gender</th>
                                    <td>{gender && gender}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Date Of Birth</th>
                                    <td>{dateOfBirth && new Date(dateOfBirth).toLocaleDateString()}</td>
                                </tr>
                                {/* <tr>
                                    <th scope="row">AccountVerified</th>
                                    <td>{isAccountVerified.toString()}</td>
                                </tr> */}
                                <tr>
                                    <th scope="row">Active</th>
                                    <td>true</td>
                                </tr>
                                


                            </tbody>
                        </table>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalForICEdit


