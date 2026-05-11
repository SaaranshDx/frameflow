const express = require('express')
const fs = require('fs');
const compilations = require('./compilations');
const crypto = require('crypto');
const app = express()
app.use(express.json()); 
const port = 3000

async function render(prompt, id) {
    const scene = await compilations.generate(prompt);
    fs.writeFile(`Renders/${id}.html`, scene, err => {
      // write the html to video functionality here
  if (err) {
    console.error(err);
  } else {
    console.log(`Scene rendered:${id}`);
  }
});
    return scene;
}

app.post('/render', async (req, res) => {
  try {  
    const data = req.body;
    const prompt = data.prompt;
    const id = crypto.randomUUID();

    // render the video function call
    const renderer = await render(prompt, id);
  
    console.log('https://render.frameflow.io/v/,' + id );
    res.send('{"renderedurl": "https://render.frameflow.io/v/",' + id + '"}');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

})

app.post('/v/:id', async (req, res) => {
  // add retriving function here
})

app.listen(port, () => {})