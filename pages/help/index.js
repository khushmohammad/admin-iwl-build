import React, { useState, useEffect } from "react";
import { Card, Col, Container, Button, Row } from "react-bootstrap";
import Default from "../../layouts/default";

import { useDispatch, useSelector } from "react-redux";
import { getHelpCategory } from "../../store/help";
import { deleteHelp, getHelpService } from "../../services/help.service";
import AddCategory from "../../components/modals/help/AddCategory";

const HelpPage = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandedSubCatRow, setExpandedSubCatRow] = useState([]);
  const [subCategory, setSubCategory] = useState(null);
  const [subChildCategory, setSubChildCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [ParentCategoryTitle, setParentCategoryTitle] = useState(null);

  const dispatch = useDispatch();

  const helpCategory = useSelector((state) => state?.help?.category);

  console.log("helpcat::", helpCategory);
  console.log("subcat::", subCategory);
  console.log("subpcatchild::", subChildCategory);

  const CategoryData = {
    headers: ["#", "Title", "Description", "Action"],
    rows: helpCategory?.helpChildInfo,
  };

  const SubCategoryData = {
    headers: ["#", "Title", "Description", "Action"],
    rows: subCategory?.helpChildInfo,
  };

  const SubChildCategoryData = {
    headers: ["#", "Title", "Description", "Action"],
    rows: subChildCategory?.helpChildInfo,
  };

  useEffect(() => {
    dispatch(getHelpCategory());
  }, []);

  const toggleRow = async (index, parentId) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      // setExpandedRows([...expandedRows, index]);
      setExpandedRows([index]);
    }
    const res = await getHelpService(parentId);
    setSubCategory(res);
  };

  const toggleSubRow = async (index, parentId) => {
    console.log("---index---", index);
    if (expandedSubCatRow.includes(index)) {
      setExpandedSubCatRow(expandedRows.filter((i) => i !== index));
    } else {
      // setExpandedSubCatRow([...expandedRows, index]);
      setExpandedSubCatRow([index]);
    }
    const res = await getHelpService(parentId);
    setSubChildCategory(res);
  };

  const deleteHelpCategory = async (helpId, parentId, level) => {
    const res = await deleteHelp(helpId);
    console.log(res);
    if (res?.success) {
      if (parentId) {
        let res = await getHelpService(parentId);
        if (level === 1) {
          setSubCategory(res);
        }
        setSubChildCategory(res);
      }
      dispatch(getHelpCategory());
    }
  };

  const editAndUpdateCategory = (helpId) => {
    setShowModal(true);
    setCurrentId(helpId);
  };

  const addSubCategory = (parentid, parentName) => {
    setShowModal(true);
    setParentCategoryTitle(parentName);
    setParentId(parentid);
  };

  const subCastegoryList = (categoryid) => {
    return (
      <>
        {SubCategoryData?.rows?.map((subrow, index) => {
          if (categoryid === subrow?.parentId) {
            return (
              <React.Fragment key={index}>
                <table className="table dark">
                  <tr>
                    <td>{index + 1}</td>
                    <td>{subrow.title}</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: subrow.description,
                        }}
                      />
                    </td>
                    <td>
                      <span
                        onClick={() => editAndUpdateCategory(subrow._id)}
                        role="button"
                        className="material-symbols-outlined mt-2"
                      >
                        edit
                      </span>
                      {"  "}
                      <span
                        onClick={() =>
                          deleteHelpCategory(
                            subrow._id,
                            subrow.parentId,
                            subrow.level
                          )
                        }
                        role="button"
                        className="material-symbols-outlined mt-2"
                      >
                        delete
                      </span>
                      <span
                        onClick={() => addSubCategory(subrow._id, subrow.title)}
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
                        onClick={() => toggleSubRow(index, subrow._id)}
                      >
                        {expandedSubCatRow.includes(index)
                          ? "chevron_right"
                          : "expand_more"}
                      </span>
                    </td>
                  </tr>
                </table>
                {SubChildCategoryData &&
                  SubChildCategoryData.length !== 0 &&
                  expandedSubCatRow.includes(index) && (
                    <tr>
                      <td colSpan={SubChildCategoryData.headers.length + 1}>
                        {subCastegoryChildList(subrow?._id)}
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            );
          }
        })}
      </>
    );
  };

  const subCastegoryChildList = (categoryid) => {
    return (
      <>
        {SubChildCategoryData?.rows?.map((subrow, index) => {
          if (categoryid === subrow?.parentId) {
            return (
              <table className="table" key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{subrow.title}</td>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: subrow.description,
                      }}
                    />
                  </td>
                  <td>
                    <span
                      onClick={() => editAndUpdateCategory(subrow._id)}
                      role="button"
                      className="material-symbols-outlined mt-2"
                    >
                      edit
                    </span>
                    {"  "}
                    <span
                      onClick={() =>
                        deleteHelpCategory(
                          subrow._id,
                          subrow.parentId,
                          subrow.level
                        )
                      }
                      role="button"
                      className="material-symbols-outlined mt-2"
                    >
                      delete
                    </span>
                  </td>
                </tr>
              </table>
            );
          }
        })}
      </>
    );
  };

  return (
    <Default>
      <Container>
        <AddCategory
          show={showModal}
          onHide={() => setShowModal(false)}
          currentid={currentId}
          setCurrentId={() => setCurrentId(null)}
          parentid={parentId}
          setParentId={() => setParentId(null)}
          parentname={ParentCategoryTitle}
          setPatentName={() => setParentCategoryTitle(null)}
        />

        <Button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Add Category
        </Button>

        <Row>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              {/* <div className="header-title">
                <h4 className="card-title">Striped Rows</h4>
              </div> */}
            </Card.Header>
            <Card.Body>
              <table className="table ">
                <thead>
                  <tr>
                    {CategoryData.headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CategoryData?.rows?.map((row, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{row.title}</td>
                        <td>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: row.description,
                            }}
                          />
                        </td>
                        <td>
                          <span
                            onClick={() => editAndUpdateCategory(row._id)}
                            role="button"
                            className="material-symbols-outlined mt-2"
                          >
                            edit
                          </span>
                          {"  "}
                          <span
                            onClick={() => deleteHelpCategory(row._id)}
                            role="button"
                            className="material-symbols-outlined mt-2"
                          >
                            delete
                          </span>
                          {"  "}
                          <span
                            onClick={() => addSubCategory(row._id, row.title)}
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
                            onClick={() => toggleRow(index, row._id)}
                          >
                            {expandedRows.includes(index)
                              ? "chevron_right"
                              : "expand_more"}
                          </span>
                        </td>
                      </tr>
                      {SubCategoryData &&
                        SubCategoryData.length !== 0 &&
                        expandedRows.includes(index) && (
                          <tr>
                            <td colSpan={CategoryData.headers.length + 1}>
                              {subCastegoryList(row?._id)}
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Default>
  );
};

export default HelpPage;
