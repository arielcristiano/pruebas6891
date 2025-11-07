package com.api.e_commerce.model.state;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public class LobbyArmado implements EstadoPartida {
    @Override
    public void agregarJugador(Partida partida, Usuario usuario) {
        // No se pueden agregar más jugadores
    }
    @Override
    public void confirmarJugador(Partida partida, Usuario usuario) {
        partida.setEstado(new Confirmado());
    }
    @Override
    public String toString() {
        return "Lobby Armado";
    }
}
