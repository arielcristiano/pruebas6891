package com.api.e_commerce.model.state;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public class BuscandoJugadores implements EstadoPartida {
    @Override
    public void agregarJugador(Partida partida, Usuario usuario) {
        partida.getJugadores().add(usuario);
        if (partida.getJugadores().size() >= partida.getCantidadJugadores()) {
            partida.setEstado(new LobbyArmado());
        }
    }
    @Override
    public void confirmarJugador(Partida partida, Usuario usuario) {
        // No hace nada en este estado
    }
    @Override
    public String toString() {
        return "necesitamos jugadores";
    }
}
