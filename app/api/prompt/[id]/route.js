import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

// GET request


  export const GET = async (req , { params}) =>  {
        
       try { 
           await connectToDB();
            
            const prompt = await Prompt.findById( params.id ).populate("creator");
            if(!prompt) return new Response("prompt not found!" , {status : 404});

            return new Response(JSON.stringify(prompt) , {status:200});

       } catch (error) {
        return new Response("failed to fetch prompts" , {status:500});
       }
       
  }

// patch req
export const PATCH = async (req , {params}) => {
      
    const {prompt , tag} = await req.json();

    try {
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("prompt not found!", {status : 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status:200});
        
    } catch (error) {
        return new Response("failed to update prompts" , {status:500});
    }
}

// delete

 export const DELETE = async ({params}) => {
        
     try {
         
         await connectToDB();
         await Prompt.findByIdAndRemove(params.id);

         return new Response("prompt deleted successfully" , {status:200});
         
     } catch (error) {
        return new Response("failed to delete prompts" , {status:500});
     }

  }