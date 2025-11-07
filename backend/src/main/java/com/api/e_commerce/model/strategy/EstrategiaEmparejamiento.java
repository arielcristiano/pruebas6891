package com.api.e_commerce.model.strategy;

import java.util.List;

import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public interface EstrategiaEmparejamiento {
    List<Partida> emparejar(Usuario usuario, List<Partida> partidas);
}
