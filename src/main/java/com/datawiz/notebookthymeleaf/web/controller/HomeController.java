package com.datawiz.notebookthymeleaf.web.controller;

import com.datawiz.notebookthymeleaf.business.entities.Category;
import com.datawiz.notebookthymeleaf.business.services.CategoryService;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.web.IWebExchange;

import java.io.Writer;
import java.util.List;

public class HomeController implements INotebookController {

    private String var;

    public HomeController(){
        var = "Hello World";
    }


    @Override
    public void process(IWebExchange webExchange, ITemplateEngine templateEngine, Writer writer) {

         final CategoryService categoryService = new CategoryService();
         List<Category> allCategories = categoryService.findAll();


        final WebContext ctx = new WebContext(webExchange, webExchange.getLocale());
        ctx.setVariable("categories", allCategories);
        ctx.setVariable("hello", var);

        templateEngine.process("index",ctx,writer);

    }
}
