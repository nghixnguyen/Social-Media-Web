import { useState, useEffect } from 'react';
import Post from '../../components/post/Post';
import "./posts.css";
import axios from 'axios';


const Posts = (props) => {

  const [posts, setPosts] = useState([]);
  //console.log(props.request);
  useEffect(() => {

    axios.get(props.request, {withCredentials: true,})
      .then((response) => {
        //console.log(response.data);
        if(response.data.postFound){
          setPosts(response.data.posts); 
          
          //console.log(posts[0]);
          
          // console.log(posts);
          // console.log(posts[0].PostID);
        }

      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []); 

  //TEMPORARY
  // const posts = [
  //   {
  //     id: 1,
  //     name: "VJ",
  //     userId: 1,
  //     profilePic:
  //       "https://https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2F&psig=AOvVaw0ZdkdnKVwndTyRizDPLx-S&ust=1698947015158000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOjRpvyso4IDFQAAAAAdAAAAABAE.pexels.com/photos/1429812/pexels-photo-1429812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     desc: "Happy Monday!",
  //     img: "https://i.kym-cdn.https://grad.sfsu.edu/sites/default/files/images/resouces.jpg/entries/icons/original/000/039/125/cover5.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "bruh",
  //     userId: 2,
  //     profilePic:
  //     "https://images.pexels.com/photos/1429812/pexels-photo-1429812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     desc: "ooohoh ahajhddkjeh;fec k sdk;cbsdu;hcushvaebkvjbdjkvcb;h;iehfiuhars",
  //   },
  // ];

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.PostID}/>
    ))}
  </div>;
};

export default Posts;