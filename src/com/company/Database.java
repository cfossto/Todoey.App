package com.company;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;

import java.sql.*;
import java.util.List;

public class Database {

    Connection conn = null;

    public Database(){

        try {
            //conn = DriverManager.getConnection("jdbc:sqlite:todo.db");
            conn = DriverManager.getConnection("jdbc:sqlite:todo2.db");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public List<Task> getTasks() {
        List<com.company.Task> users = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM tasks");
            ResultSet rs = stmt.executeQuery();
            Task[] usersFromRS = (com.company.Task[]) Utils.readResultSetToObject(rs, Task[].class);
            users = List.of(usersFromRS);

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return users;
    }


    public void addTaskToDB(Task task){

        String query = "INSERT INTO tasks(task,state) VALUES (?,?)";

        try {
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1,task.getTask());
            stmt.setString(2, task.getState());
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    public void deleteTaskById(int id){

        PreparedStatement stmt = null;
        try {
            stmt = conn.prepareStatement("DELETE FROM tasks WHERE ID = ?");
            stmt.setInt(1,id);
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }



    public void updateTaskFull(int id, String task, String State){

        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE tasks SET task = ?,state = ? WHERE id = ?");

            stmt.setString(1,task);
            stmt.setString(2,State);
            stmt.setInt(3,id);


            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }


    public Task getTaskById(int id){

        Task task = null;
        PreparedStatement stmt = null;

        try {
            stmt = conn.prepareStatement("SELECT * FROM tasks WHERE ID = ?");
            stmt.setInt(1,id);
            ResultSet rs = stmt.executeQuery();
            com.company.Task[] tasksFromRS = (com.company.Task[]) Utils.readResultSetToObject(rs, com.company.Task[].class);
            task = tasksFromRS[0];


        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }

        return task;
    }

}