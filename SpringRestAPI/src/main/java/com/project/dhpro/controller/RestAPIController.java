package com.project.dhpro.controller;

import com.project.dhpro.models.*;
import com.project.dhpro.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.util.List;

@RestController
public class RestAPIController {

    @Autowired
    RAMService ramService;

    @Autowired
    NhuCauSuDungService nhuCauSuDungService;

    @Autowired
    ManHinhService manHinhService;

    @Autowired
    CPUService cpuService;

    @Autowired
    OCungService oCungService;

    @GetMapping(value = "/listRam")
    List<RAM> listRAM() throws URISyntaxException {
        return ramService.findAll();
    }

    @GetMapping(value = "/getRAM")
    RAM getRAM() throws URISyntaxException {
        return ramService.findById(1);
    }

    @GetMapping(value="/listNhuCauSuDung")
    List<NhuCauSuDung> listNhuCauSuDung()
    {
        return nhuCauSuDungService.findAll();
    }

    @GetMapping(value="/listManHinh")
    List<ManHinh> listManHinh()
    {
        return manHinhService.findAll();
    }

    @GetMapping(value="/listCPU")
    List<CPU> listCPU()
    {
        return cpuService.findAll();
    }

    @GetMapping(value="/listOCung")
    List<OCung> listOCung()
    {
        return oCungService.findAll();
    }
}
