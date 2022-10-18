package com.datawiz.notebookthymeleaf.business.entities.repos;

import com.datawiz.notebookthymeleaf.business.entities.Category;
import com.datawiz.notebookthymeleaf.business.entities.Note;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Repository {

    private static final Repository INSTANCE = new Repository();

    private final Map<Integer, Category> categoryById;


    public static Repository getInstance(){
        return INSTANCE;
    }

    private Repository(){

        this.categoryById = new HashMap<>();

        Note note1 = new Note(1,"title","contentOfCat1Notes","category1");
        Note note2 = new Note(2,"title","contentOfCat1Notes","category1");
        Note note3 = new Note(3,"title","contentOfCat1Notes","category1");
        Note note4 = new Note(4,"title","contentOfCat1Notes","category1");

        Note note5 = new Note(1,"title","contentOfCat2Notes","category2");
        Note note6 = new Note(2,"title","contentOfCat2Notes","category2");
        Note note7 = new Note(3,"title","contentOfCat2Notes","category2");
        Note note8 = new Note(4,"title","contentOfCat2Notes","category2");

        Note note9 = new Note(1,"title","contentOfCat3Notes","category3");
        Note note10 = new Note(2,"title","contentOfCat3Notes","category3");
        Note note11 = new Note(3,"title","contentOfCat3Notes","category3");
        Note note12 = new Note(4,"title","contentOfCat3Notes","category3");

        List<Note> notesOfCategory1 = new ArrayList<>();
        notesOfCategory1.add(note1);
        notesOfCategory1.add(note2);
        notesOfCategory1.add(note3);
        notesOfCategory1.add(note4);

        List<Note> notesOfCategory2 = new ArrayList<>();
        notesOfCategory2.add(note5);
        notesOfCategory2.add(note6);
        notesOfCategory2.add(note7);
        notesOfCategory2.add(note8);

        List<Note> notesOfCategory3 = new ArrayList<>();
        notesOfCategory3.add(note9);
        notesOfCategory3.add(note10);
        notesOfCategory3.add(note11);
        notesOfCategory3.add(note12);


        Category category1 = new Category(1, "category1", notesOfCategory1);

        Category category2 = new Category(2, "category2", notesOfCategory2);

        Category category3 = new Category(3, "category3",notesOfCategory3);

        categoryById.put(category1.getId(), category1);
        categoryById.put(category2.getId(), category2);
        categoryById.put(category3.getId(), category3);


    }

    public List<Category> findAll() {
        return new ArrayList<>(this.categoryById.values());
    }

    public void save(Category category) {
        categoryById.put(category.getId(),category);
    }

    public Category findById(int id){
        return this.categoryById.get(id);
    }

    public void deleteCategory(int categoryId) {
        categoryById.remove(categoryId);
    }

    public void deleteNote(Category selectedCategory, int noteId) {
        List<Note> notes = categoryById.get(selectedCategory.getId()).getNotes();
        notes.removeIf(note -> note.getId() == noteId);
    }
}
