package com.api.e_commerce.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.api.e_commerce.model.Role;

import java.util.Date;
import java.util.Set;

import javax.crypto.SecretKey;

import com.api.e_commerce.model.Usuario;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {
        // The key must be at least 256 bits for HS256
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String usuario, Role... roles) {
        String[] roleNames = java.util.Arrays.stream(roles)
                .map(Role::toString)
                .toArray(String[]::new);
        return Jwts.builder()
                .setSubject(usuario)
                .claim("roles", String.join(",", roleNames))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsername(String token) {
        return getClaims(token).getSubject();
    }

    public Set<String> getRoles(String token) {
        String roles = (String) getClaims(token).get("roles");
        return Set.of(roles.split(","));
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = getClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

} 