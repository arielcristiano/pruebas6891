package com.api.e_commerce.model.state;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public class Cancelado implements EstadoPartida {

    @Override
    public void agregarJugador(Partida partida, Usuario usuario) {
        throw new UnsupportedOperationException("No se pueden agregar jugadores a una partida cancelada.");
    }

    @Override
    public void confirmarJugador(Partida partida, Usuario usuario) {
        throw new UnsupportedOperationException("No se pueden confirmar jugadores en una partida cancelada.");
    }
    @Override
    public String toString() {
        return "cancelado";
    }
}
