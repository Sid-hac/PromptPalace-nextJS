import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname , useRouter } from 'next/navigation'

const PromptCard = ({post , handelTagClick , handleEdit , handleDelete} , {params}) => {

  const [copied , setCopied] =  useState();
  
    const { data : session} = useSession();
    const pathName = usePathname();
    const router = useRouter();
    console.log(post);
    

    const handleProfileClick = () => {
          
         if(session?.user.id === post.creator._id) return router.push('/profile');

         return router.push(`/profile/${post.creator,_id}?name=${post.creator.username}`)
    }
      
    const handleCopy = () => {
         
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied("") , 3000);
    }


  return (
    
      <div className='prompt_card'>
           
            <div className='flex flex-col'>

             <div className='flex justify-between items-start sm:gap-4 gap-3'>
              <div className='flex justify-between items-start sm:gap-2 gap-1' >
              <div className='flex-1 flex justify-start items-center gap-1 cursor-pointer sm:w-12 sm:h-12 w-6 h-6' onClick={handleProfileClick}>                  
                       <Image src={post.creator.image} alt='user_image' width={40} height={40} className='rounded-full object-contain' loading='lazy'/>
                </div>

                <div className='flex flex-col md:text-md text-sm'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
                    <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
                </div>

              </div>
               
               <div className='copy_btn' onClick={handleCopy}>
                 <Image src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'} alt='copy_image' width={12} height={12} />
               </div>

             </div>
             <div >
                 <p className='my-3 text-sm text-satoshi text-gray-700'>{post.prompt}</p>
                 <p 
                   className='font-inter text-sm blue_gradient cursor-pointer'
                   onClick={() => {handelTagClick && handelTagClick(post.tag)}}
                 >
                  #{post.tag}
                  </p>
             </div>
             {session?.user.id === post.creator._id && pathName ==='/profile' && (
                  <div className='flex gap-3 mt-3 justify-end border-t border-gray-100'>
                  <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
                    Edit
                  </p>
                   <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
                   Delete
                 </p>
                  </div>
                    
                )}

            </div> 
      </div>
     
  )
}

export default PromptCard;