package com.api.e_commerce.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class PartidaFilterDTO {
    private String juego;
    private String region;
    private Integer rangoMin;
    private Integer rangoMax;
    // Fecha en formato ISO (YYYY-MM-DD) para filtrar por día
    private LocalDate fecha;
    private Integer latenciaMax;

    // Paginación/orden
    private Integer page = 1;
    private Integer pageSize = 20;
    private String sortBy = "fecha";
    private String sortDir = "desc"; // or "asc"
}
