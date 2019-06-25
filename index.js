const express = require("express");

const server = express();
server.use(express.json());

projects = [];
let count = 0;
server.use((req, res, next) => {
  count++;
  console.log(`Número de requisições: ${count}`);
  next();
});

function validateId(req, res, next) {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(400).json({ error: "Not valid ID" });
  }
  return next();
}

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", validateId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id === id);

  projects.splice(index, 1);
  return res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const project = projects.find(p => p.id === id);
  project.tasks.push(task);
  return res.json(projects);
});

server.listen(3000);
