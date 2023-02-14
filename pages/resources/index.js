import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Button, Modal, Form } from 'react-bootstrap'
import Default from '../../layouts/default'
import data from './../resourcedata';
import { getAllCategoryData, createResource, updateResource, deleteResourceById } from "../../services/resource.service";
// import Editor from '../../components/Editor';

import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('../../components/Editor'), {
  ssr: false,
})


function index() {

  const [isEdit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [subcategoryshow, setsubcategoryShow] = useState(false);
  const [categoryList, setCategoryInsert] = useState(null);
  const [category, setData] = useState({ id: 0, parentId: 0, name: '', description: '' });
  const [subcategory, setsubcatData] = useState({ id: 0, parentId: 0, categoryname: '', name: '', description: '', content: '' });


  const getallCtegory = async () => {
    const data = await getAllCategoryData();
    setCategoryInsert(data)
  };


  useEffect(() => {

    getallCtegory();
  }, [])

  const handleSubClose = () => setsubcategoryShow(false);
  const handleSubShow = (item) => {
    setsubcategoryShow(true);
    subcategory.parentId = item._id;
    subcategory.categoryname = item.name;
    subcategory.name = '';
    subcategory.description = '';
    subcategory.content = '';
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    category.id = 0;
    category.parentId = 0;

    category.name = '';
    category.description = '';
    setShow(true);
  }

  const editCategory = (item) => {
    setEdit(true);
    setData({ id: item._id, parentId: item.parentId, name: item.name, description: item.description });
    setShow(true);
  }
  const editsubCategory = (subitem, categoryName) => {
    setsubcatData({ id: subitem._id, parentId: subitem.parentId, categoryname: categoryName, name: subitem.name, description: subitem.description, content: subitem.content });
    setsubcategoryShow(true);
  }


  const handleSubmit = event => {
    event.preventDefault();
    if (category.id != undefined && category.id === 0) {
      const payload = {
        name: category.name,
        description: category.description
      };

      createResource(payload)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            getallCtegory();
          }
        })
      // data.Category.push(category);
    }
    else {
      const updatePayload = {
        name: category.name,
        description: category.description
      };
      updateResource(updatePayload, category.id)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            getallCtegory();
          }
        })
    }
    setShow(false);
  }

  const handlesubcategorySubmit = event => {
    event.preventDefault();

    if (subcategory.id != undefined && subcategory.id === 0) {
      const payload = {
        parentId: subcategory.parentId,
        name: subcategory.name,
        description: subcategory.description,
        content: subcategory.content
      };

      createResource(payload)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            getallCtegory();
          }
        })
    }
    else {
      const updatePayload = {
        parentId: subcategory.parentId,
        name: subcategory.name,
        description: subcategory.description,
        content: subcategory.content
      };
      updateResource(updatePayload, subcategory.id)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            getallCtegory();
          }
        })

    }

    setsubcategoryShow(false);
  }

  const DeleteResourceById = async (id) => {
    const res = await deleteResourceById(id).then((res) => {
      console.log(res)
      if (res.status === 200) {
        getallCtegory();
      }
    })
  };

  function createMarkup(test) {
    return { __html: test };
  }

  return (
    <Default>
      <Container>

        {/* {model start work} */}
        <button type="submit" class="btn btn-primary" onClick={handleShow}>Add Category</button>
        <Modal show={show} onHide={handleClose} style={{ top: "8%" }}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <fieldset >
                <form >
                  <Form.Floating className="mb-3" >
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control id="disabledTextInput" placeholder="Name" value={category.name} onChange={(e) => setData({ ...category, name: e.target.value })} />
                    <Form.Label htmlFor="disabledTextInput">Category Name</Form.Label>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control id="disabledTextInput" placeholder="Description" value={category.description} onChange={(e) => setData({ ...category, description: e.target.value })} />
                    <Form.Label htmlFor="disabledTextInput">Description</Form.Label>

                  </Form.Floating>
                  <Button type="submit" onClick={handleSubmit}>Submit</Button>
                  &nbsp;
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </form>
              </fieldset>
            </Form>
          </Modal.Body>

        </Modal>

        <Modal show={subcategoryshow} onHide={handleSubClose} style={{ top: "8%" }}>
          <Modal.Header closeButton>
            <Modal.Title>Add Sub Category </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <fieldset >
                <form >
                  <Form.Floating className="mb-3" >
                    <Form.Control id="disabledTextInput" disabled placeholder="Name" value={subcategory.categoryname} />

                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control id="disabledTextInput" placeholder="Name" value={subcategory.name} onChange={(e) => setsubcatData({ ...subcategory, name: e.target.value })} />
                    <Form.Label htmlFor="disabledTextInput">Sub Category Name</Form.Label>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control id="disabledTextInput" placeholder="Description" value={subcategory.description}
                      onChange={(e) => setsubcatData({ ...subcategory, description: e.target.value })} />
                    <Form.Label htmlFor="disabledTextInput">Description</Form.Label>

                  </Form.Floating>
                  <Form.Floating className="mb-3" >
                    <div>
                      <h1>Content</h1>

                      <Editor

                        value={subcategory.content}
                        onChange={(e) => setsubcatData({ ...subcategory, content: e })}
                      />

                    </div>
                  </Form.Floating>

                  <Button type="submit" onClick={handlesubcategorySubmit}>Submit</Button>
                  &nbsp;
                  <Button variant="secondary" onClick={handleSubClose}>
                    Close
                  </Button>
                </form>
              </fieldset>
            </Form>
          </Modal.Body>

        </Modal>
        {/* {model end work} */}

        <br></br>

        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Category</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead  className="resourceTbl">
                    <tr >
                      <th scope="col">Id</th>
                      <th scope="col">Category</th>
                      <th scope="col">Description</th>
                      <th scope="col">Action</th>
                      <th scope="col" className='text-center'>Sub Categories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categoryList?.map((item, idx) => (
                        <>
                          <tr key={idx}>
                            <th scope="row"><strong>{idx + 1}</strong></th>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                              <button class="btn btn-info" title='Edit Category' style={{padding: "1px 4px 1px 4px"}} onClick={e => editCategory(item)} value={item.id}><i class="material-symbols-outlined mt-2" >edit</i></button>
                              &nbsp;
                              {item?.subCategories.length == 0 ? (<button class="btn btn-primary" style={{padding: "1px 4px 1px 4px"}}  title='Delete Category' onClick={() => DeleteResourceById(item._id)} value={item._id}><i class="material-symbols-outlined mt-2">delete</i></button>) : null}
&nbsp;
                              <button class="btn btn-warning" title='Add Sub Category' style={{padding: "1px 4px 1px 4px"}} onClick={e => handleSubShow(item)} ><i class="material-symbols-outlined mt-2">add</i>
                              </button></td>

                            <td>
                              {item?.subCategories.length > 0 ? (<table className="table table-bordered table-hover">
                                <thead className="resourceTbl">
                                  <tr>
                                  <th scope="col">Id</th>
                                  <th scope="col">Category</th>
                                  <th scope="col">Description</th>
                                  <th scope="col">Content</th>
                                  <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item?.subCategories?.map((subCat, subidx) =>
                                    <tr key={subidx} style={{ backgroundColor: "rgb(238 249 255)" }} >
                                      <th scope="row">#</th>
                                      <td style={{ color: "#555770" }} >{subCat.name}</td>
                                      <td style={{ color: "#555770" }} >{subCat.description}</td>
                                      <td style={{ color: "#555770" }} className="text-truncate" ><div dangerouslySetInnerHTML={{ __html: subCat.content }}></div></td>
                                      <td className='resourceBtnTd'>
                                        <button class="btn btn-success resourceIcn"  title='Edit Sub Category'  style={{padding: "1px 4px 1px 4px"}} onClick={e => editsubCategory(subCat, item.name)} value={idx + 2}><i class="material-symbols-outlined mt-2">edit</i></button>
                                        &nbsp;
                                        <button class="btn btn-danger resourceIcn"  title='Delete Sub Category'  style={{padding: "1px 4px 1px 4px"}} onClick={() => DeleteResourceById(subCat._id)} value={subCat._id}><i class="material-symbols-outlined mt-2">delete</i></button>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>

                              </table>) : null}
                            </td>
                          </tr>




                        </>
                      ))}
                  </tbody>

                </table>
                {/* <div className='text-center' >
                                            <Pagination className='justify-content-center' >
                                                <Pagination.First />
                                                <Pagination.Prev />
                                                <Pagination.Item>{1}</Pagination.Item>
                                                <Pagination.Ellipsis />

                                                <Pagination.Item>{10}</Pagination.Item>
                                                <Pagination.Item>{11}</Pagination.Item>
                                                <Pagination.Item active>{12}</Pagination.Item>
                                                <Pagination.Item>{13}</Pagination.Item>
                                                <Pagination.Item disabled>{14}</Pagination.Item>

                                                <Pagination.Ellipsis />
                                                <Pagination.Item>{20}</Pagination.Item>
                                                <Pagination.Next />
                                                <Pagination.Last />
                                            </Pagination>

                                        </div> */}
              </div>
            </Card.Body>
          </Card>
        </Col>


      </Container>
    </Default>
  )
}

export default index