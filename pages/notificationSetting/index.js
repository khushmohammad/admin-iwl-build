import React, { useEffect, useState } from "react";
import Default from "../../layouts/default";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import { Container, Form, Button } from "react-bootstrap";
import {
  createNotificationSetting,
  notificationDropdownValue,
} from "../../services/resource.service";

const NotificationSetting = () => {
  const [dropdown, getDropdown] = useState([]);
  const output = async () => {
    const res = await notificationDropdownValue();

    let newValue = [];
    res.data.body.forEach((element) => {
      newValue.push({ value: element._id, label: element.dropdownValue });
    });

    getDropdown(newValue);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await createNotificationSetting(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    output();
  }, []);

  return (
    <Default>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title.."
              {...register("title")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicsubTitle">
            <Form.Label>Sub Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sub title"
              {...register("subtitle")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              {...register("desc")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSubcategorytitle">
            <Form.Label>Sub Category Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sub-category title"
              {...register("subcategory")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSubcategorytitle">
            <Form.Label>Sub Category</Form.Label>

            <Controller
              name="notification"
              control={control}
              defaultValue={[]}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={dropdown}
                  onChange={(selected) => {
                    const selectedValues = selected
                      ? selected.map((item) => item.value)
                      : [];
                    onChange(selectedValues);
                  }}
                  value={dropdown.filter((option) =>
                    value.includes(option.value)
                  )}
                />
              )}
            />
          </Form.Group>
          <Button className="btn btn-success float-end" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Default>
  );
};

export default NotificationSetting;
