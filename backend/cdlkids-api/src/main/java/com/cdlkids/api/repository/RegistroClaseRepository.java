package com.cdlkids.api.repository;

import com.cdlkids.api.model.Asistencia;
import com.cdlkids.api.model.RegistroClase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistroClaseRepository extends JpaRepository<RegistroClase, Long> {
    //List<RegistroClase> findAllByOrderByFechaDesc(Asistencia asistencia);
}