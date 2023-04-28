import { connectDB } from "@/util/database";

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
      <div className="slider">
        <div className="wrapper">
          <img src='angle_left.svg'/>
          <div className="carousel">
          { result.map((a, i) => {
              return (
                  <ImageItem key={i} src={a.link} />
              )}
          )}
          </div>
          <img src='angle_right.svg'/>
        </div>
      </div>
    </div>
  )
}

function ImageItem(props) {
  return (
    <img src={props.src} alt={props.name} />  
  )
}