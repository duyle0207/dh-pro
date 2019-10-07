package com.example.demo.service;

import com.example.demo.models.Account;
import com.example.demo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AccountServiceImp implements AccountService{
    @Autowired
    AccountRepository accountRepository;

    @Override
    public Account findById(int id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public List<Account> findAll() {
        return (List<Account>) accountRepository.findAll();
    }
}
