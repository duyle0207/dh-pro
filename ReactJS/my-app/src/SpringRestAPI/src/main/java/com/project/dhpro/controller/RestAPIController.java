package com.project.dhpro.controller;

import com.project.dhpro.models.*;

import com.project.dhpro.service.*;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Collection;
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
    RAM getRAM(@PathVariable("id") int id) {
        return ramService.findById(id);
    }

    @GetMapping(value = "/listNhuCauSuDung")
    List<NhuCauSuDung> listNhuCauSuDung() {
        return nhuCauSuDungService.findAll();
    }

    @GetMapping(value = "/nhuCauSuDung/{id}")
    NhuCauSuDung findById(@PathVariable("id") int id) {
        return nhuCauSuDungService.findById(id);
    }

    @GetMapping(value = "/listManHinh")
    List<ManHinh> listManHinh() {
        return manHinhService.findAll();
    }

    @GetMapping(value = "/listCPU")
    List<CPU> listCPU() {
        return cpuService.findAll();
    }

    @GetMapping(value = "/listOCung")
    List<OCung> listOCung() {
        return oCungService.findAll();
    }

    @GetMapping(value = "/oCung/{id}")
    OCung getOCungById(@PathVariable("id") int id) {
        return oCungService.findOCungById(id);
    }

    @GetMapping(value = "/sanPham/{id}")
    SanPham getSanPhamById(@PathVariable("id") int id) {
        SanPham sp = new SanPham();
        try {
            sp = sanPhamService.findById(id);
        } catch (Exception e) {
            return sp;
        }
        return sp;
    }

    @GetMapping(value = "/cpu/{id}")
    CPU getCPUById(@PathVariable("id") int id) {
        return cpuService.findCPUById(id);
    }

    @GetMapping(value = "/cardDoHoa/{id}")
    CardDoHoa getCardById(@PathVariable("id") int id) {
        return cardDoHoaService.findCardById(id);
    }

    @GetMapping(value = "/manHinh/{id}")
    ManHinh getManHinhById(@PathVariable("id") int id) {
        return manHinhService.findById(id);
    }

    ;

    @PostMapping(value = "/searchSPAdmin")
    List<SanPham> searchSanPhamAdmin(@Valid @RequestBody String keyword) {
        System.out.println(keyword);
        return sanPhamService.searchSanPhamAdmin(keyword);
    }

    @PostMapping(value="/updateStatusSanPham/{id}")
    public ResponseEntity updateStatusSP(@PathVariable("id") int id)
    {
        SanPham sp = sanPhamService.findById(id);
        sp.setStatus(!sp.getStatus());

        sanPhamService.save(sp);

        return ResponseEntity.ok().build();
    }

    //Card
    @GetMapping(value="/getCard/page={page}")
    List<CardDoHoa> getAllCard(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<CardDoHoa> list = null;
        try {
            Page<CardDoHoa> pageCard = cardDoHoaService.findAll(pageable);
            list = pageCard.getContent();
//            list.add(page);
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPages")
    public int getTotalPages()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<CardDoHoa> pageCard = cardDoHoaService.findAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertCard")
    public ResponseEntity insertCard(@Valid @RequestBody CardDoHoa cardDoHoa)
    {
        System.out.println(cardDoHoa.getTenCardDoHoa());
        cardDoHoaService.save(cardDoHoa);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertCard")
    public ResponseEntity updatetCard(@Valid @RequestBody CardDoHoa cardDoHoa)
    {
        System.out.println(cardDoHoa.getTenCardDoHoa());
        cardDoHoaService.save(cardDoHoa);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/deleteCard/{id}")
    public ResponseEntity deleteCard(@PathVariable("id") int id)
    {
        cardDoHoaService.remove(id);

        return ResponseEntity.ok().build();
    }

    //CPU
    @GetMapping(value="/getCPU/page={page}")
    List<CPU> getAllCPU(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<CPU> list = null;
        try {
            Page<CPU> pageCard = cpuService.getAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesCPU")
    public int getTotalPagesCPU()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<CPU> pageCard = cpuService.getAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertCPU")
    public  ResponseEntity insertCPU(@Valid @RequestBody CPU cpu)
    {
        cpuService.save(cpu);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertCPU")
    public  ResponseEntity updateCPU(@Valid @RequestBody CPU cpu)
    {
        cpuService.save(cpu);
        return ResponseEntity.ok().build();
    }

    //Hệ điều hành
    @Autowired
    HeDieuHanhService heDieuHanhService;
    @GetMapping(value="/getHDH/page={page}")
    List<HeDieuHanh> getAllHeDieuHanh(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<HeDieuHanh> list = null;
        try {
            Page<HeDieuHanh> pageCard = heDieuHanhService.findAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesHDH")
    public int getTotalPagesHDH()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<HeDieuHanh> pageCard = heDieuHanhService.findAll(pageable);

        return pageCard.getTotalPages();
    }

    @GetMapping(value = "/heDieuHanh/{id}")
    HeDieuHanh findHDHById(@PathVariable("id") int id){return heDieuHanhService.findById(id);}

    @PostMapping(value="/insertHDH")
    public ResponseEntity insertHDH(@Valid @RequestBody HeDieuHanh heDieuHanh)
    {
        heDieuHanhService.save(heDieuHanh);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertHDH")
    public ResponseEntity updateHDH(@Valid @RequestBody HeDieuHanh heDieuHanh)
    {
        System.out.println(heDieuHanh.getTenHeDieuHanh());
        heDieuHanhService.save(heDieuHanh);
        return ResponseEntity.ok().build();
    }

    //Màn hình
    @GetMapping(value="/getManHinh/page={page}")
    List<ManHinh> getAllManHinh(@PathVariable("page") int page)
    {
        Pageable pageable = PageRequest.of(page-1, 6);
        List<ManHinh> list = null;
        try {
            Page<ManHinh> pageCard = manHinhService.getAll(pageable);
            list = pageCard.getContent();
            System.out.println(pageCard.getTotalPages());
        }
        catch (Exception e)
        {
            return null;
        }
        return list;
    }

    @GetMapping(value = "/getTotalPagesManHinh")
    public int getTotalPagesManHinh()
    {
        Pageable pageable = PageRequest.of(0, 6);
        Page<ManHinh> pageCard = manHinhService.getAll(pageable);

        return pageCard.getTotalPages();
    }

    @PostMapping(value="/insertManHinh")
    public ResponseEntity insertManHinh(@Valid @RequestBody ManHinh manHinh)
    {
        manHinhService.save(manHinh);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/insertManHinh")
    public ResponseEntity updateManHinh(@Valid @RequestBody ManHinh manHinh)
    {
        manHinhService.save(manHinh);
        return ResponseEntity.ok().build();
    }
}
