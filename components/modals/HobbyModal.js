import React, { useEffect, useState } from "react";
import { Button, ToggleButton, Modal, Form } from "react-bootstrap";
import { getToken } from "../../services/user.service";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserDetails, updateUserInfo } from "../../store/profile";
import { useDispatch } from "react-redux";

const HobbyModal = ({ heading, onHide, ...props }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data.body);
  const allHobbies = user.hobbies;
  const [hobby, setHobby] = useState([]);
  const [userhobbies, setUserhobbies] = useState({
    hobbies: [],
  });

  // Hobbies Check Uncheck
  const hobbyIds = [];
  allHobbies.map((allHobby) => {
    hobbyIds.push(allHobby.hobbyId._id);
  });

  // Get Hobbies API
  useEffect(() => {
    const getHobby = async () => {
      const token = await getToken("/api/handler");
      // AccessToken();
      // console.log("TOKEN:", token.data);
       await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/profiles/dropdowns/values/Hobby`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      ).then(res =>setHobby(res.data.body)).catch(err => console.log(err))
      
    };
    getHobby();
  }, []);

  // Hobbies Submit Function
  const handleHobbies = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      // setUserhobbies([...userhobbies,value])
      setUserhobbies({
        ...userhobbies,
        hobbies: [...userhobbies.hobbies, value],
      });
    } else {
      setUserhobbies({
        ...userhobbies,
        hobbies: userhobbies.hobbies.filter((e) => e !== value),
      });
    }
  };

  // Update Hobbies Function
  const updateHobbies = async () => {
    // console.log("ALL HOBBIES", userhobbies.hobbies);
    await dispatch(updateUserInfo(userhobbies));
    await dispatch(getUserDetails());
    onHide();
  };
  // console.log("hooby ids", hobbyIds);
  // console.log("hoobys", userhobbies);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
          <div className="mb-4 text-center w-50 m-auto">
            {hobby.map((hob, index) => {
              return (
                <div key={hob._id} id="ck-button">
                  <label>
                    <input
                      type="checkbox"
                      value={hob._id}
                      name={hob.dropdownKey}
                      id={`toggle-check-${index}`}
                      onChange={(e) => handleHobbies(e)}
                      defaultChecked={hobbyIds.includes(hob._id)}
                    />
                    <span>{hob.dropdownValue}</span>
                  </label>
                </div>
              );
            })}
          </div>
          {/* <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter hobby name" />
            </Form.Group>
          </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="outline-primary">
            Close
          </Button>
          <Button onClick={updateHobbies}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HobbyModal;
