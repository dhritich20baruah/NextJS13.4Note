const mongoose = require('mongoose')
import Note from '../../../model/Note'
import Delete from '../components/Delete'
import Link from 'next/link'

export default async function show(){

    await mongoose
    .connect("mongodb://127.0.0.1:27017/NextJS13_4", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const notes = await Note.find()

    return(
        <main className='m-10 space-y-5'>
        <h1 className='text-xl font-bold'>Notes</h1>
        <div>
            <ul className="flex font-bold">
                <li className="flex-1">Title</li>
                <li className="flex-1">Note</li>
                <li className="flex-1">Options</li>
            </ul>
            <hr/>
            {notes.map((element)=>{
                return(
                    <>
                    <ul key={element._id} className='flex'>
                        <li className='flex-1'>{element.title}</li>
                        <li className='flex-1'>{element.note}</li>
                        <li className='flex-1'>
                            <div className='flex'>
                           <Delete id={element._id}/>
                           <Link href={'/Edit/'+element._id}>
                            <button className='p-2 m-2 bg-blue-600 text-white hover:cursor-pointer'>Edit</button>
                            </Link>
                            </div>
                        </li>
                    </ul>
                    <hr/>
                    </>
                )
            })}
        </div>
        </main>
    )
}