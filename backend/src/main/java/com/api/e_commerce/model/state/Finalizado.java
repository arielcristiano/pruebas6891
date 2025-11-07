package com.api.e_commerce.model.state;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public class Finalizado implements EstadoPartida {

    @Override
    public void agregarJugador(Partida partida, Usuario usuario) {
        throw new UnsupportedOperationException("No se pueden agregar jugadores a una partida finalizada.");
    }

    @Override
    public void confirmarJugador(Partida partida, Usuario usuario) {
        throw new UnsupportedOperationException("No se pueden confirmar jugadores en una partida finalizada.");
    }
    @Override
    public String toString() {
        return "finalizado";
    }

   
    
}
