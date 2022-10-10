package com.datawiz.notebookthymeleaf.web.controller;

import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.web.IWebExchange;

import java.io.Writer;

public interface INotebookController {

    public void process(final IWebExchange webExchange, final ITemplateEngine templateEngine, final Writer writer)
            throws Exception;


}

