import { connectDB } from "@/util/database";
import Slider from "./Slider";

export default async function Home() {

  let db = (await connectDB).db('gallery');
  let result = await db.collection('photo').find().toArray();

  result.forEach(element => {
    element._id = element._id.toString()
  });

  return (
    <div>
      <div className="searchBar">
        <form>
          <input placeholder="검색어 입력"></input>
          <button>검색</button>
        </form>
      </div>
      <Slider result={result} />
    </div>
  )
}