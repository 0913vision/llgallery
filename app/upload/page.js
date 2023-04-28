export default function Upload() {

  return (
    <div>
      <form action="/api/photo/upload" method="POST">
        <input placeholder="Link" type="url" name="link"/>
        <input placeholder="Name" type="text" name="name"/>
        <button type="submit">업로드</button>
      </form>
    </div>
  );
}