package com.project.dhpro.security;

import com.project.dhpro.models.Role;
import com.project.dhpro.models.TaiKhoan;
import com.project.dhpro.service.RoleService;
import com.project.dhpro.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class AccountDetailsServiceImpl implements UserDetailsService {

    @Autowired
    TaiKhoanService taiKhoanService;

    @Autowired
    RoleService roleService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        TaiKhoan taiKhoan = taiKhoanService.findTaiKhoanByUserName(s);

        if(taiKhoan == null)
        {
            throw new UsernameNotFoundException(s);
        }
        else
        {
            Role roleName = roleService.findById(taiKhoan.getRole().getId());

            ArrayList<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();

            if (roleName.getTenRole() != null) {
                GrantedAuthority authority = new SimpleGrantedAuthority(roleName.getTenRole());
                grantList.add(authority);
            }


            UserDetails userDetails = (UserDetails) new User(taiKhoan.getUserName(), //
                    taiKhoan.getPassword(), grantList);

//            System.out.println(customUserDetails.getUser().getUsername());

            return userDetails;
        }
    }
}
