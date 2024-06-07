import express from "express";
import { createUser, getUsers, getUser, updateUser } from "./app.js";
import cors from "cors";
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json("Prisma and Supabase started");
});


app.get("/createuser", async (req, res) => {
  console.log(req.query); 
  const userData = req.query;
  const user = await createUser(userData);
  res.json(user);
});

app.get("/getusers", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.get("/getuser", async (req, res) => {
  const userId = req.query.user_id;
  const user = await getUser(userId);
  res.json(user);
});

app.get("/updateuser", async (req, res) => {
  const userId = req.query.user_id;
  const userData = req.query;
  const user = await updateUser(userId, userData);
  res.json(user);
});

const port = 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
