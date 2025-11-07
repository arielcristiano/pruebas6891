package com.api.e_commerce.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.e_commerce.dto.LoginRequest;
import com.api.e_commerce.model.Role;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.repository.UsuarioRepository;
import com.api.e_commerce.security.JwtUtil;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    // Public endpoint (no requiere autenticación)
    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint() {
        return ResponseEntity.ok("This is a public endpoint.");
    }

    // Login endpoint (devuelve un JWT real)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginUser) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginUser.getEmail());
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Verificar la contraseña encriptada
            if (passwordEncoder.matches(loginUser.getPassword(), usuario.getPassword())) {
                String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRole());
                
                Map<String, Object> userMap = new HashMap<>();
                userMap.put("id", usuario.getId());
                userMap.put("nombre", usuario.getNombre());
                userMap.put("apellido", usuario.getApellido());
                userMap.put("email", usuario.getEmail());
                userMap.put("usuario", usuario.getUsuario());
                userMap.put("telefono", usuario.getTelefono());
                userMap.put("role", usuario.getRole());
                userMap.put("rango", usuario.getRango()); // ✅ esto fuerza que se incluya

                return ResponseEntity.ok().body(Map.of(
                    "token", token,
                    "roles", usuario.getRole(),
                    "user", userMap // ✅ ahora sí incluye rango
                ));

                //return ResponseEntity.ok().body(java.util.Map.of(
                  //      "token", token,
                    //    "roles", usuario.getRole(),
                      //  "user", usuario
                //));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already exists");
        }
        
        // Encriptar la contraseña
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        
        // Asignar rol por defecto si no se especifica
        if (usuario.getRole() == null) {
            usuario.setRole(Role.USER);
        }
        
        
        // Guardar en la base de datos
        Usuario savedUsuario = usuarioRepository.save(usuario);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUsuario);
    }

    // Obtener todos los usuarios (solo para admin)
    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsers() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            List<Usuario> usuarios = usuarioRepository.findAll();
            return ResponseEntity.ok(usuarios);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    // Obtener usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUserById(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // User endpoint (requiere USER o ADMIN role)
    @GetMapping("/usuario")
    public ResponseEntity<String> userEndpoint() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
       
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> 
                a.getAuthority().equals("ROLE_USER") || a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.ok("Hello USER or ADMIN!");
        }
       
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: Requires USER or ADMIN role");
    }

    // Admin endpoint (requiere ADMIN role)
    @GetMapping("/admin")
    public ResponseEntity<String> adminEndpoint() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.ok("Hello ADMIN!");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: Requires ADMIN role");
    }

    // Update user (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUser(@PathVariable Long id, @RequestBody Usuario updatedUser) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // Actualizar campos
            if (updatedUser.getNombre() != null) {
                usuario.setNombre(updatedUser.getNombre());
            }
            if (updatedUser.getApellido() != null) {
                usuario.setApellido(updatedUser.getApellido());
            }
            if (updatedUser.getEmail() != null) {
                usuario.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getTelefono() != null) {
                usuario.setTelefono(updatedUser.getTelefono());
            }
            if (updatedUser.getUsuario() != null) {
                usuario.setUsuario(updatedUser.getUsuario());
            }
            if (updatedUser.getPassword() != null) {
                usuario.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            if (updatedUser.getRole() != null) {
                usuario.setRole(updatedUser.getRole());
            }
            
            Usuario savedUsuario = usuarioRepository.save(usuario);
            return ResponseEntity.ok(savedUsuario);
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Delete user (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}