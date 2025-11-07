package com.api.e_commerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.hibernate.Hibernate;
import org.springframework.security.core.Authentication;
import com.api.e_commerce.dto.PartidaFilterDTO;
import com.api.e_commerce.exception.ProductoNotFoundException;
import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.repository.PartidaRepository;
import com.api.e_commerce.repository.UsuarioRepository;

@Service
public class PartidaService {

    @Autowired
    private PartidaRepository partidaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public List<Partida> buscarPartidaFiltrados(PartidaFilterDTO filtro) {
        // lógica de filtrado real si querés, o simplemente:
        return partidaRepository.findAll();
    }
    public Optional<Partida> buscarPorId(Long id) {
        return partidaRepository.findById(id);
    }

    public Partida crearPartida(Partida partida) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        partida.setCreador(usuario);

        if (partida.getJuego() == null || partida.getJuego().isEmpty()) {
            throw new IllegalArgumentException("El campo 'juego' es obligatorio.");
        }

    return partidaRepository.save(partida);
    }
    public void eliminarPartida(Long id) {
        partidaRepository.deleteById(id);
    }  

    public List<Partida> obtenerPartidasPorUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return partidaRepository.findByUsuario(usuario);
    }
    public List<Partida> obtenerTodasPartidas() {
        List<Partida> partidas = this.partidaRepository.findAll();
        System.out.println("Service: Total partidas encontradas: " + partidas.size());
        partidas.forEach(p -> System.out.println("Service: Partida ID: " + p.getId() + ", Nombre: " + p.getJuego()));
        return partidas;
    }

    @Transactional(readOnly = true)
    public Partida obtenerPartidaPorId(Long id) {
    Partida partida = partidaRepository.findById(id)
        .orElseThrow(() -> new ProductoNotFoundException(id));
    return partida;
    }
       
    public Partida actualizarPartida(Long id, Partida partidaActualizada) {
        Partida partidaExistente = this.obtenerPartidaPorId(id);

        //actualizar solo los campos permitidos
        partidaExistente.setJuego(partidaActualizada.getJuego());
        return this.partidaRepository.save(partidaExistente);
    }

}
