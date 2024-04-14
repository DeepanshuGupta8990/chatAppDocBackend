const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/getPdf', async (req, res) => {
    const { url,token } = req.query;

    // if (!url) {
    //   return res.status(400).send('PDF URL is required');
    // }
    let newUrl = url.replace("images/", "images%2F");
  console.log(url+"&token="+token )
//   const url1 = 'https://firebasestorage.googleapis.com/v0/b/chatapp2-dbd6b.appspot.com/o/images%2FDeepanshuGupta_Resume...pdf?alt=media&token=12d27e5f-3613-465a-a297-9e6c3af4463c';

  try {
    const response = await axios.get(newUrl+"&token="+token ,{ responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  } catch (error) {
    console.error('Error fetching PDF:');
    res.status(500).send('Error fetching PDF');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
