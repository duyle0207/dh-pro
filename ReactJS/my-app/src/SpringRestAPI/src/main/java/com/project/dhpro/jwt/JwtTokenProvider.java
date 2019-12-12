package com.project.dhpro.jwt;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {
    // Đoạn JWT_SECRET này là bí mật, chỉ có phía server biết
    private final String JWT_SECRET = "SecretForAccessToken";

    private final String JWT_REFRESH_SECRET = "SecretForRefreshToken";

    //Thời gian có hiệu lực của chuỗi jwt
    private final long JWT_EXPIRATION = 30000L;


    private final long JWT_REFRESH_EXPIRATION = 604800000L;

    // Tạo ra jwt từ thông tin user
    public String generateToken(int id) {
        System.out.println("Creating Token");
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        // Tạo chuỗi json web token từ id của user.
//        int id = (accountRepository.findByUsername(customUserDetails.getUsername())).getId();

        System.out.println("Expried: "+expiryDate);

        return Jwts.builder()
                .setSubject(String.valueOf(id))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public String generateRefreshToken(int id)
    {
        System.out.println("Creating Token");
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_REFRESH_EXPIRATION);

        // Tạo chuỗi json web token từ id của user.
//        int id = (accountRepository.findByUsername(customUserDetails.getUsername())).getId();

        System.out.println("Expried: "+expiryDate);

        return Jwts.builder()
                .setSubject(String.valueOf(id))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_REFRESH_SECRET)
                .compact();
    }

    // Lấy thông tin user từ jwt
    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        System.out.println("getID: "+Long.parseLong(claims.getSubject()));

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty.");
        }
        return false;
    }

//    public boolean validateJWTCustom(String jwt)
//    {
//        try {
//            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(jwt);
//            return true;
//        } catch (MalformedJwtException ex) {
//            System.out.println("Invalid JWT token");
//        } catch (ExpiredJwtException ex) {
//            System.out.println("Expired JWT token");
//        } catch (UnsupportedJwtException ex) {
//            System.out.println("Unsupported JWT token");
//        } catch (IllegalArgumentException ex) {
//            System.out.println("JWT claims string is empty.");
//        }
//        return false;
//    }
}
