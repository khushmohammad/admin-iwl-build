import React, { useEffect, useState } from "react";
import { Modal, Col, Container, Row, Card } from "react-bootstrap";
import Link from "next/link";
import { getPostsByPostId } from "../../../services/posts.service.js";
import user2 from "../../../public/assets/images/user/25.png";
import Image from "next/image";
import moment from "moment";

function PostDetailsById({ showPost, postId, onHidePost }) {
  const [postDetail, setPostDetail] = useState({});
  const [readMore, setReadMore] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(0);
  const [noOfShares, setNoOfShares] = useState(0);

  const postData = async (id) => {
    try {
      if (id) {
        const res = await getPostsByPostId(id);
        console.log("res", res.data.body.feeds[0]);
        setPostDetail(res.data.body.feeds[0]);
        setNoOfLikes(res.data.body.feeds[0].likes);
        setNoOfShares(res.data.body.feeds[0].shares);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    postData(postId);
  }, [postId]);

  // post refresh mathod

  const {
    _id,
    description,
    createdAt,
    postFiles,
    isPin,
    is_SelfPost,
    share,
    userInfo,
    profileImage,
  } = postDetail;

  return (
    <Modal show={showPost} onHide={onHidePost} centered>
      <Container>
        <Row>
          <Col lg={8} className="row m-0 p-0 mx-auto">
            <Col sm={12}>
              <Card className="card-block card-stretch card-height">
                <Card.Body>
                  <Modal.Header closeButton>
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <Image
                            className="rounded-circle img-fluid"
                            src={profileImage?.location || user2}
                            alt=""
                            height={53}
                            width={53}
                          />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between">
                            <div>
                              <Link href={`user/${userInfo?._id}`}>
                                <h5 className="mb-0 d-inline-flex">
                                  <strong>
                                    {`${userInfo?.firstName ||
                                      ""}   ${userInfo?.lastName || ""} `}
                                  </strong>
                                </h5>
                              </Link>

                              {isPin == true && is_SelfPost ? (
                                <span className="material-symbols-outlined">
                                  push_pin
                                </span>
                              ) : (
                                ""
                              )}
                              <p className="mb-0 text-primary">
                                {createdAt && moment(createdAt).fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Header>
                  <div className="mt-3">
                    {description && (
                      <div>
                        <p>
                          {readMore
                            ? description
                            : `${description.substring(0, 250)}`}
                          {description.length > 200 ? (
                            <a
                              className="text-primary text-decoration-underline ps-1 fw-bold"
                              role={`button`}
                              onClick={() => setReadMore(!readMore)}
                            >
                              {readMore ? null : "read more"}
                            </a>
                          ) : null}
                        </p>
                      </div>
                    )}
                  </div>

                  {postFiles && (
                    <>
                      {
                        <div>
                          <div className={`d-block  `}>
                            {postFiles &&
                              postFiles.slice(0, 4).map((data, index) => {
                                // console.log(data,"filedfsdData");

                                const fileData = data.file;
                                // console.log(fileData,"fileData");
                                // const clasname = 'row-span-3'
                                return (
                                  <React.Fragment key={index}>
                                    {fileData && (
                                      <>
                                        <div
                                          className={` position-relative bg-light my-3`}
                                        >
                                          {fileData.type &&
                                          fileData.type == "mp4" ? (
                                            <video
                                              width="100%"
                                              height="100%"
                                              controls
                                            >
                                              <source
                                                src={fileData.location}
                                                type="video/mp4"
                                              />
                                            </video>
                                          ) : (
                                            <Image
                                              src={fileData.location}
                                              alt="post2"
                                              className={`  img-fluid rounded w-100 `}
                                              height={500}
                                              width={500}
                                            />
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                          </div>
                        </div>
                      }
                    </>
                  )}
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-between">
                    <div>{noOfLikes} Likes</div>
                    <div>{noOfShares} Shares</div>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
}

export default PostDetailsById;
