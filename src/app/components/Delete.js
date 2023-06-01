const mongoose = require('mongoose')
import Note from '../../../model/Note'
import { redirect } from 'next/navigation'

export default async function Delete(props){
    const id = props.id
    await mongoose
    .connect("mongodb://127.0.0.1:27017/NextJS13_4", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    async function deleteNote(){
        'use server'
        await Note.deleteOne({ _id:id})
        redirect('/show')
    }
    return(
        <form action={deleteNote}>
             <button type="submit" className='p-2 m-2 bg-red-600 text-white hover:cursor-pointer'>Delete</button>
        </form>
    )
}