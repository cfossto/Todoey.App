package com.company;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        Database db = new Database();
        Express app = new Express();


        // Get-method
        app.get("/rest/tasks",(req,res) -> {
            List<Task> tasks = db.getTasks();
            res.json(tasks);
        });

        // Create-method

        app.post("/rest/add",(req,res) -> {
          Task task = (Task) req.getBody(Task.class);
          db.addTaskToDB(task);
          res.send("ok");

        });

        // Update full post


        //Delete-method
        app.delete("/rest/delete/:id",(req,res) -> {

            int id = Integer.parseInt(req.getParam("id"));
            db.deleteTaskById(id);
            res.send("Ok");
        });

        app.post("/rest/update",((req,res) -> {

            Task task = (Task) req.getBody(Task.class);
            db.updateTaskFull(task.getId(), task.getTask(), task.getState());
            res.send("ok");

        }));



        // Middleware for static files
        try {
            app.use(Middleware.statics("src/www"));
        } catch (IOException e) {
            e.printStackTrace();
        }


        app.listen(8000);
        System.out.println("Running server on 8000");


    }
}