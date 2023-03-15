import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import {
  createResource,
  getResourceById,
  updateResource,
} from "../../../services/resource.service";
import { getResourceCategory } from "../../../store/resource";

const Editor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    // content: yup.string("").required("Content is required"),
  })
  .required();

const AddCategory = (props) => {
  const dispatch = useDispatch();

  //form validate and config
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    unregister,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const categoryData = async () => {
    const res = await getResourceById(props.currentid);
    setValue("name", res?.name);
    setValue("description", res?.description);
    if (props.parentid) {
      setValue("content", res?.content);
    }
  };

  useEffect(() => {
    if (props.currentid !== null) {
      categoryData();
    }
  }, [props.currentid]);

  useEffect(() => {
    if (props.parentname !== null) {
      setValue("categoryname", props.parentname);
    }
  }, [props.parentname]);

  const onSubmit = async (data) => {
    unregister("categoryname");
    let res = null;

    if (props.currentid) {
      if (props.parentid === null) {
        unregister("content");
        res = await updateResource(props.currentid, data);
      } else {
        res = await updateResource(props.currentid, data);
      }
    } else {
      if (props.parentid === null) {
        unregister("content");
        res = await createResource(data);
      } else {
        register("parentId", { value: props.parentid });
        res = await createResource(data);
      }
    }

    console.log("res here:: ", res);
    if (res?.success) {
      reset();
      setValue("content", "");
      dispatch(getResourceCategory());
      props.onHide();
      props.setcurrentid();
      props.setparentid();
      props.setparentname();
    }
  };

  const handleClose = () => {
    props.onHide();
    reset();
    setValue("content", "");
    props.setcurrentid();
    props.setparentid();
    props.setparentname();
  };

  return (
    <Modal {...props} style={{ top: "8%" }}>
      <Modal.Header>
        <Modal.Title>
          {props.currentid ? "Update Category" : "Add Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          {props.parentid && (
            <div className="mb-3">
              <Form.Floating>
                <Form.Control
                  {...register("categoryname")}
                  name="categoryname"
                  disabled
                  placeholder="categoryname"
                />
                <Form.Label htmlFor="name">Category Name</Form.Label>
              </Form.Floating>
            </div>
          )}
          <div className="mb-3">
            <Form.Floating>
              <Form.Control
                {...register("name")}
                name="name"
                placeholder="Name"
              />
              <Form.Label htmlFor="name">
                {props.parentid ? "Sub Category Name" : "Category Name"}
              </Form.Label>
            </Form.Floating>
            {errors.name && (
              <div className="text-danger">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-3">
            <Form.Floating>
              <Form.Control
                {...register("description")}
                name="description"
                placeholder="Description"
              />
              <Form.Label htmlFor="name">Description</Form.Label>
            </Form.Floating>
            {errors.description && (
              <div className="text-danger">{errors.description.message}</div>
            )}
          </div>
          {props.parentname && (
            <div className="mb-3">
              <Form.Floating>
                <label>Content</label>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => <Editor {...field} />}
                />
              </Form.Floating>
              {/* {errors.content && (
                <div className="text-danger">{errors.content.message}</div>
              )} */}
            </div>
          )}
          <Button type="submit">Submit</Button>
          &nbsp;
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategory;
