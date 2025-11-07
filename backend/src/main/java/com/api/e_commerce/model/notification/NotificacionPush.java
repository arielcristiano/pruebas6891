package com.api.e_commerce.model.notification;

import com.api.e_commerce.model.adapter.IAdapterPush;

public class NotificacionPush implements IEstrategiaNotificacion {
    private IAdapterPush adapterPush;

    public NotificacionPush() {
        this.adapterPush = new com.api.e_commerce.model.adapter.AdapterJavaPush();
    }
    public NotificacionPush(IAdapterPush adapterPush) {
        this.adapterPush = adapterPush;
    }
    @Override
    public void notificar(String mensaje, String destino) {
        adapterPush.enviarPush(destino, mensaje);
    }
}
