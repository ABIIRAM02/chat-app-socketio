import Message from "@/model/message";
import { connectToDB } from "@/utils/database";



export const GET = async () => {

    try {
        await connectToDB()
        const res = await Message.find({})

        return new Response(JSON.stringify(res) , {status:200})
    } catch (error) {
        return new Response(`can't get message data` , {status:200})
    }

}

export const POST = async (req, res) => {
  const { data } = await req.json();
  try {
    await connectToDB();
    const res = Message.create({
      message: data.message,
      email: data.email,
      name: data.name,
      time: data.time,
    })

    return new Response(JSON.stringify(res), { status: 201 });
    
  } catch (error) {
    return new Response("failed to create message in db", { status: 500 });
  }
};
