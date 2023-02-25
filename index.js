const express = require('express');
const crypto = require("crypto");
const connectDB = require('./connectDB');
const Link= require('./Link');
const app = express();
const host = `https://e69.vercel.app/`;
// const host = `http://localhost:5000/`;

require("dotenv").config();
const port = process.env.PORT || 5000;


app.use(express.json());
app.get('/', (req, res) => {
    
    res.send('Hello World!');
});

app.post('/short', async (req, res) => {
    const { link } = req.body;
    const userLink = await Link.findOne({ link });
    if (userLink) { 
        let url = `${host}${userLink.hashCode}`;
        return res.json({ message: url });
    }
    const hashCode = crypto.randomBytes(5).toString("hex");
    const shortLink = await Link.create({
        link,
        hashCode,
    });
    let url = `${host}${shortLink.hashCode}`;
    res.json({ message: url });

});

app.get('/:getlink', async (req, res) => {
    const id = req.params.getlink;

    const link = await Link.findOne({ hashCode: id });
    if (link) {
        res.redirect(link.link);
    } else {
        res.status(404).json({ message: "Link not found" });
    }
    
}); 
    
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(port);
      console.log(`Server started on port ${port}`);
    } catch (err) {
      console.log(err);
    }
  };
start();
  
module.exports = app;

