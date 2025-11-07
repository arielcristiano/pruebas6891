package com.api.e_commerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import com.api.e_commerce.dto.PartidaFilterDTO;
import com.api.e_commerce.exception.ProductoNotFoundException;
import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.model.state.BuscandoJugadores;
import com.api.e_commerce.repository.PartidaRepository;
import com.api.e_commerce.repository.UsuarioRepository;

@Service
public class PartidaService {
 @Autowired
    private PartidaRepository partidaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    /**
     * Busca partidas con filtros aplicados
     */
    public List<Partida> buscarPartidaFiltrados(PartidaFilterDTO filtro) {
        // TODO: Implementar filtrado real según el DTO
        List<Partida> partidas = partidaRepository.findAll();
        
        // Inicializar estados y estrategias (por si @PostLoad no se ejecutó)
        partidas.forEach(p -> {
            if (p.getEstado() == null) {
                p.inicializarEstadoYEstrategia();
            }
        });
        
        return partidas;
    }
    
    /**
     * Busca una partida por ID
     */
    @Transactional(readOnly = true)
    public Optional<Partida> buscarPorId(Long id) {
        Optional<Partida> partidaOpt = partidaRepository.findById(id);
        
        // Asegurar que el estado esté inicializado
        partidaOpt.ifPresent(p -> {
            if (p.getEstado() == null) {
                p.inicializarEstadoYEstrategia();
            }
        });
        
        return partidaOpt;
    }

    /**
     * Crea una nueva partida
     */
    @Transactional
    public Partida crearPartida(Partida partida) {
        // Obtener usuario autenticado
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Validaciones
        if (partida.getJuego() == null || partida.getJuego().isEmpty()) {
            throw new IllegalArgumentException("El campo 'juego' es obligatorio.");
        }

        // Asignar creador
        partida.setCreador(usuario);
        
        // Asignar estado inicial si no tiene
        if (partida.getEstado() == null) {
            partida.setEstado(new BuscandoJugadores());
        }
        
        // El @PrePersist sincronizará el estadoNombre automáticamente
        Partida partidaGuardada = partidaRepository.save(partida);
        
        // Registrar al creador como observador
        partidaGuardada.agregarObservador(usuario);
        
        return partidaGuardada;
    }
    
    /**
     * Elimina una partida por ID
     */
    @Transactional
    public void eliminarPartida(Long id) {
        if (!partidaRepository.existsById(id)) {
            throw new ProductoNotFoundException(id);
        }
        partidaRepository.deleteById(id);
    }

    /**
     * Obtiene partidas creadas por un usuario
     */
    @Transactional(readOnly = true)
    public List<Partida> obtenerPartidasPorUsuario(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        List<Partida> partidas = partidaRepository.findByCreador(usuario);
        
        // Inicializar estados
        partidas.forEach(p -> {
            if (p.getEstado() == null) {
                p.inicializarEstadoYEstrategia();
            }
        });
        
        return partidas;
    }
    
    /**
     * Obtiene todas las partidas
     */
    @Transactional(readOnly = true)
    public List<Partida> obtenerTodasPartidas() {
        List<Partida> partidas = partidaRepository.findAll();
        
        System.out.println("Service: Total partidas encontradas: " + partidas.size());
        
        // Inicializar estados y estrategias
        partidas.forEach(p -> {
            if (p.getEstado() == null) {
                p.inicializarEstadoYEstrategia();
            }
            System.out.println("Service: Partida ID: " + p.getId() + 
                             ", Juego: " + p.getJuego() + 
                             ", Estado: " + p.getEstadoNombre());
        });
        
        return partidas;
    }

    /**
     * Obtiene una partida por ID (con excepción si no existe)
     */
    @Transactional(readOnly = true)
    public Partida obtenerPartidaPorId(Long id) {
        Partida partida = partidaRepository.findById(id)
            .orElseThrow(() -> new ProductoNotFoundException(id));
        
        // Asegurar inicialización
        if (partida.getEstado() == null) {
            partida.inicializarEstadoYEstrategia();
        }
        
        return partida;
    }
    
    /**
     * Actualiza una partida existente
     */
    @Transactional
    public Partida actualizarPartida(Long id, Partida partidaActualizada) {
        Partida partidaExistente = obtenerPartidaPorId(id);

        // Actualizar solo los campos permitidos
        if (partidaActualizada.getJuego() != null) {
            partidaExistente.setJuego(partidaActualizada.getJuego());
        }
        if (partidaActualizada.getRegion() != null) {
            partidaExistente.setRegion(partidaActualizada.getRegion());
        }
        if (partidaActualizada.getFecha() != null) {
            partidaExistente.setFecha(partidaActualizada.getFecha());
        }
        if (partidaActualizada.getDescripcion() != null) {
            partidaExistente.setDescripcion(partidaActualizada.getDescripcion());
        }
        
        // Si hay un nuevo estado, actualizarlo
        if (partidaActualizada.getEstado() != null) {
            partidaExistente.setEstado(partidaActualizada.getEstado());
        }
        
        // Si hay nueva estrategia, actualizarla
        if (partidaActualizada.getEstrategiaEmparejamiento() != null) {
            partidaExistente.setEstrategiaEmparejamiento(
                partidaActualizada.getEstrategiaEmparejamiento()
            );
        }

        return partidaRepository.save(partidaExistente);
    }
}