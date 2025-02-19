import "./post.css";
import {FcLikePlaceholder} from 'react-icons/fc'
import {BiComment} from 'react-icons/bi'
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useEffect } from "react";
import axios from 'axios';

const Post = ({ post }) => {
  //console.log(post);

  const [commentOpen, setCommentOpen] = useState(false);
  post.img = post.pictureS3Path ? post.pictureS3Path : "https://grad.sfsu.edu/sites/default/files/images/resouces.jpg"
  post.profilePic = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
  const liked = false;
  const [comments, setComment] = useState([]);
  const request = "http://localhost:4000/comments/getComments"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(request, {
          withCredentials: true,
          params: { postId: post.PostID },
        });

        if (response.data.commentFound) {
          const newComments = response.data.comments.map((comment) => ({
            id: comment.CommentID,
            desc: comment.Comment,
            name: comment.FirstName + ' ' + comment.LastName,
            userId: comment.AuthorID,
            profilePicture:
              'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }));

          setComment(newComments);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []); 


  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="user Pic" />
            <div className="details">
              <Link
                to={`/profile/${post.AuthorID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.FirstName} {post.LastName}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="content">
          <p>{post.PostDescription}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FcLikePlaceholder /> : <FcLikePlaceholder />}
             Likes
          </div>
          <div className="item" onClick={ () => setCommentOpen(!commentOpen)}>
            <BiComment />
             Comments
          </div>
          <div className="item">
            
          </div>
        </div>
        {commentOpen && <Comments PostID={post.PostID} comments={comments}/>}
      </div>
    </div>
  );
};

export default Post;
