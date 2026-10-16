package com.cdlkids.api.controller;

import com.cdlkids.api.model.Curso;
import com.cdlkids.api.model.Maestro;
import com.cdlkids.api.model.Nino;
import com.cdlkids.api.repository.CursoRepository;
import com.cdlkids.api.repository.MaestroRepository;
import com.cdlkids.api.repository.NinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AsistenciaController {

    @Autowired
    private CursoRepository cursoRepository;
    @Autowired
    private MaestroRepository maestroRepository;
    @Autowired
    private NinoRepository ninoRepository;

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
}
