import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

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
    data = {
      ...data,
      controller: {
        ...data.controller,
        waterPump: !data.controller.waterPump,
      },
    };
    response.status(200).send("ok");
  }
);

app.post("/postController/fertilizer", (_: Request, response: Response) => {
  data = {
    ...data,
    controller: {
      ...data.controller,
      fertilizer: !data.controller.fertilizer,
    },
  };
  response.status(200).send("ok");
});

app.post(
  "/postController/revertState",
  (request: Request, response: Response) => {
    data = {
      ...data,
      controller: {
        ...data.controller,
        fertilizer: false,
        waterPump: false,
      },
    };
    response.status(200).send("ok");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
