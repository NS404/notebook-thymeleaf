package com.datawiz.notebookthymeleaf.web.mapping;

import com.datawiz.notebookthymeleaf.web.controller.HomeController;
import com.datawiz.notebookthymeleaf.web.controller.INotebookController;
import org.thymeleaf.web.IWebRequest;

import java.util.HashMap;
import java.util.Map;

public class ControllerMappings {

    private static Map<String, INotebookController> controllersByUrl;

    static {
        controllersByUrl = new HashMap<>();
        controllersByUrl.put("/templates/home.html",new HomeController());

    }

    public static INotebookController resolveControllerForRequest(IWebRequest webRequest) {
        final String path = webRequest.getPathWithinApplication();
        return controllersByUrl.get(path);
    }
}
