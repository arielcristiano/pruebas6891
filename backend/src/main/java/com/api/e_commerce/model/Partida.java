package com.api.e_commerce.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.api.e_commerce.model.observer.NotificacionObserver;
import com.api.e_commerce.model.observer.PartidaObservable;
import com.api.e_commerce.model.state.EstadoFabrica;
import com.api.e_commerce.model.state.EstadoPartida;
import com.api.e_commerce.model.strategy.EstrategiaEmparejamiento;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.Transient;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "partidas")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Partida implements PartidaObservable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String juego;

    private String region;

    /**
     * Rango representado como número (por ejemplo MMR, ELO o similar)
     */
    private Integer rangoMin;
    private Integer rangoMax;

    /**
     * Fecha y hora propuesta para la partida
     */
    private LocalDateTime fecha;

    /**
     * Latencia máxima aceptable en ms
     */
    private Integer latencia;

    // Otros campos opcionales
    private String descripcion;
    private String imagen;
    private int cantidadJugadores;
    private List<Usuario> jugadores;
    
    private EstrategiaEmparejamiento estrategiaEmparejamiento;
    private List<NotificacionObserver> observadores = new ArrayList<>();
    
    @Column(name = "estado")
    private String estadoNombre;

    @Transient
    private EstadoPartida estado;

    @PostLoad
    public void inicializarEstado() {
        this.estado = EstadoFabrica.obtenerEstado(this.estadoNombre);
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties({"partidas"})
    private Usuario creador; // Relación con la entidad Usuario, varias partidas tienen un usuario

    public Partida( String juego, String region, Integer rangoMin, Integer rangoMax, LocalDateTime fecha,
            Integer latencia, String descripcion, String imagen, int cantidadJugadores, Usuario creador,
            Usuario usuario, EstrategiaEmparejamiento estrategiaEmparejamiento) {
        this.juego = juego;
        this.region = region;
        this.rangoMin = rangoMin;
        this.rangoMax = rangoMax;
        this.fecha = fecha;
        this.latencia = latencia;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.cantidadJugadores = cantidadJugadores;
        this.creador = creador;
        this.estrategiaEmparejamiento = estrategiaEmparejamiento;
        this.jugadores = new ArrayList<>();
    }

    public Partida(String juego2, String region2, LocalDateTime fecha2, int rangoMin2, int rangoMax2,
            int cantidadJugadores2, EstadoPartida estado2, EstrategiaEmparejamiento estrategiaEmparejamiento2,
            Usuario creador2) {
        //TODO Auto-generated constructor stub
    }

    public int getCantidadJugadores() { return cantidadJugadores; }
    public List<Usuario> getJugadores() { return jugadores; }
    public EstadoPartida getEstado() { return estado; }
    public void setEstado(EstadoPartida estado) {
        this.estado = estado;
        String mensaje = "El partido de " + juego + " en " + region + " cambió de estado a: " + estado.toString();
        notificarObservadores(mensaje);
    }
    @Override
    public void agregarObservador(NotificacionObserver observer) {
        if (!observadores.contains(observer)) {
            observadores.add(observer);
        }
    }

    @Override
    public void quitarObservador(NotificacionObserver observer) {
        observadores.remove(observer);
    }

    @Override
    public void notificarObservadores(String mensaje) {
        for (NotificacionObserver obs : observadores) {
            obs.notificar(mensaje);
        }
    }
}


    

