import { useEffect, useState } from "react";
import Button from "../../../util/Button";
import CommnetApi from "../../../api/CommentApi";
import Common from "../../../util/Common";
import Comment from "./Comment";
import PaginationUtil from "../../../util/Pagination/Pagination";

const CommentList = ({ id, userAlias }) => {
  const [commentData, setCommmentData] = useState("");
  const [inputComment, setInputComment] = useState("");
  // paginationutil 관련 필요 useState 2개
  const [totalPage, setTotalPage] = useState(5);
  const [page, setPage] = useState(1);

  const oninputCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  // // 댓글 리스트
  // const fetchCommentList = async () => {
  //   console.log("API 요청 전");
  //   const res = await CommnetApi.commentList(id);
  //   console.log("API 요청 후 : ", res);
  //   if (res.data !== null) {
  //     setCommmentData(res.data);
  //   }
  // };

  // 댓글 저장
  const handleSubmitComment = async () => {
    const response = await CommnetApi.saveNewComment(id, inputComment);
    console.log("댓글 결과 : ", response.data);
    if (response.data) {
      setInputComment("");
      // Common.handleTokenAxios(fetchCommentList);
      Common.handleTokenAxios(fetchPage);
      setPage(1);
    }
  };

  // useEffect(() => {
  //   Common.handleTokenAxios(fetchCommentList);
  //   console.log("boardId : " + id);
  // }, []);

  useEffect(() => {
    console.log("입력한 댓글 : " + inputComment);
  }, [inputComment]);

  // const [pageData, setPageData] = useState("");
  // const [isId, setIsId] = useState("");

  useEffect(() => {
    Common.handleTokenAxios(() => fetchPageList(page));
  }, [page]);

  useEffect(() => {
    Common.handleTokenAxios(fetchPage);
  }, []);

  // 댓글 총 페이지 수 불러오기
  const fetchPage = async () => {
    const res = await CommnetApi.commentPageCount(id);
    if (res.data !== null) {
      console.log("댓글 총 페이지 수 : ", res.data);
      setTotalPage(res.data);
      setPage(1);
      Common.handleTokenAxios(() => fetchPageList(1));
    }
  };
  // 댓글 페이지네이션 불러오기
  const fetchPageList = async (page) => {
    // res1 이라고 안해도 되요,,
    const res = await CommnetApi.commentPageList(id, page);
    if (res.data !== null) {
      console.log("댓글 페이지네이션 : ", res.data);
      // setPageData(res1.data);
      setCommmentData(res.data);
    }
  };

  return (
    <>
      {/* 댓글 영역 */}
      <div className="commentArea">
        <h3>댓글</h3>
        <div className="commentList">
          {commentData &&
            commentData.map((comment) => (
              <Comment
                key={comment.commentId}
                userAlias={userAlias}
                comment={comment}
                fetchCommentList={() =>
                  Common.handleTokenAxios(() => fetchPage())
                }
              />
            ))}
        </div>
        <PaginationUtil
          totalPage={totalPage}
          limit={5}
          page={page}
          setPage={setPage}
        />
        <div className="textInputBox">
          <textarea
            type="text"
            placeholder="100자 이하로 댓글을 남겨주세요."
            value={inputComment}
            onChange={oninputCommentChange}
          ></textarea>
          <Button
            className="postBtn"
            children="등록"
            active={inputComment.length > 0 && inputComment.length < 101}
            width="70px"
            height="30px"
            fontSize="14px"
            clickEvt={() => {
              Common.handleTokenAxios(handleSubmitComment);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CommentList;
