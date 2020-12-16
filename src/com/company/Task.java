package com.company;

public class Task {


    private int id;
    private String task;
    private String state;


    public Task(){}

    public Task(int id, String task, String state) {
        this.id = id;
        this.task = task;
        this.state = state;
    }

    public Task(String task, String state) {
        this.task = task;
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", task='" + task + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}