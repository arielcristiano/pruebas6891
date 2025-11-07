package com.api.e_commerce.model.strategy;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Rango;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.model.UsuarioDecorador;
import com.api.e_commerce.model.UsuarioRangoDecorador;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class EmparejamientoRango implements EstrategiaEmparejamiento {
    private final String juego;
    private final com.api.e_commerce.model.Rango rango;

    public EmparejamientoRango(String juego, com.api.e_commerce.model.Rango rango) {
        this.juego = juego;
        this.rango = rango;
    }
    private Rango extraerRango(Usuario usuario) {
        Object actual = usuario;
        while (actual instanceof UsuarioDecorador) {
            if (actual instanceof UsuarioRangoDecorador) {
                return ((UsuarioRangoDecorador) actual).getRango();
            }
            actual = ((UsuarioDecorador) actual).getUsuario();
        }
        return null;
    }


    @Override
    public List<Partida> emparejar(Usuario usuario, List<Partida> partidas) {
        Rango rangoUsuario = null;

        // Desenrollar decoradores hasta encontrar el rango
        Object actual = usuario;
        while (actual instanceof UsuarioDecorador) {
            if (actual instanceof UsuarioRangoDecorador) {
                rangoUsuario = ((UsuarioRangoDecorador) actual).getRango();
            }
            actual = ((UsuarioDecorador) actual).getUsuario();
        }

        // Si el rango no coincide, no emparejar
        if (rangoUsuario == null || !rangoUsuario.equals(rango)) {
            return Collections.emptyList();
        }

        // Filtrar partidas por juego y jugadores con rango compatible
        return partidas.stream()
                .filter(p -> p.getJuego().equalsIgnoreCase(juego))
                .filter(p -> p.getJugadores().stream().anyMatch(j ->
                        {
                            Rango r = extraerRango(j);
                            return r != null && r.equals(rango);
                        }))
                .collect(Collectors.toList());
    }


    @Override
    public String toString() {
        return "Emparejamiento por Rango";
    }
}
