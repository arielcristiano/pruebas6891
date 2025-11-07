package com.api.e_commerce.model;

public abstract class UsuarioDecorador  {
    protected Usuario decorateUsuario;
    
    public UsuarioDecorador(Usuario usuario) {
        this.decorateUsuario = usuario;
    }   
    public String getNombre() { return decorateUsuario.getNombre(); }
    public String getEmail() { return decorateUsuario.getEmail(); }
    public String getPassword() { return decorateUsuario.getPassword(); }
    public void setNombre(String nombre) { decorateUsuario.setNombre(nombre); }
    public void setEmail(String email) { decorateUsuario.setEmail(email); }
    public void setPassword(String password) { decorateUsuario.setPassword(password); }
    public Usuario getUsuario() { return decorateUsuario; }
}
