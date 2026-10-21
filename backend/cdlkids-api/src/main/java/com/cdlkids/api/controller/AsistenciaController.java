package com.cdlkids.api.controller;

import com.cdlkids.api.model.Curso;
import com.cdlkids.api.model.Maestro;
import com.cdlkids.api.model.Nino;
import com.cdlkids.api.model.RegistroClase;
import com.cdlkids.api.repository.CursoRepository;
import com.cdlkids.api.repository.MaestroRepository;
import com.cdlkids.api.repository.NinoRepository;
import com.cdlkids.api.repository.RegistroClaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AsistenciaController {

    @Autowired
    private CursoRepository cursoRepository;
    @Autowired
    private MaestroRepository maestroRepository;
    @Autowired
    private NinoRepository ninoRepository;
    @Autowired
    private RegistroClaseRepository registroClaseRepository;

    //1. Lista los cursos para página principal
    @GetMapping("/cursos")
    public List<Curso> obtenerCursos() {
        return cursoRepository.findAll();
    }

    //2. Listas maestros para dropbox
    @GetMapping("/maestros")
    public List<Maestro> obtenerMaestros() {
        return maestroRepository.findAll();
    }

    //3. Listar los niños de un curso específico (al hacer click en un curso)
    @GetMapping("/curso/{curId}/ninos")
        public List<Nino> obtenerNinoPorCurso(@PathVariable Long curId){
        return ninoRepository.findByCurId(curId);
    }

    //*****Registro de asistencias*****
    @PostMapping("/asistencias")
    public ResponseEntity<RegistroClase> guardarAsistencia(@RequestBody RegistroClase registroClase) {
        try {
            RegistroClase nuevoRegistro = registroClaseRepository.save(registroClase);
            return ResponseEntity.ok(nuevoRegistro);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Endpoint GET para listar todas las clases registradas con sus asistencias
    @GetMapping("/asistencias")
    public ResponseEntity<List<RegistroClase>> obtenerTodasLasAsistencias() {
        try {
            // Usamos .findAll() directamente del repositorio
            List<RegistroClase> registros = registroClaseRepository.findAll();
            return ResponseEntity.ok(registros);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
