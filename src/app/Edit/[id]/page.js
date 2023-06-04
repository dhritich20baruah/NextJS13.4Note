import Note from "../../../../model/Note"
import { redirect } from "next/navigation"
import dbConnect from "@/app/dbConnect"

export default async function Edit({params}){
    dbConnect()
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
        <form action={updateNote}>
          <div>
            <label className="text-lg ">Title</label>
            <br />
            <input
              type="text"
              name="title"
              className="w-[100%] md:w-[50%] bg-slate-200 h-10 p-3"
              defaultValue={notes?.title}
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
              defaultValue={notes?.note}
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