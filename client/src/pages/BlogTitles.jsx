import { Edit, Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogTitles = () => {

  let categories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food',
  ];

  let [category, setCategory] = useState(categories[0]);
  let [input, setInput] = useState('');

  let [loading, setLoading] = useState(false);
  let [content, setContent] = useState('');
  const {getToken} = useAuth();

  async function handleSubmit(e){
    e.preventDefault();

    try {
      setLoading(true);

        let prompt = `Generate a blog title for the keyword ${input} in the category ${category}`;

        const {data} = await axios.post('api/ai/generate-blog-title', {prompt}, {
          headers: {Authorization:`Bearer ${await getToken()}`}
        })

        if(data.success){
          setContent(data.content)
          toast.success('Blog titles successfully generated')
        }
        else{
          toast.error(data.message);
        }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false)
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-8 text-slate-700'>
    
            {/* left col */}
            <form className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 space-y-6' onSubmit={handleSubmit}>
    
                <div className='flex items-center gap-3'>
                  <Sparkles className='w-6 text-[#8E37EB]'/>
                  <h1 className='text-xl font-medium'>AI Title Generator</h1>
                </div>
    
                <label htmlFor="topic" className='text-sm font-medium'>Keyword</label> 
                <input type="text" id='topic' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The future of Artificial Intelligence' required onChange={(e)=>setInput(e.target.value)} value={input}/>
    
                <p className='mt-4 text-sm font-medium'>Category</p>
    
                <div className='mt-3 flex gap-3 flex-wrap sm:max-w-[82%]'>
                  {categories.map((item, index)=>(
                    <span key={index} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${item===category ? 'bg-purple-50 text-purple-700':'text-gray-500 border-gray-300'} `} onClick={()=>setCategory(item)}>{item}</span>
                  ))}
                </div>
    
                <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-10 text-sm rounded-lg cursor-pointer'>
                  {
                    loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                      : <Hash className='w-5' />
                  }
                  Generate Title
                </button>
    
            </form>
    
    
            {/* right col */}
            <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 h-120'>
                  <div className='flex items-center gap-3'>
                    <Hash className='w-5 h-5 text-[#8E37EB]'/>
                    <h1 className='text-xl font-semibold'>Generated Titles</h1>
                  </div>
    
            {!content ? (<div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Hash className='w-9 h-9' />
                <p>Enter keywords and click "Generate Titles" to get started</p>
              </div>
            </div>) : (
              <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
                <div className='reset-tw'>
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            )}
                  
            </div>
    
        </div>
  )
}

export default BlogTitles