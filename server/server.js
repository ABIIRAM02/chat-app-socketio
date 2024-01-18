const { default: mongoose } = require("mongoose");
require('dotenv').config();

const activeUsersSchema = new mongoose.Schema({
  name: String,
  img:String,
  email: String,
});

const io = require("socket.io")( 3001 || process.env.PORT , {
  cors: { 
    origin: process.env.CLIENT || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let isConnected = false;

mongoose.set("strictQuery", false);

if (isConnected) {
  console.log("MongoDB already connected");
  return;
}

try {
  mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "Globel-Chat",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      isConnected = true;
      console.log("Server MongoDB connected");
    });
} catch (error) {
  console.log(error);
}

const ActiveUser = mongoose.model("activeUser", activeUsersSchema);

io.on("connection", async (socket) => {
  socket.emit("userID", socket.id);

  const user = socket.handshake.query.userId
  try {
    socket.on("newUser", async (data) => {

      if(data.name){
        const userExist = await ActiveUser.find({email:data.email})

        if(userExist.length === 0){
          const newUser = await ActiveUser.create({
            name: data.name,
            email: data.email,
            img:data.img
          });
          await newUser.save();
        }
  
        const activeUsersData = await ActiveUser.find();
        io.emit("activeUsers", activeUsersData);
      }
     
    });

  } catch (error) {
    console.error("Error:", error.message);
  }

  socket.on("sendMsg", (data) => {
    console.log(data);
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    io.emit("reciveMsg", { user: socket.id, message: data.message, time: timestamp , name:data.name , email:data.email});
  });

  socket.on('disconnect' , async () => {

     await ActiveUser.findOneAndDelete({email:user})
     const activeUsersData = await ActiveUser.find();
     io.emit("activeUsers", activeUsersData);

  })

});