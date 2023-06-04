import Note from "../../../model/Note";
import Delete from "../components/Delete";
import Link from "next/link";
import { redirect } from 'next/navigation'
import dbConnect from "../dbConnect";

export default async function show() {
  dbConnect()
  const notes = await Note.find();

  async function deleteNote(data) {
    "use server";
    let id = JSON.parse(data.get("id")?.valueOf());

    await Note.deleteOne({ _id: id });
    redirect("/show");
  }

  return (
    <main className="m-10 space-y-5">
      <h1 className="text-xl font-bold">Notes</h1>
      <div>
        <ul className="flex font-bold">
          <li className="flex-1">Title</li>
          <li className="flex-1">Note</li>
          <li className="flex-1">Options</li>
        </ul>
        <hr />
        {notes.map((element) => {
          return (
            <>
              <ul key={element._id} className="flex">
                <li className="flex-1">{element.title}</li>
                <li className="flex-1">{element.note}</li>
                <li className="flex-1">
                  <div className="flex">
                    <form action={deleteNote}>
                        <input type="hidden" value={JSON.stringify(element._id)} name="id"/>
                      <button
                        type="submit"
                        className="p-2 m-2 bg-red-600 text-white hover:cursor-pointer"
                      >
                        Delete
                      </button>
                    </form>
                    {/* <Delete id={element._id}/> */}
                    <Link href={"/Edit/" + element._id}>
                      <button className="p-2 m-2 bg-blue-600 text-white hover:cursor-pointer">
                        Edit
                      </button>
                    </Link>
                  </div>
                </li>
              </ul>
              <hr />
            </>
          );
        })}
      </div>
    </main>
  );
}
