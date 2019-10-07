package com.example.demo.service;

import com.example.demo.models.Account;

import java.util.List;

public interface AccountService {
    Account findById(int id);
    List<Account> findAll();
}
