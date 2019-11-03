package com.project.dhpro.repository;

import com.project.dhpro.models.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Integer> {
    TaiKhoan findTaiKhoanByUserName(String Username);

    TaiKhoan findTaiKhoanByUserNameOrEmail(String username, String email);
}
