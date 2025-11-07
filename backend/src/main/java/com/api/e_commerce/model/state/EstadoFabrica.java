package com.api.e_commerce.model.state;

public class EstadoFabrica {
    public static EstadoPartida obtenerEstado(String nombre) {
        return switch (nombre) {
            case "BUSCANDO_JUGADORES" -> new BuscandoJugadores();
            case "CANCELADA"    -> new Cancelado();
            case "CONFIRMADO" -> new Confirmado();
            case "EN_JUEGO" -> new EnJuego();
            case "FINALIZADO" -> new Finalizado();
            case "LOBBY_ARMADO" -> new LobbyArmado();
            default -> throw new IllegalArgumentException("Estado inválido: " + nombre);
        };
    }
}
