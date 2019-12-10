package com.project.dhpro.jwt;

import com.project.dhpro.models.TaiKhoan;
import com.project.dhpro.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private TaiKhoanService taiKhoanService;


    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        // Kiểm tra xem header Authorization có chứa thông tin jwt không
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("Checking");
        String url = request.getRequestURI();
        if (!url.startsWith("/login") && !url.startsWith("/customerUnauthenticated")) {
            System.out.println("Checking");
            try {
                // Lấy jwt từ request
                String jwt = getJwtFromRequest(request);

                System.out.println("JWT from header: " + jwt);

                System.out.println(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt));

                if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                    // Lấy id user từ chuỗi jwt
                    Long userId = tokenProvider.getUserIdFromJWT(jwt);
//                System.out.println("Id: "+userId);
                    // Lấy thông tin người dùng từ id

                    TaiKhoan taiKhoan = taiKhoanService.findById(Math.toIntExact(userId));

                    ArrayList<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();

                    if (taiKhoan.getRole().getTenRole() != null) {
                        GrantedAuthority authority = new SimpleGrantedAuthority(taiKhoan.getRole().getTenRole());
                        grantList.add(authority);
                    }

                    UserDetails userDetails = (UserDetails) new User(taiKhoan.getUserName(), //
                            taiKhoan.getPassword(), grantList);
                    System.out.println("User detail");
                    System.out.println(userDetails);
                    if (userDetails != null) {
                        // Nếu người dùng hợp lệ, set thông tin cho Seturity Context
                        UsernamePasswordAuthenticationToken
                                authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                    System.out.println("Valid");
                } else {
                    response.sendError(403);
//                    response.
                    return;
                }
            } catch (Exception ex) {
                System.out.println("Exception: " + ex.toString());
                System.out.println("failed on set user authentication");
                response.sendError(403);
            }
        }
        else
        {
            System.out.println("Good");
            filterChain.doFilter(request,response);
            return;
        }

        filterChain.doFilter(request, response);
        return;
    }
}