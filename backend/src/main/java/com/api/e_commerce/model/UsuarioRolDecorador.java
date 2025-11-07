package com.api.e_commerce.model;

public class UsuarioRolDecorador extends UsuarioDecorador {
    private Roles roles;

    public UsuarioRolDecorador(Usuario usuario, Roles roles ) {
        super(usuario);
        this.roles = roles;
    }
    public Roles getRoles() {
        return roles;
    }
    
}
