import Note from "../../model/Note";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";

export default function Home() {
  async function newNote(data) {
    "use server";
    let title = data.get("title")?.valueOf();
    let note = data.get("note")?.valueOf();

    try {
      dbConnect()
      let newNote = new Note({ title, note });
      await newNote.save();
      console.log(newNote);
    } catch (error) {
      console.log(error)
    }
    redirect("/show");
  }

  return (
    <main className="m-10 space-y-5">
      <h1 className="text-xl font-bold">Create Note</h1>
      <form action={newNote}>
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
  );
}
