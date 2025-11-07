package com.api.e_commerce.controller;

import java.util.List;

import com.api.e_commerce.model.Usuario;

public class NotificacionesUsuarioController {
    private static NotificacionesUsuarioController instance;
    private NotificacionesUsuarioController() {}
    public static NotificacionesUsuarioController getInstance() {
        if (instance == null) instance = new NotificacionesUsuarioController();
        return instance;
    }
    public List<String> getNotificacionesUsuario(Usuario usuario) {
        return usuario.getNotificaciones();
    }
    public void eliminarNotificacion(Usuario usuario, String notificacion) {
        usuario.getNotificaciones().remove(notificacion);
    }
    public void limpiarNotificaciones(Usuario usuario) {
        usuario.getNotificaciones().clear();
    }
}
