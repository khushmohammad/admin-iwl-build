import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import dynamic from "next/dynamic";
import {
  createHelpService,
  getHelpService,
  updateHelp,
} from "../../../services/help.service";
import { useDispatch } from "react-redux";
import { title } from "process";
import { getHelpCategory } from "../../../store/help";

const Editor = dynamic(() => import("../../../components/Editor"), {
  ssr: false,
});

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string("").required("Description is required"),
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
    const res = await getHelpService(props.currentid);
    setValue("title", res?.helpInfo?.title);
    setValue("description", res?.helpInfo?.description);
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
      if (props.parentid) {
        register("parentId", { value: props.parentid });
        res = await updateHelp(props.currentid, data);
      } else {
        res = await updateHelp(props.currentid, data);
      }
    } else {
      if (props.parentid) {
        register("parentId", { value: props.parentid });
        res = await createHelpService(data);
      } else {
        res = await createHelpService(data);
      }
    }
    if (res?.success) {
      reset();
      setValue("description", "");
      dispatch(getHelpCategory());
      props.onHide();
    }
  };

  const handleClose = () => {
    props.onHide();
    props.setCurrentId();
    props.setParentId();
    props.setPatentName();
    reset();
    setValue("description", "");
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
                {...register("title")}
                name="title"
                placeholder="Title"
              />
              <Form.Label htmlFor="name">
                {props.parentid ? "Sub Category Name" : "Category Name"}
              </Form.Label>
            </Form.Floating>
            {errors.title && (
              <div className="text-danger">{errors.title.message}</div>
            )}
          </div>
          <div className="mb-3">
            <Form.Floating>
              <label>Description</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Editor {...field} />}
              />
            </Form.Floating>
            {errors.description && (
              <div className="text-danger">{errors.description.message}</div>
            )}
          </div>
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
