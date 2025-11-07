package com.api.e_commerce.model.strategy;

import java.util.List;
import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public class EmparejamientoRoles implements EstrategiaEmparejamiento {
    private final String juego;
    
    public EmparejamientoRoles(String juego) {
        this.juego = juego;
    }
    @Override
    public List<Partida> emparejar(Usuario usuario, List<Partida> partidas) {
        String mijuego = null;
        if (usuario != null) {
            com.api.e_commerce.model.Usuario u = usuario;
            while (u instanceof com.api.e_commerce.model.UsuarioDecorador) {
                if (u instanceof com.api.e_commerce.model.UsuarioRolDecorador) {
                    mijuego = ((com.api.e_commerce.model.UsuarioRolDecorador) u).getRoles().name();
                    break;
                }
                u= ((com.api.e_commerce.model.UsuarioDecorador) u).getUsuario();
            }
        }
        if (mijuego != null && !mijuego.equalsIgnoreCase(juego)) {
            return java.util.Collections.emptyList();
        }
        return partidas.stream()
                .filter(p -> p.getJuego().equalsIgnoreCase(juego))
                .collect(java.util.stream.Collectors.toList());  
    }
    @Override
    public String toString() {
        return "Emparejamiento por Roles";
    }
    
}
