package com.api.e_commerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.repository.UsuarioRepository;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario login(String email, String password) {
        return usuarioRepository.findByEmail(email)
            .filter(usuario -> usuario.getPassword().equals(password))
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }

    public Usuario register(Usuario usuario) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return usuarioRepository.save(usuario);
    }
}