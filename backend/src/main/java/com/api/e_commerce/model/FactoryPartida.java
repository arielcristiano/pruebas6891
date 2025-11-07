package com.api.e_commerce.model;

import java.time.LocalDateTime;
import com.api.e_commerce.model.state.EstadoPartida;
import com.api.e_commerce.model.strategy.EstrategiaEmparejamiento;

public class FactoryPartida {
    public static Partida crearPartida(String juego, String region, LocalDateTime fecha, int rangoMin, int rangoMax, int cantidadJugadores, EstadoPartida estado, EstrategiaEmparejamiento estrategiaEmparejamiento, Usuario creador) {
        Partida partida = new Partida(juego, region, fecha, rangoMin, rangoMax, cantidadJugadores, estado, estrategiaEmparejamiento, creador);
        // Auto-unión del creador
        if (creador != null && !partida.getJugadores().contains(creador)) {
            partida.getJugadores().add(creador);
        }
        return partida;
    }
}
