package com.api.e_commerce.model.adapter;

public class AdapterJavaEmail implements IAdapterEmail {
    @Override
    public void enviarEmail(String destino, String asunto, String cuerpo) {
        System.out.println("Enviando email a: " + destino + " | Asunto: " + asunto + " | Cuerpo: " + cuerpo);
    }
}
