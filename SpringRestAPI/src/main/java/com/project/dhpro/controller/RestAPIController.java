package com.project.dhpro.controller;

import com.project.dhpro.models.*;
import com.project.dhpro.repository.CardDoHoaRepository;
import com.project.dhpro.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
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

    @Autowired
    SanPhamService sanPhamService;

    @Autowired
    CardDoHoaService cardDoHoaService;

    @GetMapping(value = "/listRam")
    List<RAM> listRAM() {
        return ramService.findAll();
    }

    @GetMapping(value = "/ram/{id}")
    RAM getRAM(@PathVariable("id") int id) {return ramService.findById(id);}

    @GetMapping(value="/listNhuCauSuDung")
    List<NhuCauSuDung> listNhuCauSuDung()
    {
        return nhuCauSuDungService.findAll();
    }

    @GetMapping(value = "/nhuCauSuDung/{id}")
    NhuCauSuDung findById(@PathVariable("id") int id){ return nhuCauSuDungService.findById(id);}

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

    @GetMapping(value = "/oCung/{id}")
    OCung getOCungById(@PathVariable("id") int id)
    {
        return oCungService.findOCungById(id);
    }

    @GetMapping(value="/sanPham/{id}")
    SanPham getSanPhamById(@PathVariable("id") int id)
    {
        SanPham sp = new SanPham();
        try {
            sp = sanPhamService.findById(id);
        }
        catch (Exception e)
        {
            return sp;
        }
        return sp;
    }

    @GetMapping(value="/cpu/{id}")
    CPU getCPUById(@PathVariable("id") int id)
    {
        return cpuService.findCPUById(id);
    }

    @GetMapping(value ="/cardDoHoa/{id}")
    CardDoHoa getCardById(@PathVariable("id") int id)
    {
        return cardDoHoaService.findCardById(id);
    }

    @GetMapping(value = "/manHinh/{id}")
    ManHinh getManHinhById(@PathVariable("id") int id){ return  manHinhService.findById(id);};

    @PostMapping(value = "/searchSPAdmin")
    List<SanPham> searchSanPhamAdmin(@Valid @RequestBody String keyword)
    {
        System.out.println(keyword);
        return sanPhamService.searchSanPhamAdmin(keyword);
    }
}
