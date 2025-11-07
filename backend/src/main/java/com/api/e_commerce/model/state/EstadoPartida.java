package com.api.e_commerce.model.state;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public interface EstadoPartida {
     void agregarJugador(Partida partida, Usuario usuario);
    void confirmarJugador(Partida partida, Usuario usuario);
    
}
