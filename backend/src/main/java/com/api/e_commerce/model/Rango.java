package com.api.e_commerce.model;

public enum Rango {
    HIERRO,
    BRONCE,
    PLATA,
    ORO,
    PLATINO,
    DIAMANTE,
    ASCENDENTE,
    INMORTAL,
    RADIANTE;

    public static Rango getRandom() {
        Rango[] valores = Rango.values();
        return valores[(int)(Math.random() * valores.length)];
    }
}
