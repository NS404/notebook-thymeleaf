package com.datawiz.notebookthymeleaf.business.entities;

import java.util.List;

public class Category {

    private int id;
    private String name;
    private List<Note> notes;


    public Category(int id, String name, List<Note> notes) {
        this.id = id;
        this.name = name;
        this.notes = notes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }
}
