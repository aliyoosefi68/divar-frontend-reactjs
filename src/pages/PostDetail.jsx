import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "src/components/module/Loader";
import PostPage from "src/components/templates/PostPage";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`http://localhost:3000/post/${id}`);
      const data = await res.json();
      setPost(data?.data.post);
      console.log(data.data.post);
    };
    getPost();
  }, []);
  if (!post) return <Loader />;
  return (
    <div>
      <PostPage data={post} />
    </div>
  );
}

export default PostDetail;
