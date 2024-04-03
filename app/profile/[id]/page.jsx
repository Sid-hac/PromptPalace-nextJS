'use client'
import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter , useSearchParams } from "next/navigation"
import { useState  , useEffect} from "react"


const UserProfile = ({params}) => {
     
   const [userposts , setUserPosts] = useState([]);
   const {data : session} =  useSession();
   const router = useRouter();
   
  
   const searchparams = useSearchParams();
   const username = searchparams.get('name');
   


   useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();

        setUserPosts(data);
      };
        if (params?.id) fetchPosts();
      }, [params.id]);


  return (
    <Profile 
       name = {username}
       desc = {`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
       data = {userposts}
    
    />
  )
}

export default UserProfile;