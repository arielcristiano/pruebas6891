package com.api.e_commerce.controller;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.api.e_commerce.dto.PartidaDTO;
import com.api.e_commerce.dto.PartidaFilterDTO;
import com.api.e_commerce.model.Partida;
import com.api.e_commerce.repository.PartidaRepository;
import com.api.e_commerce.service.PartidaService;

import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/partidas") //localhost:8080/api/partidas del locahost:8080/api/partidas/id
@CrossOrigin(origins = "http://localhost:5173")
public class PartidaController {
    
    @Autowired //inyecta automaticamente una instancia de productorepository en el controlador
    private PartidaService partidaService;

    @GetMapping
    public ResponseEntity<?> getAllPartidas() {
        try {
            List<Partida> partidas = partidaService.buscarPartidaFiltrados(new PartidaFilterDTO()); // sin filtros
            List<PartidaDTO> dtoResults = partidas.stream()
                .map(PartidaDTO::new)
                .toList();
            System.out.println("Controller: Se encontraron " + dtoResults.size() + " partidas");
            return ResponseEntity.ok(dtoResults);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al obtener partidas");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getScrimById(@PathVariable Long id) {
        try {
            Partida partida = partidaService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Partida no encontrada"));
            PartidaDTO dto = new PartidaDTO(partida);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Partida no encontrada");
        }
    }
    @PostMapping // esto responde a ("/api/partidas")
    public Partida crearPartida(@RequestBody Partida partida) {
        try {
            return partidaService.crearPartida(partida);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPartida(@PathVariable Long id) {
        System.out.println("DELETE request received for id: " + id);
        try {
            partidaService.eliminarPartida(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("Error deleting partida: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/mis-partidas")
    public List<Partida> getMisPartidas() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return partidaService.obtenerPartidasPorUsuario(email);
    }



    // 🔹 Partidas

    @GetMapping("/filtradas")
    public ResponseEntity<?> buscarPartidas(
            @RequestParam(required = false) String juego,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) Integer rangoMin,
            @RequestParam(required = false) Integer rangoMax,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String fecha,
            @RequestParam(required = false) Integer latenciaMax,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "20") Integer pageSize,
            @RequestParam(required = false, defaultValue = "fecha") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String sortDir
    ) {
        try {
            PartidaFilterDTO filtro = new PartidaFilterDTO();
            filtro.setJuego(juego);
            filtro.setRegion(region);
            filtro.setRangoMin(rangoMin);
            filtro.setRangoMax(rangoMax);
            if (fecha != null && !fecha.isBlank()) {
                try {
                    filtro.setFecha(LocalDate.parse(fecha));
                } catch (DateTimeParseException ex) {
                    return ResponseEntity.badRequest().body("Formato de fecha inválido. Use YYYY-MM-DD");
                }
            }
            filtro.setLatenciaMax(latenciaMax);
            filtro.setPage(page);
            filtro.setPageSize(pageSize);
            filtro.setSortBy(sortBy);
            filtro.setSortDir(sortDir);

            List<Partida> results = partidaService.buscarPartidaFiltrados(filtro);
            List<PartidaDTO> dtoResults = results.stream()
                .map(PartidaDTO::new)
                .toList();

            return ResponseEntity.ok(dtoResults);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al buscar partidas");
        }
    }
}
