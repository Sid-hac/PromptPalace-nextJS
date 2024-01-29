'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"


 export const PromptCardList = ({data , handleTagClick}) => {
     
      return (
           <div  className="mt-16 prompt_layout">
              {data.map(post => (
               <PromptCard 
                  key={post._id}
                  post={post} 
                  handelTagClick={handleTagClick}
                />
            ))}
           </div>
           
      )
 }


const Feed = () => {

  const [allPosts , setAllPosts] =  useState([]);
  
  const [searchText , setSearchText] =  useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  const fetchPosts = async () => {
   const response = await fetch("/api/prompt");
   const data = await response.json();
 
   console.log(data);
   setAllPosts(data);
 };
 
 useEffect(() => {
   fetchPosts();
 }, []);


 const filterPrompts = (searchtext) => {
  const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  return allPosts.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
  );
};


const handleTagClick = (tagName) => {
     setSearchText(tagName);

     const searchResult = filterPrompts(tagName);
     setSearchedResults(searchResult);
};

const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
 
  // debounce method
      setSearchTimeout(
          setTimeout(() => {
           const searchResult = filterPrompts(e.target.value);
           setSearchedResults(searchResult);
        }, 500)
  );
};

  return (
    <section className="feed">
        <form className="w-full relative flex-center">
             <input type="text" className="search_input peer" 
                  placeholder="search for a tag or username"
                  value={searchText}
                  onChange={handleSearchChange}
                  required                            
             />             
        </form>

        {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed;