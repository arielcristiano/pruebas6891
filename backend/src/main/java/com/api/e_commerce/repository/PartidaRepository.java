package com.api.e_commerce.repository;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PartidaRepository extends JpaRepository<Partida, Long> {
    // Si necesitas consultas simples puedes agregarlas aquí.
      List<Partida> findByCreador(Usuario usuario);
    
}
