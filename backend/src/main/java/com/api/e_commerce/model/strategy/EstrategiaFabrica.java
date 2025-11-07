package com.api.e_commerce.model.strategy;


import com.api.e_commerce.model.Rango;

/**
 * Fábrica para reconstruir estrategias desde la base de datos
 */
public class EstrategiaFabrica {
    
    /**
     * Crea una estrategia basada en el tipo y parámetros guardados
     * 
     * @param tipo Tipo de estrategia: "RANGO", "LATENCIA", "ROLES"
     * @param juego Nombre del juego (opcional, usado por algunas estrategias)
     * @param rangoStr Rango como string (opcional, usado por EmparejamientoRango)
     * @return Instancia de EstrategiaEmparejamiento
     */
    public static EstrategiaEmparejamiento crear(String tipo, String juego, String rangoStr) {
        if (tipo == null) {
            return new EmparejamientoLatencia(); // Estrategia por defecto
        }
        
        return switch (tipo.toUpperCase()) {
            case "RANGO" -> {
                if (juego != null && rangoStr != null) {
                    try {
                        Rango rango = Rango.valueOf(rangoStr.toUpperCase());
                        yield new EmparejamientoRango(juego, rango);
                    } catch (IllegalArgumentException e) {
                        // Si el rango no es válido, usar uno aleatorio
                        yield new EmparejamientoRango(juego, Rango.getRandom());
                    }
                }
                // Sin parámetros suficientes, usar valores por defecto
                yield new EmparejamientoRango("Valorant", Rango.PLATA);
            }
            case "LATENCIA" -> new EmparejamientoLatencia();
            case "ROLES" -> {
                if (juego != null) {
                    yield new EmparejamientoRoles(juego);
                }
                yield new EmparejamientoRoles("Valorant"); // Juego por defecto
            }
            default -> new EmparejamientoLatencia(); // Fallback
        };
    }
    
    /**
     * Crea una estrategia solo con el tipo (sin parámetros adicionales)
     */
    public static EstrategiaEmparejamiento crear(String tipo) {
        return crear(tipo, null, null);
    }
}