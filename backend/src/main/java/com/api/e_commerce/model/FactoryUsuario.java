package com.api.e_commerce.model;

public class FactoryUsuario {
    public static Usuario crearUsuario(String nombre, String email, String contraseña) {
        return new UsuarioConcreto(nombre, email, contraseña);
    }
    
}
