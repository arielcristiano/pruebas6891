package com.api.e_commerce.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.api.e_commerce.model.observer.NotificacionObserver;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "usuarios")  
public class Usuario implements UserDetails, NotificacionObserver{
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    @Column(unique = true)
    private String email;
    private String usuario;
    private String password;
    private String telefono;
    // IMPORTANTE: Rango como String, con valor por defecto
    @Column(nullable = false)
    private String rango; // Valor por defecto
    @Enumerated(EnumType.STRING)
    private Role role; // Enum para definir roles de usuario
    
    // Método de ciclo de vida JPA - se ejecuta antes de persistir
    private List<String> notificaciones = new ArrayList<>();
    public List<String> getNotificaciones() { return notificaciones; }
    @Override
    public void notificar(String mensaje) {
        notificaciones.add(mensaje);
    }
    
    @PrePersist
    public void prePersist() {
        if (this.rango == null || this.rango.trim().isEmpty()) {
             // Asignar rango aleatorio
            String[] rangos = {"HIERRO", "BRONCE", "PLATA", "ORO", "PLATINO", 
                            "DIAMANTE", "ASCENDENTE", "INMORTAL", "RADIANTE"};
            this.rango = rangos[new java.util.Random().nextInt(rangos.length)];
        }
        if (this.role == null) {
            this.role = Role.USER;
        }
    }

    @OneToMany(mappedBy = "creador",cascade= CascadeType.ALL)
    List<Partida> partidas; // Relación con la entidad Partida, un usuario tiene varias partidas a su nombre

    // Constructor, getters y setters pueden ser generados por Lombok
    // o puedes definirlos manualmente si lo prefieres.

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Example implementation, adjust as needed
        return List.of(new SimpleGrantedAuthority("ROLE_" + (role != null ? role.name() : "USER")));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Adjust logic as needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Adjust logic as needed
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Adjust logic as needed
    }

    @Override
    public boolean isEnabled() {
        return true; // Adjust logic as needed
    }
}
