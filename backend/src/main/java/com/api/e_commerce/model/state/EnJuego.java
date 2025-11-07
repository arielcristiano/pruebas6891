package com.api.e_commerce.model.state;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public class EnJuego implements EstadoPartida {
    @Override
    public void agregarJugador(Partida partida, Usuario usuario) {
        // Lógica para agregar un jugador cuando la partida está en juego
        System.out.println("No se puede agregar jugadores. La partida ya está en juego.");
    }

    @Override
    public void confirmarJugador(Partida partida, Usuario usuario) {
        // Lógica para confirmar un jugador cuando la partida está en juego
        System.out.println("No se puede confirmar jugadores. La partida ya está en juego.");
    }
    @Override
    public String toString() {
        return "en juego";
    }
    
}
