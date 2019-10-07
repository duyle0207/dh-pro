package com.project.dhpro.controller;

import com.project.dhpro.models.RAM;
import com.project.dhpro.service.RAMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.util.List;

@RestController
public class RestAPIController {

    @Autowired
    RAMService ramService;

    @GetMapping(value = "/listRam")
    List<RAM> ListRAM() throws URISyntaxException {
//        System.out.println(accountService.findById(1).getId());
        return ramService.findAll();
    }
}
