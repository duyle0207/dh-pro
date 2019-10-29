package com.project.dhpro.service;

import com.project.dhpro.models.Role;
import com.project.dhpro.models.TaiKhoan;
import com.project.dhpro.repository.RoleRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class TaiKhoanDetailServiceImpl implements UserDetailsService {
    @Autowired
    TaiKhoanService taiKhoanService;

    @Autowired
    RoleRepository roleRepository;

    HttpServletRequest request;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        System.out.println("Email: "+s);

        TaiKhoan taiKhoan = taiKhoanService.findTaiKhoanByUserName(s);

        if(taiKhoan == null)
        {
            throw new UsernameNotFoundException(s);
        }
        else
        {
            Role roleName = taiKhoan.getRole();

            ArrayList<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();

            if (roleName.getTenRole() != null) {
                GrantedAuthority authority = new SimpleGrantedAuthority(roleName.getTenRole());
                grantList.add(authority);
            }



            UserDetails userDetails = (UserDetails) new User(taiKhoan.getUserName(), //
                    taiKhoan.getPassword(), grantList);
            return userDetails;
        }
    }
}
