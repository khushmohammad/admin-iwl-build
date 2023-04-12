import React from "react";
import { useState, useEffect } from "react";
import { Card, Container, Table } from "react-bootstrap";
import ReportedPost from "../../components/modals/report-post";
import Post from "../../components/modals/post";
import Default from "../../layouts/default";
import { getReportPostById, reportPost } from "../../services/posts.service";
import Pagination from "react-js-pagination";
import Link from "next/link";
import { SpinnerLoader } from "../../components/Loader/Loading";

const Report = () => {
  const [show, setShow] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [limit, setLimit] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [reportedFeeds, setReportedFeeds] = useState([]);
  const [postDetails, setPostDetails] = useState({ postId: "", postDet: [] });
  const [postId, setPostId] = useState("");
  const [loading, setLoading] = useState(false);

  const getReportPosts = async (pageNo) => {
    setLoading(true);
    try {
      const response = await reportPost(pageNo, limit);
      setLoading(false);
      const { feeds, totalReportedPosts } = response;
      setReportedFeeds(feeds);
      const noOfPage = Math.floor(totalReportedPosts / limit);

      setTotalLength(totalReportedPosts);
      setPageRange(noOfPage);
    } catch (err) {
      setLoading(false);
      console.log("error", err);
    }
  };

  const postInfo = async (elem) => {
    try {
      const response = await getReportPostById(elem._id);
      setPostDetails({ postId: elem._id, postDet: response });
      setShow(true);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getReportPosts();
  }, []);

  useEffect(() => {
    getReportPosts(currentpage);
  }, [currentpage, show]);

  return (
    <Default>
      <ReportedPost
        show={show}
        postDetails={postDetails}
        onHide={() => setShow(false)}
      />
      <Post
        showPost={showPost}
        postId={postId}
        onHidePost={() => setShowPost(false)}
      />
      <Container>
        {loading ? <SpinnerLoader /> : ""}
        <Card className="inner-page-bg bg-primary p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-white">Reports</h3>
          </div>
        </Card>
        <Table hover size="md">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Post</th>
              <th>Created By</th>
              <th>Report Count</th>
            </tr>
          </thead>
          <tbody>
            {reportedFeeds.map((elem, index) => (
              <tr key={index}>
                <td>{index + 1 + (currentpage - 1) * limit}</td>
                <td
                  role="button"
                  className="item-name w-25"
                  variant="link"
                  onClick={() => {
                    setShowPost(true);
                    setPostId(elem._id);
                  }}
                >
                  <Link
                    href="#"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {elem.description}
                  </Link>

                  {/* <span className="material-symbols-outlined">visibility</span> */}
                </td>
                <td>
                  {elem.userInfo.firstName} {elem.userInfo.lastName}
                </td>
                <td role="button" onClick={() => postInfo(elem)} variant="link">
                  <Link href="#">{elem.reportedPosts}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-center mt-5">
          {reportedFeeds && reportedFeeds.length !== 0 && (
            <Pagination
              activePage={currentpage}
              itemClass="page-item"
              linkClass="page-link"
              itemsCountPerPage={limit}
              totalItemsCount={totalLength}
              pageRangeDisplayed={pageRange}
              onChange={(e) => {
                setCurrentPage(e);
              }}
            />
          )}
        </div>
      </Container>
    </Default>
  );
};

export default Report;
