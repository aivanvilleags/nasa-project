const request = require("supertest");
const { response } = require("../../app.js");
const app = require("../../app.js");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo.js");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      // expect(response.statusCode).toBe(200)
    });
  });

  describe("test POST /launch", () => {
    const launchData = {
      mission: "USS",
      rocket: "NCC 10701D",
      target: "Kepler-62 f",
      launchDate: "January 3, 2029",
    };

    const launchDataNoDate = {
      mission: "USS",
      rocket: "NCC 10701D",
      target: "Kepler-62 f",
    };

    const launchDataInvalidDate = {
      mission: "USS",
      rocket: "NCC 10701D",
      target: "Kepler-62 f",
      launchDate: "X",
    };

    test("It should respond with 201 created", async () => {
      const res = await request(app)
        .post("/launches")
        .send(launchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const reqDate = new Date(launchData.launchDate).valueOf();
      const resDate = new Date(res.body.launchDate).valueOf();

      expect(reqDate).toBe(resDate);

      expect(res.body).toMatchObject(launchDataNoDate);
    });

    test("It should catch missing required properties", async () => {
      const res = await request(app)
        .post("/launches")
        .send(launchDataNoDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(res.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      const res = await request(app)
        .post("/launches")
        .send(launchDataInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(res.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
