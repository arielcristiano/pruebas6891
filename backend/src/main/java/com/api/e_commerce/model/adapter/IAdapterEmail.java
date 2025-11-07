package com.api.e_commerce.model.adapter;

public interface IAdapterEmail {
    void enviarEmail(String destino, String asunto, String cuerpo);
}
