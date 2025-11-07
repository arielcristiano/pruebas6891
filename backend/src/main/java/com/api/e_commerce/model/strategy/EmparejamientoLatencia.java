package com.api.e_commerce.model.strategy;

import java.util.List;
import com.api.e_commerce.model.Partida;
import com.api.e_commerce.model.Usuario;

public class EmparejamientoLatencia implements EstrategiaEmparejamiento {   
    @Override
    public List<Partida> emparejar(Usuario usuario, List<Partida> partidas) {
        // Implementación del emparejamiento por latencia
        return partidas;
    }
    @Override
    public String toString() {
        return "Emparejamiento por Latencia";
    }
    
}
