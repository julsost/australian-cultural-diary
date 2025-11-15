import React, {useEffect, useState} from 'react'

function makeAnon(){
  return 'Anon #' + Math.floor(100+Math.random()*900)
}

export default function Comments({entryId}){
  const key = 'diary:comments'
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  useEffect(()=>{
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : {}
    setComments(parsed[entryId] || [])
  }, [entryId])

  const post = ()=>{
    if(!text.trim()) return
    const author = makeAnon()
    const comment = {id:Date.now(), author, text, time:new Date().toISOString()}
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : {}
    const arr = parsed[entryId] || []
    parsed[entryId] = [comment, ...arr]
    localStorage.setItem(key, JSON.stringify(parsed))
    setComments(parsed[entryId])
    setText('')
  }

  return (
    <section aria-label="Comments" className="mt-4">
      <h4 className="font-medium">Comments (anonymous)</h4>
      <div className="mt-2">
        <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full p-2 border rounded" rows={3} placeholder="Share a short comment..."></textarea>
        <div className="flex justify-between items-center mt-2">
          <small className="text-xs text-gray-500">Stored locally in your browser.</small>
          <button onClick={post} className="px-3 py-1 rounded bg-eucalyptus text-white text-sm">Post</button>
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {comments.map(c=>(
          <li key={c.id} className="p-2 border rounded">
            <div className="text-xs text-gray-600">{c.author} • {new Date(c.time).toLocaleString()}</div>
            <div className="mt-1 text-sm">{c.text}</div>
          </li>
        ))}
        {comments.length===0 && <li className="text-sm text-gray-500">No comments yet — be the first!</li>}
      </ul>

      <div className="mt-3 text-xs text-gray-500">
        
      </div>
    </section>
  )
}
