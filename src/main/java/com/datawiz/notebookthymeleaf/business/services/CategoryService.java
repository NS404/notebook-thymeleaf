package com.datawiz.notebookthymeleaf.business.services;

import com.datawiz.notebookthymeleaf.business.entities.Category;
import com.datawiz.notebookthymeleaf.business.entities.repos.Repository;

import java.util.List;

public class CategoryService {

    public List<Category> findAll(){
        return Repository.getInstance().findAll();
    }

    public Category findById(int id){
        return Repository.getInstance().findById(id);
    }
}
