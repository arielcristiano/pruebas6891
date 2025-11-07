package com.api.e_commerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.e_commerce.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //Optional se usa para manejar valores que pueden ser nulos de una manera más segura.
    //Si encuentra un usuario con ese email, retorna Optional.of(usuario)
    //Si no encuentra un usuario, retorna Optional.empty()
    //automaticamente crea la consulta SQL _ SELECT * FROM usuarios WHERE email = ? 
    Optional<Usuario> findByEmail(String email);
    //automaticamente crea la consulta SQL _ SELECT * FROM usuarios WHERE email = ? > true or false
    Boolean existsByEmail(String email);
}