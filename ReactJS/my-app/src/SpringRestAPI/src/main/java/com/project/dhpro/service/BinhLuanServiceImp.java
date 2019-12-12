package com.project.dhpro.service;

import com.project.dhpro.models.BinhLuan;
import com.project.dhpro.models.SanPham;
import com.project.dhpro.repository.BinhLuanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class BinhLuanServiceImp implements BinhLuanService{

    @Autowired
    BinhLuanRepository binhLuanRepository;

    @Override
    public List<BinhLuan> getBinhLuansBySanPham(int id) {
        return binhLuanRepository.getBinhLuansByIdSPAndOrderByIdDesc(String.valueOf(id));
    }

    @Override
    public BinhLuan save(BinhLuan binhLuan) {
        return binhLuanRepository.save(binhLuan);
    }
}
