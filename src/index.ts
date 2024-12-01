import express, { Request, Response } from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));

let data = {
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
    soilMoisture,
    waterTankLevel,
    fertilizationLevel,
  };
  response.status(200).send("ok");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
