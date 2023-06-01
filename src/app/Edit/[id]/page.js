const mongoose = require("mongoose")
import Note from "../../../../model/Note"
import { redirect } from "next/navigation"

export default async function Edit({params}){

    await mongoose
    .connect("mongodb://127.0.0.1:27017/NextJS13_4", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const notes = await Note.findOne({_id: params.id})

    async function updateNote(data){
        "use server";
        let title = data.get("title")?.valueOf();
        let note = data.get("note")?.valueOf();
        let updatedNote = await Note.findByIdAndUpdate({_id: params.id },{ title, note });
        console.log(updatedNote);
        redirect('/show')
    }
    return(
        <main className="m-10 space-y-5">
        <h1 className="text-xl font-bold">Edit Note</h1>
        <p>Title: {notes.title}</p>
        <p>Note: {notes.note}</p>
        <form action={updateNote}>
          <div>
            <label className="text-lg ">Title</label>
            <br />
            <input
              type="text"
              name="title"
              className="w-[100%] md:w-[50%] bg-slate-200 h-10 p-3"
            />
          </div>
          <div>
            <label>Note</label>
            <br />
            <textarea
              type="text"
              name="note"
              rows="3"
              className="w-[100%] md:w-[50%] bg-slate-200 p-3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="p-3 bg-yellow-400 font-bold hover:bg-orange-500 hover:text-white"
          >
            Submit
          </button>
        </form>
      </main>
    )
}