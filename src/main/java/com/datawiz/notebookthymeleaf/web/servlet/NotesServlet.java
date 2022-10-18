package com.datawiz.notebookthymeleaf.web.servlet;

import com.datawiz.notebookthymeleaf.business.entities.Category;
import com.datawiz.notebookthymeleaf.business.entities.Note;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@WebServlet(name = "NotesServlet", value = "/Notes", loadOnStartup = 1)
public class NotesServlet extends HttpServlet {

    private ITemplateEngine templateEngine;

    private JakartaServletWebApplication application;

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


        String categoryName = request.getParameter("categoryName");


        if (categoryName != null) {

            List<Note> notes = null;
            List<Category> allCategories = categoryService.findAll();

            for (Category cat: allCategories) {
                if (cat.getName().equals(categoryName)) {
                    notes = cat.getNotes();
                    categoryService.setSelectedCategory(cat);
                }
            }

            if (notes != null) {
                ctx.setVariable("notes", notes);

                Set<String> selectors = new HashSet<>();
                selectors.add("notes");

                templateEngine.process("notes-fragment",selectors,ctx,response.getWriter());


            }else throw new RuntimeException("notes are null");

        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        final IWebExchange webExchange = this.application.buildExchange(request, response);

        final WebContext ctx = new WebContext(webExchange, webExchange.getLocale());

        String noteTitle = request.getParameter("noteTitle");
        String noteContent = request.getParameter("noteContent");

        if(noteContent != null && noteTitle != null){
            categoryService.createNote(noteTitle,noteContent);
        }

        ctx.setVariable("notes", categoryService.getSelectedCategory().getNotes());

        Set<String> selectors = new HashSet<>();
        selectors.add("notes");

        templateEngine.process("notes-fragment",selectors,ctx,response.getWriter());

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String noteId = req.getParameter("noteId");

        if(noteId != null){
            categoryService.deleteNote(Integer.parseInt(noteId));
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
