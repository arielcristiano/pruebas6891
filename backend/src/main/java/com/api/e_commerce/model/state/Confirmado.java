package com.api.e_commerce.model.state;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public class Confirmado implements EstadoPartida {

    @Override
    public void agregarJugador(Partida partida, Usuario usuario) {
        // Lógica para agregar un jugador cuando el estado es Confirmado
        System.out.println("No se puede agregar un jugador. La partida ya está confirmada.");
    }

    @Override
    public void confirmarJugador(Partida partida, Usuario usuario) {
        // Lógica para confirmar un jugador cuando el estado es Confirmado
        System.out.println("El jugador ya está confirmado en la partida.");
    }
    @Override
    public String toString() {
        return "confirmado";
    }
}
