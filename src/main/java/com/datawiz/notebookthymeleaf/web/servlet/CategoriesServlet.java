package com.datawiz.notebookthymeleaf.web.servlet;

import com.datawiz.notebookthymeleaf.business.entities.Category;
import com.datawiz.notebookthymeleaf.business.services.CategoryService;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.WebApplicationTemplateResolver;
import org.thymeleaf.web.IWebApplication;
import org.thymeleaf.web.IWebExchange;
import org.thymeleaf.web.servlet.JakartaServletWebApplication;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@WebServlet(name = "CategoriesServlet", value = {"/Categories/create","/Categories"})
public class CategoriesServlet extends HttpServlet {

    private JakartaServletWebApplication application;
    private ITemplateEngine templateEngine;

    private final CategoryService categoryService = CategoryService.getINSTANCE();


    @Override
    public void init() throws ServletException {
        this.application = JakartaServletWebApplication.buildApplication(getServletContext());
        this.templateEngine = buildTemplateEngine(this.application);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        final IWebExchange webExchange = this.application.buildExchange(request, response);

        final WebContext ctx = new WebContext(webExchange, webExchange.getLocale());

        List<Category> allCategories = categoryService.findAll();
        String selectedCategory = categoryService.getSelectedCategory().getName();

        ctx.setVariable("categories",allCategories);
        ctx.setVariable("selectedCat",selectedCategory);

        System.out.println(selectedCategory);

        Set<String> selectors = new HashSet<>();
        selectors.add("cats");

        templateEngine.process("categories-fragment",selectors, ctx, response.getWriter());


    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        final IWebExchange webExchange = this.application.buildExchange(request, response);

        final WebContext ctx = new WebContext(webExchange, webExchange.getLocale());

        String categoryName = request.getParameter("name");

        if(categoryName != null) {
            categoryService.saveCategory(categoryName);
        }

        List<Category> allCategories = categoryService.findAll();
        String selectedCategory = categoryService.getSelectedCategory().getName();

        ctx.setVariable("categories",allCategories);
        ctx.setVariable("selectedCat",selectedCategory);

        Set<String> selectors = new HashSet<>();
        selectors.add("cats");

        templateEngine.process("categories-fragment",selectors, ctx, response.getWriter());


    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        String categoryId = req.getParameter("categoryId");

        if(categoryId != null){
            categoryService.deleteCategory(Integer.parseInt(categoryId));
        }

    }

    private ITemplateEngine buildTemplateEngine(final IWebApplication application){

        final WebApplicationTemplateResolver templateResolver = new WebApplicationTemplateResolver(application);


        // HTML is the default mode, but we will set it anyway for better understanding of code
        templateResolver.setTemplateMode(TemplateMode.HTML);
        // This will convert "index" to "/Notebook/public/index.html"
        templateResolver.setPrefix("Notebook/public/");
        templateResolver.setSuffix(".html");
        // Set template cache TTL to 1 hour. If not set, entries would live in cache until expelled by LRU
        templateResolver.setCacheTTLMs(3600000L);

        // Cache is set to true by default. Set to false if you want templates to
        // be automatically updated when modified.
        templateResolver.setCacheable(true);

        final TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        return templateEngine;

    }
}
