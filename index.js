// const express = require("express");
// const cors = require("cors");
// require('dotenv').config();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// const app = express();
// const port = process.env.PORT || 9000;

// //Must remove "/" from your production URL
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://assignment-11-volunteer.web.app",
//       "https://assignment-11-volunteer.firebaseapp.com",
//     ],
//     credentials: true,
//   })
// );

// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@atlascluster.yh51je0.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;
// // console.log(uri);

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     const needpostCollection = client.db('servesyncDB').collection('needpost');
//     const reqsCollection = client.db('servesyncDB').collection('reqs');

//     app.get('/needpost', async (req, res) => {
//       const result = await needpostCollection.find().sort({ deadline: 1 }).toArray(); 
//       res.send(result);
//     });

//     app.get('/needposts/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await needpostCollection.findOne(query);
//       res.send(result);
//     });

    

//     app.post('/add', async (req, res) => {
//       const addData = req.body;
//       const result = await needpostCollection.insertOne(addData);
//       res.send(result);
//     });

//     app.get("/mypost/:email", async (req, res) => {
//       const email = req.params.email
//       const query = {'organizer.email' : email}
//       const result = await needpostCollection.find(query).toArray();
//       res.send(result); 
//   });

//   app.delete("/post/:id", async (req, res) => {
//     const id = req.params.id
//     const query = {_id : new ObjectId(id)}
//     const result = await needpostCollection.deleteOne(query);
//     res.send(result); 
// });

// app.put("/post/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const postData = req.body;
//     const query = { _id: new ObjectId(id) };
//     const options = { upsert: true };
//     const updateDoc = {
//       $set: {
//         ...postData
//       }
//     };
//     const result = await needpostCollection.updateOne(query, updateDoc, options);
//     res.send(result);
//   } catch (error) {
//     console.error("Error updating post:", error);
//     res.status(500).send({ error: "An error occurred while updating the post" });
//   }
// });

// app.get("/myreq/:email", async (req, res) => {
//   const email = req.params.email
//   const query = {email}
//   const result = await reqsCollection.find(query).toArray();
//   res.send(result); 
// });

// app.get("/postreq/:email", async (req, res) => {
//   const email = req.params.email
//   const query = {'organizer.email' : email}
//   const result = await reqsCollection.find(query).toArray();
//   res.send(result); 
// });

// app.patch("/updatereq/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const status = req.body;
//     const query = { _id: new ObjectId(id) };
//     const updateDoc = {
//       $set: status,
//     };
//     const result = await reqsCollection.updateOne(query, updateDoc);
//     res.send(result);
//   } catch (error) {
//     console.error("Error updating post:", error);
//     res.status(500).send({ error: "An error occurred while updating the post" });
//   }
// });

// app.delete("/postreq/:id", async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: new ObjectId(id) };
//   try {
//     const result = await reqsCollection.deleteOne(query);
//     if (result.deletedCount === 1) {
//       res.send({ message: "Request deleted successfully" });
//     } else {
//       res.status(404).send({ error: "Request not found" });
//     }
//   } catch (error) {
//     console.error("Error deleting request:", error);
//     res.status(500).send({ error: "An error occurred while deleting the request" });
//   }
// });


// app.post('/req', async (req, res) => {
//   try {
//     const reqData = req.body;
//     const postId = reqData.postId; 

//     const result = await reqsCollection.insertOne(reqData);


//     const updateDoc = {
//       $set: {
//         volunteers_needed: parseInt(reqData.volunteers_needed)
//       }
//     };
//     const query = { _id: new ObjectId(reqData.postId) };
//     await needpostCollection.updateOne(query, updateDoc);

  
//     const updatePostDoc = await needpostCollection.updateOne(query, { $inc: { volunteers_needed: -1 } });

//     res.send(result);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'An error occurred while processing your request' });
//   }
// });




//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
  
//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("server is running");
// });

// app.listen(port, () => {
//   console.log(`server is running on port: ${port}`);
// });



const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken'); 

const app = express();
const port = process.env.PORT || 9000;

// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment-11-volunteer.web.app",
      "https://assignment-11-volunteer.firebaseapp.com",
    ],
    credentials: true,
  })
);

// Express middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@atlascluster.yh51je0.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Main server logic
async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    const needpostCollection = client.db('servesyncDB').collection('needpost');
    const reqsCollection = client.db('servesyncDB').collection('reqs');

    // Routes

    // Get all need posts
    app.get('/needpost', async (req, res) => {
      const result = await needpostCollection.find().sort({ deadline: 1 }).toArray(); 
      res.send(result);
    });

  
  app.post('/jwt',async (req,res)  =>{
    const user = req.body;
    console.log('token',user);
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn:'365d'
    })
   
    res.cookie('token', token, {
      httpOnly:true,
      secure: true,
      sameSite: "strict",
    })
    res.send({ success : true })
  })


    // app.use('/private', (req, res, next) => {
    //   const token = req.headers.authorization?.split(' ')[1];
    //   if (!token) return res.status(401).json({ message: 'Authentication failed' });

    //   jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    //     if (err) return res.status(403).json({ message: 'Forbidden' });
    //     req.userData = decodedToken;
    //     next();
    //   });
    // });

    // Your other routes go here...

    app.get('/needposts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await needpostCollection.findOne(query);
            res.send(result);
          });
      
          
      
          app.post('/add', async (req, res) => {
            const addData = req.body;
            const result = await needpostCollection.insertOne(addData);
            res.send(result);
          });
      
          app.get("/mypost/:email", async (req, res) => {
            const email = req.params.email
            const query = {'organizer.email' : email}
            const result = await needpostCollection.find(query).toArray();
            res.send(result); 
        });
      
        app.delete("/post/:id", async (req, res) => {
          const id = req.params.id
          const query = {_id : new ObjectId(id)}
          const result = await needpostCollection.deleteOne(query);
          res.send(result); 
      });
      
      app.put("/post/:id", async (req, res) => {
        try {
          const id = req.params.id;
          const postData = req.body;
          const query = { _id: new ObjectId(id) };
          const options = { upsert: true };
          const updateDoc = {
            $set: {
              ...postData
            }
          };
          const result = await needpostCollection.updateOne(query, updateDoc, options);
          res.send(result);
        } catch (error) {
          console.error("Error updating post:", error);
          res.status(500).send({ error: "An error occurred while updating the post" });
        }
      });
      
      app.get("/myreq/:email", async (req, res) => {
        const email = req.params.email
        const query = {email}
        const result = await reqsCollection.find(query).toArray();
        res.send(result); 
      });
      
      app.get("/postreq/:email", async (req, res) => {
        const email = req.params.email
        const query = {'organizer.email' : email}
        const result = await reqsCollection.find(query).toArray();
        res.send(result); 
      });
      
      app.patch("/updatereq/:id", async (req, res) => {
        try {
          const id = req.params.id;
          const status = req.body;
          const query = { _id: new ObjectId(id) };
          const updateDoc = {
            $set: status,
          };
          const result = await reqsCollection.updateOne(query, updateDoc);
          res.send(result);
        } catch (error) {
          console.error("Error updating post:", error);
          res.status(500).send({ error: "An error occurred while updating the post" });
        }
      });
      
      app.delete("/postreq/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        try {
          const result = await reqsCollection.deleteOne(query);
          if (result.deletedCount === 1) {
            res.send({ message: "Request deleted successfully" });
          } else {
            res.status(404).send({ error: "Request not found" });
          }
        } catch (error) {
          console.error("Error deleting request:", error);
          res.status(500).send({ error: "An error occurred while deleting the request" });
        }
      });
      
      
      app.post('/req', async (req, res) => {
        try {
          const reqData = req.body;
          const postId = reqData.postId; 
      
          const result = await reqsCollection.insertOne(reqData);
      
      
          const updateDoc = {
            $set: {
              volunteers_needed: parseInt(reqData.volunteers_needed)
            }
          };
          const query = { _id: new ObjectId(reqData.postId) };
          await needpostCollection.updateOne(query, updateDoc);
      
        
          const updatePostDoc = await needpostCollection.updateOne(query, { $inc: { volunteers_needed: -1 } });
      
          res.send(result);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ message: 'An error occurred while processing your request' });
        }
      });
      

    // Ping route
    app.get("/", (req, res) => {
      res.send("Server is running");
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

run().catch(console.dir);
