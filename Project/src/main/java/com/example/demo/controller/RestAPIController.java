package com.example.demo.controller;

import com.example.demo.models.Account;
import com.example.demo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RestAPIController {

    @Autowired
    AccountService accountService;

    @GetMapping(value = "/listNhuCauSuDung")
    List<Account> list() throws URISyntaxException {
//        System.out.println(accountService.findById(1).getId());
        return accountService.findAll();
    }
}
