const express = require('express');
const router = express.Router();
const cors = require('cors');

const app = express();

const Pusher = require("pusher");

let pusher = new Pusher({
  appId: "1110767",
  key: "30c2132fd5e3962a8b41",
  secret: "b3114f69f441242bc833",
  cluster: "ap1",
  useTLS: true
});
app.use(cors());
app.use(express.json());

router.get('/', (req, res) => {
  res.send('report updated');
});

router.post('/', (req, res) => {
  pusher.trigger("reportFunction", "updateEvent", {
    body: req.body,
  });
  return res.json({
    success: true,
    message: 'report updated'
  });
})

module.exports = router;
