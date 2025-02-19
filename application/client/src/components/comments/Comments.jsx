import { useContext,useState, useEffect } from "react";
import "./comments.css";
import { AuthContext } from "../../context/authContext";
import axios from 'axios';



const  Comments = (props) => {
  
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([...props.comments]);
  // console.log(comments);
  const [inputComment, setInputComment] = useState("");
   

  const handleInput = (event) => {
    setInputComment(event.target.value);
  }

  const sendComment = (event) => {
    if (currentUser.name  && inputComment.length > 0){
      console.log(currentUser);
      // render on the site first
      setComments([{
        id: inputComment.length,
        desc: inputComment,
        name: currentUser.name,
        userId: currentUser.id,
        profilePicture:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      }, ...comments]);
      


      // send data to store on back end
      let addCommentRequest = "http://localhost:4000/comments/" + props.PostID + "/comments"
      //console.log(addCommentRequest);
      axios.post(addCommentRequest,{
        authorId : currentUser.id,
        commentText : inputComment,
      })
      .then((response) => {
        //console.log(response.data);
        if(response.data.commentFound){
          console.log(response.data);
          //setComment(response.data.posts); 
          
          //console.log(posts[0]);
          
          // console.log(posts);
          // console.log(posts[0].PostID);
        }

      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });

      setInputComment("");
    }
    // event.preventDefault();
  }

  
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input value={inputComment} onChange={handleInput}type="text" placeholder="write a comment" />
        <button onClick={sendComment}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
