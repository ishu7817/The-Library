import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { library } from './Library'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Articleread = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { slug } = useParams()
  const article = library.find((item) => item.slug === slug)

  const isblockquote = article.content.trim().startsWith('<blockquote')

  const [dark, setdark] = useState(true)
  return (

    <div >

      <div className={`min-h-screen ${dark ? "bg-black" : 'bg-white'}  flex-col  flex items-center px-4`}>

        <div className=' height-fit flex items-center mt-3'>

          <Link to="/articles">
            <button className='font-sans  italic text-sm text-[#4da6ff]/80 hover:scale:105 hover:text-[#7dd3fc]/60 transition-all duration-200  absolute left-3  '>
              ← All Articles
            </button>
          </Link>

          <div
            onClick={() => setdark(!dark)}
            className={`w-14 h-7 flex  rounded-full p-1 cursor-pointer transition-all absolute right-3 mt-4
            ${dark ? "bg-gray-300" : " bg-gray-900"}`}>
          </div>
        </div>


        <div className={` titleandsubtitle max-w-3xl  py-12`}>

          <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-blue-400 uppercase mb-8">
            <span>{article.date}</span>
            <span className="text-gray-600">•</span>
            <span>{article.readtime}</span>
          </div>

          <div className="relative">
            <div className="absolute -top-25 -left-30 w-78 h-78 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <h1 className={`article-title ${dark ? "text-white" : "text-black"}`} >
              {article.title}
            </h1>
          </div>

          <h2 className={`article-subtitle ${dark ? "text-gray-400" : "text-gray-900"}`}>
            {article.subtitle}
          </h2>
        </div>
        <hr className="w-24 border-t-2 border-blue-500/50 mt-4 mb-12" />


        <div
          className={`prose prose-lg  ${dark ? 'prose-invert prose-p:text-gray-300 prose-headings:text-gray-100' : 'prose-p:text-gray-800 prose-headings:text-gray-950'} prose-p:text-gray-300 prose-headings:text-gray-100 font-reading prose-headings:font-heading
           ${isblockquote ? '' : 'drop-cap'} `}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>




    </div>
  )
}

export default Articleread
