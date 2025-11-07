package com.api.e_commerce.model.notification;

public class NotificacionEmail implements IEstrategiaNotificacion {
    @Override
    public void notificar(String mensaje, String destino) {
        System.out.println("Email a " + destino + ": " + mensaje);
    }
}
