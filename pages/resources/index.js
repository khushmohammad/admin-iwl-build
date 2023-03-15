import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Button,
  Modal,
  Form,
  Row,
} from "react-bootstrap";
import Default from "../../layouts/default";
import {
  getAllCategoryData,
  deleteResourceById,
} from "../../services/resource.service";
// import Editor from '../../components/Editor';

import { useDispatch, useSelector } from "react-redux";
import { getResourceCategory } from "../../store/resource";
import AddCategory from "../../components/modals/resource/AddCategory";

function ResourcePage() {
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [parentName, setParentName] = useState(null);

  const dispatch = useDispatch();

  const category = useSelector((state) => state?.resource?.category);

  const resourceData = {
    headers: ["#", "Title", "Description", "Action"],
    rows: category,
  };

  useEffect(() => {
    dispatch(getResourceCategory());
  }, []);

  const toggleRow = async (index, parentId) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([index]);
    }
  };

  const editCategory = (id, parentid, parentname) => {
    setShowModal(true);
    setCurrentId(id);
    setParentId(parentid);
    setParentName(parentname);
  };

  const addSubCategory = (id, name) => {
    setShowModal(true);
    setParentId(id);
    setParentName(name);
  };

  const DeleteResourceById = async (id) => {
    await deleteResourceById(id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(getResourceCategory());
      }
    });
  };

  return (
    <Default>
      <Container>
        <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Category
        </Button>

        <AddCategory
          show={showModal}
          onHide={() => setShowModal(false)}
          currentid={currentId}
          setcurrentid={() => setCurrentId(null)}
          parentid={parentId}
          setparentid={() => setParentId(null)}
          parentname={parentName}
          setparentname={() => setParentName(null)}
        />

        <Row>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Category</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      {resourceData.headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {resourceData?.rows?.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <th scope="row">
                            <strong>{index + 1}</strong>
                          </th>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>
                            <span
                              onClick={() =>
                                editCategory(item?._id, item?.parentId)
                              }
                              role="button"
                              className="material-symbols-outlined mt-2"
                            >
                              edit
                            </span>
                            <span
                              onClick={() => DeleteResourceById(item?._id)}
                              role="button"
                              className="material-symbols-outlined mt-2"
                            >
                              delete
                            </span>
                            <span
                              onClick={() =>
                                addSubCategory(item?._id, item?.name)
                              }
                              role="button"
                              className="material-symbols-outlined mt-2"
                            >
                              add
                            </span>
                          </td>
                          <td>
                            <span
                              className="material-symbols-outlined"
                              role="button"
                              onClick={() => toggleRow(index)}
                            >
                              {expandedRows.includes(index)
                                ? "chevron_right"
                                : "expand_more"}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5">
                            {item?.subCategories.length > 0 &&
                            expandedRows.includes(index) ? (
                              <table className="table table-dark table-bordered table-hover">
                                <thead>
                                  <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Content</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item?.subCategories?.map(
                                    (subCat, subidx) => (
                                      <tr key={subidx}>
                                        <th scope="row">#</th>
                                        <td>{subCat.name}</td>
                                        <td>{subCat.description}</td>
                                        <td className="text-truncate">
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: subCat.content,
                                            }}
                                          ></div>
                                        </td>
                                        <td>
                                          <span
                                            onClick={() =>
                                              editCategory(
                                                subCat?._id,
                                                subCat?.parentId,
                                                item?.name
                                              )
                                            }
                                            className="material-symbols-outlined mt-2"
                                          >
                                            edit
                                          </span>

                                          <span
                                            onClick={() =>
                                              DeleteResourceById(subCat._id)
                                            }
                                            className="material-symbols-outlined mt-2"
                                          >
                                            delete
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            ) : null}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Default>
  );
}

export default ResourcePage;
