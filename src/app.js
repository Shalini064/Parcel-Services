const express = require("express");
require("./db/conn");
const path = require("path");
const Truck = require("./models/truck");
const Parcel = require("./models/parcel");
const app = express();
const port = process.env.PORT || 3000;

// Calling our static page html
const static_path = path.join(__dirname, "../src/public");
app.use(express.static(static_path));
app.use(express.json());

// Now i want to get the data whatever user is providing in frontend
// using express.urlencoded()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello welcome to truck parcel service ...");
});

//Create Truck
app.post("/createTruck", async (req, res) => {
  const truck = new Truck({
    truckId: req.body.truckId,
  });
  console.log(req.body.truckId);
  await truck
    .save()
    .then(() => {
      res.status(201).send(truck);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//create parcel
app.post("/createParcel", async (req, res) => {
  const parcel = new Parcel({
    parcelId: req.body.parcelId,
    parcelWeight: req.body.parcelWeight,
    parcelLoadUnloadStatus: "unload",
    truckId: "",
  });
  console.log(parcel);
  await parcel
    .save()
    .then(() => {
      res.status(201).send(parcel);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//create Load api
app.post("/load", async (req, res) => {
  try {
    const parcelId = req.body.parcelId;
    const truckId = req.body.truckId;
    const parcel = await Parcel.findOne({ parcelId: parcelId });
    const truck = await Truck.findOne({ truckId: truckId });
    if (parcel.parcelLoadUnloadStatus === "unload") {
      parcel
        .updateOne({ parcelLoadUnloadStatus: "load", truckId: truckId })
        .then(() => {
          res.status(201).send(parcel);
        })
        .catch((e) => {
          res.status(400).send(e);
        });
    } else {
      res.send("Parcel is already loaded");
    }
  } catch (error) {
    res.status(400).send("Invalid parcel ID or Truck ID for load ");
  }
});

//Create Unload API
app.post("/unloadParcel", async (req, res) => {
  try {
    const parcelId = req.body.parcelId;
    const truckId = req.body.truckId;
    const parcel = await Parcel.findOne({ parcelId: parcelId });
    const truck = await Truck.findOne({ truckId: truckId });
    if (parcel.parcelLoadUnloadStatus === "load") {
      parcel
        .updateOne({ parcelLoadUnloadStatus: "unload", truckId: "" })
        .then(() => {
          res.status(201).send(parcel);
        })
        .catch((e) => {
          res.status(400).send(e);
        });
    } else {
      res.send("Parcel is already unloaded");
    }
  } catch (error) {
    res.status(400).send("Invalid parcel ID or Truck ID for Unload");
  }
});

//get the number of parcels we have in each truck and the weight of the truck, each parcel can have a different weight
app.post("/parcelCount", async (req, res) => {
  let truckWeight = 0;
  let parcelCount = 0;
  try {
    const truckId = req.body.truckId;
    const parcels = await Parcel.find({ truckId: truckId });
    parcelCount = parcels.length
    if (parcelCount > 0) {
      parcels.forEach(element => {
        truckWeight += Number(element.parcelWeight);
      });
      res.status(201).send("Total Truck weight : " + truckWeight + "  &&   Parcel Count : " + parcelCount);
    }
    else {
      res.status(400).send("None of the parcel is loaded yet on this truck ID ");
    }

  } catch (error) {
    res.status(400).send("None of the parcel is loaded yet on this truck ID ");
  }
})

app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});
