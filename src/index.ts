import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let data = {
  controller: {
    waterPump: false,
    fertilizer: false,
  },
  soilMoisture: "",
  waterTankLevel: "",
  fertilizationLevel: "",
};

app.get("/getDeviceState", (request: Request, response: Response) => {
  console.log(data);
  response.status(200).send(data);
});

app.post("/postDeviceState", (request: Request, response: Response) => {
  const { soilMoisture, waterTankLevel, fertilizationLevel } = request.body;

  data = {
    ...data,
    soilMoisture,
    waterTankLevel,
    fertilizationLevel,
  };
  response.status(200).send("ok");
});

app.post(
  "/postController/water_pump",
  (request: Request, response: Response) => {
    const { waterPump } = request.body;
    data = {
      ...data,
      controller: {
        ...data.controller,
        waterPump,
      },
    };

    console.log(data);
    response.status(200).send("ok");
  }
);

app.post(
  "/postController/fertilizer",
  (request: Request, response: Response) => {
    const { fertilizer } = request.body;
    data = {
      ...data,
      controller: {
        ...data.controller,
        fertilizer,
      },
    };
    response.status(200).send("ok");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
