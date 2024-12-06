const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("public")); 

const Joi = require('joi');
const multer = require('multer');
const mongoose = require("mongoose");
const { ServerMonitoringMode } = require("mongodb");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

mongoose
  .connect(
    "mongodb+srv://mattlarsen13:rloKuVBF4C23oKsB@cluster0.ewguw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Succesfully connected to mongodb");
  })
  .catch((error) => {
    console.log("Couldn't connect to mongodb", error);
});

const playerSchema = new mongoose.Schema({
    name: String,
    image: String,
    imagelink: String,
    description: String,
});

const Player = mongoose.model("Player", playerSchema);

const players = [
    {
        "_id": 1,
        "name": "Patrick Mahomes", 
        "image": "images/pm.webp",
        "imagelink": "https://www.youtube.com/watch?v=2sj1d7dQgfc",
        "description": "Patrick Mahomes is a star quarterback for the Kansas City Chiefs, known for his Super Bowl LIV win and MVP award. At Texas Tech, he led the NCAA in passing yards and total touchdowns in 2016, setting a single-game record for total offense. Drafted 10th overall in 2017, Mahomes quickly became one of the NFL's top talents. In the 2023 season, he played 16 games, completing 67.2% of his passes for 4,183 yards and 27 touchdowns, alongside 14 interceptions. With an average of 261.4 passing yards per game, Mahomes continues to demonstrate his elite status in the league, earning a Pro Bowl selection for his outstanding performance."
    },
    {
        "_id": 2,
        "name": "Justin Jefferson",
        "image": "images/jj.jpg",
        "imagelink": "https://www.youtube.com/watch?v=mWhxy_Wo60U",
        "description": "Justin Jefferson is a standout wide receiver for the Minnesota Vikings. Known for his exceptional route running and speed, he set the NFL rookie record for receiving yards in 2020. A former LSU star, Jefferson helped lead his team to a national championship in 2019 before being drafted in the first round of the 2020 NFL Draft. In the 2023 season, he played in 10 games, recording 68 receptions for 1,074 yards and scoring 5 touchdowns, averaging an impressive 15.8 yards per catch and 107.4 yards per game, further establishing his status as one of the top receivers in the league."
    },
    {
        "_id": 3,
        "name": "Josh Allen",
        "image": "images/ja.jpg",
        "imagelink": "https://www.youtube.com/watch?v=Cz-WJub9kEw",
        "description": "Josh Allen is the dynamic quarterback for the Buffalo Bills, recognized for his strong arm and mobility. After a breakout 2020 season, he led the Bills to the AFC Championship game. Drafted 7th overall in 2018 out of Wyoming, Allen has become one of the NFL's top dual-threat quarterbacks. In the 2023 season, he played 16 games, completing 62.7% of his passes for 4,197 yards and throwing 30 touchdowns, alongside 14 interceptions. In addition to his passing success, he also rushed for 553 yards and scored 7 rushing touchdowns, showcasing his ability to impact the game both through the air and on the ground."
    },
    {
        "_id": 4,
        "name": "Pat Surtain II",
        "image": "images/ps2.jpg",
        "imagelink": "https://www.youtube.com/watch?v=pBKNER63cL4",
        "description": "Pat Surtain II is an elite cornerback for the Denver Broncos, recognized for his exceptional coverage skills and playmaking ability. Drafted 9th overall in the 2021 NFL Draft out of Alabama, he quickly became a cornerstone of the Broncos' defense. In the 2023 season, Surtain played 16 games, accumulating 63 total tackles (53 solo), 12 passes defended, and 1 interception. His ability to shut down top receivers and create turnovers solidifies his reputation as one of the premier defensive backs in the league, earning him recognition and respect among his peers."
    },
    {
        "_id": 5,
        "name": "Puka Nacua",
        "image": "images/pn.jpeg",
        "imagelink": "https://www.youtube.com/watch?v=chamUr8JPlc",
        "description": "Puka Nacua is an emerging wide receiver for the Los Angeles Rams, known for his impressive speed and route-running ability. A standout at BYU, he quickly made an impact in the NFL after being drafted in the fifth round of the 2023 NFL Draft. In the 2023 season, Nacua played 17 games, recording 105 receptions for 1,486 yards and 6 touchdowns. With an average of 14.2 yards per reception, he has established himself as a reliable target for the Rams, earning recognition for his playmaking skills and contributing significantly to the team's offense."
    },
    {
        "_id": 6,
        "name": "Derrick Henry",
        "image": "images/dh.jpg",
        "imagelink": "https://www.youtube.com/watch?v=t8SX9GlmrYA",
        "description": "Derrick Henry is a dominant running back for the Tennessee Titans, known for his powerful running style and consistency. Drafted in the second round of the 2016 NFL Draft, Henry quickly became one of the league's top rushers. In the 2023 season, he played all 17 games, amassing 1,167 rushing yards on 280 carries with an average of 4.2 yards per carry. He scored 12 rushing touchdowns and added 214 receiving yards on 28 receptions. With his ability to wear down defenses, Henry remains a key piece of the Titans' offense and earned another Pro Bowl selection for his efforts."
    },
    {
        "_id": 7,
        "name": "Aidan Hutchinson",
        "image": "images/ah.jpg",
        "imagelink": "https://www.youtube.com/watch?v=ruG_WYodv3c",
        "description": "Aidan Hutchinson is a standout defensive end for the Detroit Lions, known for his relentless pass rush and playmaking ability. Drafted 2nd overall in the 2022 NFL Draft out of Michigan, he quickly made his mark on the league. In his sophomore 2023 season, Hutchinson played 17 games, racking up 52 total tackles (34 solo), 9.5 sacks, and 3 interceptions. His impressive ability to disrupt opposing quarterbacks and force turnovers has cemented his role as one of the league's premier young defensive stars, with expectations of even greater success in his third season."
    },
    {
        "_id": 8,
        "name": "Lamar Jackson",
        "image": "images/lj.jpg",
        "imagelink": "https://www.youtube.com/watch?v=mkhmBuQAud0",
        "description": "Lamar Jackson is a dynamic quarterback for the Baltimore Ravens, celebrated for his dual-threat abilities. In the 2023 season, Jackson threw for 3,678 yards with a 67.2% completion rate, 24 touchdowns, and just 7 interceptions across 16 games. His performance earned him his second MVP award, as he showcased both his passing efficiency and his explosive running skills. Jackson also had a passer rating of 102.7, solidifying his position as one of the most dangerous offensive players in the NFL, capable of changing the course of a game both through the air and on the ground."
    }
]; 

app.get("/",(req, res)=>{
    console.log("getting me");
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/players", async (req, res) => {
    const players = await Player.find();
    res.send(players);
  });
  
app.get("/api/players/:id", async (req, res) => {
    const player = await Player.findOne({ _id: id });
    res.send(player);
});


app.post("/api/players", upload.single("img"), async(req, res) => {
    const result = validatePlayer(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const player = new Player({
        _id: players.length +1,
        name: req.body.name,
        imagelink: req.body.imagelink,
        description: req.body.description,
    });

    if (req.file) {
        player.image = "images/" + req.file.filename;
    }

    const newPlayer = await player.save();
    res.status(200).send(player);
});

app.delete("/api/players/:id", async(req, res)=> {
    const player = await Player.findByIdAndDelete(req.params.id);
    res.send(player);
});

app.put("/api/players/:id", upload.single("img"), async (req,res)=>{
    const result = validatePlayer(req.body);
    if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
    }
    let fieldsToUpdate = {
        name: req.body.name,
        imagelink: req.body.imagelink,
        description: req.body.description,
    };
  
    if(req.file){
        fieldsToUpdate.image = "images/" + req.file.filename;
    }
     
    const wentThrough = await Player.updateOne(
        { _id: req.params.id },
        fieldsToUpdate
      );
    
    const updatedPlayer = await Player.findOne({ _id: req.params.id });
    res.send(updatedPlayer);
});

const validatePlayer = (players) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        name: Joi.string().min(3).required(),
        imagelink: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
    });
    return schema.validate(players);
};

app.listen(3001, () => {
    console.log("Listening...");
});

