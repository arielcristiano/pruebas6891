package com.api.e_commerce.model.notification;

import java.util.ArrayList;
import java.util.List;

public class Notificador {
     private List<IEstrategiaNotificacion> estrategias = new ArrayList<>();

    public void agregarEstrategia(IEstrategiaNotificacion estrategia) {
        estrategias.add(estrategia);
    }

    public void notificar(String mensaje, String destino) {
        for (IEstrategiaNotificacion e : estrategias) {
            e.notificar(mensaje, destino);
        }
    }
}
