'use client'
import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState  , useEffect} from "react"

const MyProfile = () => {
     
   const [posts , setPosts] = useState([]);
   const {data : session} =  useSession();
   const router = useRouter();
   console.log();


   useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      };
        if (session?.user.id) fetchPosts();
      }, []);

    const handleEdit = (post) => {
          router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
           
      const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
      if(hasConfirmed){
           
           try {
               
            await fetch(`/api/prompt/${post._id.toString()}` , {
              method : "DELETE"
            });

            const filteredPost = posts.filter((p) => p._id !== post._id);
            setPosts(filteredPost);
            
           } catch (error) {
               console.log(error);
           }
      }

    }

  return (
    <Profile 
       name = "my"
       desc = "welcome to your personalized profile"
       data = {posts}
       handleEdit = {handleEdit}
       handleDelete = {handleDelete}
    
    />
  )
}

export default MyProfile;