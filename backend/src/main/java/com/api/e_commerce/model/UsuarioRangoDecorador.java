package com.api.e_commerce.model;

public class UsuarioRangoDecorador extends UsuarioDecorador {
    private Rango rango;

    public UsuarioRangoDecorador(Usuario usuario, Rango rango) {
        super(usuario);
        this.rango = rango;
    }

    public Rango getRango() {
        return rango;
    }
    
}
