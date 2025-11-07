package com.api.e_commerce.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.api.e_commerce.model.observer.NotificacionObserver;
import com.api.e_commerce.model.observer.PartidaObservable;
import com.api.e_commerce.model.state.EstadoFabrica;
import com.api.e_commerce.model.state.EstadoPartida;
import com.api.e_commerce.model.strategy.EstrategiaEmparejamiento;
import com.api.e_commerce.model.strategy.EstrategiaFabrica;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Transient;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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
    @Column(name = "rango_min")
    private Integer rangoMin;
    @Column(name = "rango_max")
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

   //Persistir solo el NOMBRE de la estrategia
    @Column(name = "tipo_estrategia")
    private String tipoEstrategia; // "RANGO", "LATENCIA", "ROLES"
    
    // Datos adicionales para reconstruir la estrategia
    @Column(name = "estrategia_juego")
    private String estrategiaJuego;
    
    @Column(name = "estrategia_rango")
    private String estrategiaRango;
    
    //Persistir solo el NOMBRE del estado
    @Column(name = "estado")
    private String estadoNombre = "BUSCANDO_JUGADORES"; // Valor por defecto
    

    @Transient
    private List<Usuario> jugadores;
    
    @Transient
    private EstrategiaEmparejamiento estrategiaEmparejamiento;
    @Transient
    private List<NotificacionObserver> observadores = new ArrayList<>();
    
    @Transient
    private EstadoPartida estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties({"partidas"})
    private Usuario creador; // Relación con la entidad Usuario, varias partidas tienen un usuario

     // ✅ HOOK: Sincronizar antes de guardar en BD
    @PrePersist
    @PreUpdate
    public void sincronizarEstado() {
        if (this.estado != null) {
            this.estadoNombre = this.estado.getClass().getSimpleName().toUpperCase();
        }
    }

     // ✅ HOOK: Reconstruir objetos después de cargar desde BD
    @PostLoad
    public void inicializarEstadoYEstrategia() {
        // Reconstruir estado
        if (this.estadoNombre != null) {
            this.estado = EstadoFabrica.obtenerEstado(this.estadoNombre);
        }
        
        // Reconstruir estrategia
        if (this.tipoEstrategia != null) {
            this.estrategiaEmparejamiento = EstrategiaFabrica.crear(
                this.tipoEstrategia, 
                this.estrategiaJuego, 
                this.estrategiaRango
            );
        }
        
        // Inicializar listas
        if (this.jugadores == null) {
            this.jugadores = new ArrayList<>();
        }
        if (this.observadores == null) {
            this.observadores = new ArrayList<>();
        }
    }

    // Constructor para crear partidas nuevas
    public Partida(String juego, String region, Integer rangoMin, Integer rangoMax, 
                   LocalDateTime fecha, Integer latencia, String descripcion, 
                   String imagen, int cantidadJugadores, Usuario creador,
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
        this.jugadores = new ArrayList<>();
        this.observadores = new ArrayList<>();
        
        // Asignar estrategia y extraer sus datos
        setEstrategiaEmparejamiento(estrategiaEmparejamiento);
    }

    // Segundo constructor (para compatibilidad)
    public Partida(String juego, String region, LocalDateTime fecha, 
                   int rangoMin, int rangoMax, int cantidadJugadores, 
                   EstadoPartida estado, EstrategiaEmparejamiento estrategia,
                   Usuario creador) {
        this.juego = juego;
        this.region = region;
        this.fecha = fecha;
        this.rangoMin = rangoMin;
        this.rangoMax = rangoMax;
        this.cantidadJugadores = cantidadJugadores;
        this.creador = creador;
        this.jugadores = new ArrayList<>();
        this.observadores = new ArrayList<>();
        
        setEstado(estado);
        setEstrategiaEmparejamiento(estrategia);
    }

    public int getCantidadJugadores() { return cantidadJugadores; }
    public List<Usuario> getJugadores() { 
        if (jugadores == null) {
            jugadores = new ArrayList<>();
        }
        return jugadores; 
    }
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


    

