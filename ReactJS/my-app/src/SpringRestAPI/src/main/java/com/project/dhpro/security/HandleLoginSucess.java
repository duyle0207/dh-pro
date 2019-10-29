package com.project.dhpro.security;

import com.project.dhpro.service.TaiKhoanDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Collection;

@Component
public class HandleLoginSucess implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {
        handle(httpServletRequest, httpServletResponse, authentication);
//        clearAuthenticationAttributes(httpServletRequest);
    }

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    public RedirectStrategy getRedirectStrategy() {
        return redirectStrategy;
    }

    public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
        this.redirectStrategy = redirectStrategy;
    }


    protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        System.out.println("Login Success");
        HttpSession session = request.getSession();
        session.setAttribute("accountInfo",authentication);
        String url = determineTargetUrl(authentication);
        if(response.isCommitted())
        {
            return;
        }
        redirectStrategy.sendRedirect(request,response,url);
    }

    private String determineTargetUrl(Authentication auth) {
        String url = "/LoginSuccess";

//        Collection<? extends GrantedAuthority> authorities
//                = auth.getAuthorities();
//
//        for (GrantedAuthority grantedAuthority : authorities) {
//            if (grantedAuthority.getAuthority().equals("Employee")) {
//                url = "/LoginSuccess";
//            } else if (grantedAuthority.getAuthority().equals("Admin")) {
//                url = "/admin";
//            }
//        }
//        System.out.println(url);
        return url;
    }
}
