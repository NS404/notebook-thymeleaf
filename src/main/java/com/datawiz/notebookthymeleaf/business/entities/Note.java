package com.datawiz.notebookthymeleaf.business.entities;

public class Note {

    private int id;
    private String title;
    private String content;
    private String categoryName;


    public Note(int id, String title, String content, String category) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.categoryName = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
