package com.api.e_commerce.dto;

import java.time.LocalDateTime;

import com.api.e_commerce.model.Partida;

import lombok.Data;

@Data
public class PartidaDTO {
    private Long id;
    private String juego;
    private String region;
    private Integer rangoMin;
    private Integer rangoMax;
    private LocalDateTime fecha;
    private Integer latencia;
    private String descripcion;
    private String creador;
    private String imagen; // ← nombre del usuario

    public PartidaDTO(Partida partida) {
        this.id = partida.getId();
        this.juego = partida.getJuego();
        this.region = partida.getRegion();
        this.rangoMin = partida.getRangoMin();
        this.rangoMax = partida.getRangoMax();
        this.fecha = partida.getFecha();
        this.latencia = partida.getLatencia();
        this.descripcion = partida.getDescripcion();
        this.creador = partida.getCreador() != null ? partida.getCreador().getUsuario() : null;
        this.imagen = partida.getImagen();
    }
}
