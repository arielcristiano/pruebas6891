package com.api.e_commerce.model.observer;

public interface PartidaObservable {
    void agregarObservador(NotificacionObserver observer);
    void quitarObservador(NotificacionObserver observer);
    void notificarObservadores(String mensaje);
}
