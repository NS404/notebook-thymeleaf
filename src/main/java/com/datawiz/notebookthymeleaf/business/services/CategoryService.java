package com.datawiz.notebookthymeleaf.business.services;

import com.datawiz.notebookthymeleaf.business.entities.Category;
import com.datawiz.notebookthymeleaf.business.entities.Note;
import com.datawiz.notebookthymeleaf.business.entities.repos.Repository;

import java.util.ArrayList;
import java.util.List;

public class CategoryService {


    private List<Category> categories;

    private Category selectedCategory;

    private static final CategoryService INSTANCE = new CategoryService();

    public static CategoryService getINSTANCE() {
        return INSTANCE;
    }

    private CategoryService(){
        categories = findAll();
        selectedCategory = categories.get(0);
    }



    public List<Category> findAll(){
        return Repository.getInstance().findAll();
    }

    public Category findById(int id){
        return Repository.getInstance().findById(id);
    }

    public Category getSelectedCategory() {
        return selectedCategory;
    }

    public void setSelectedCategory(Category selectedCategory) {
        this.selectedCategory = selectedCategory;
    }

    public void saveCategory(String newCategoryName) {
        Category newCategory = new Category(categories.size()+1,newCategoryName,new ArrayList<>());
        Repository.getInstance().save(newCategory);
    }

    public void deleteNote(int noteId) {
        Repository.getInstance().deleteNote(selectedCategory,noteId);
    }

    public void deleteCategory(int categoryId) {
        Repository.getInstance().deleteCategory(categoryId);
    }

    public void createNote(String noteTitle, String noteContent) {
        List<Note> notes = selectedCategory.getNotes();
        Note note = new Note(notes.size() + 1, noteTitle, noteContent, selectedCategory.getName());
        notes.add(note);
    }
}
