import { connectDB } from "@/util/database";

export default async function handler(req, res)  {

  if(req.body.link == '' || req.body.name == '') {
    return res.status(500).json('The title and content don\'t be blank')
  }

  try {
    let db = (await connectDB).db('gallery');
    let result = await db.collection('photo').insertOne(req.body)
    res.redirect(302, '/')
  } catch(e) {
    res.status(500).json(e)
  }
}