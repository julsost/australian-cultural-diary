import React, {useState} from 'react'

export default function EditForm({entry, updateEntry}){
  const [form, setForm] = useState(entry)
  if(!entry) return <div>Select an entry to edit</div>

  const onSave = ()=>{
    updateEntry(entry.id, form)
    alert('Saved locally. To make permanent, copy your edits into content/entries.json and commit to GitHub.')
  }

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold">Edit — {entry.title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-3">
        <label className="text-sm">Title
          <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="text-sm">Date
          <input value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="text-sm">Images (comma-separated filenames in /public/images)
          <input value={form.images.join(', ')} onChange={e=>setForm({...form, images:e.target.value.split(',').map(s=>s.trim())})} className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="text-sm">Description
          <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="w-full p-2 border rounded mt-1" rows={3} />
        </label>
        <label className="text-sm">Reflection (graded)
          <textarea value={form.reflection} onChange={e=>setForm({...form, reflection:e.target.value})} className="w-full p-2 border rounded mt-1" rows={5} />
        </label>
        <div className="flex gap-2">
          <button onClick={onSave} className="px-3 py-1 rounded bg-eucalyptus text-white">Save locally</button>
        </div>

        <div className="text-sm text-gray-600 mt-2">
          After saving locally, copy the content from your browser's localStorage key <code>diary:entries</code> into <code>content/entries.json</code> and commit to GitHub to make changes permanent.
        </div>
      </div>
    </div>
  )
}
