package com.cdlkids.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Entity
@Table(name = "registros_clase")
public class RegistroClase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reg_id")
    private Long regId;

    @Column(name = "cur_id")
    private Long curId;

    @Column(name = "ma_id")
    private Long maId;

    private LocalDate fecha;

    @Column(name = "observacion_general")
    @JsonProperty("observacion_general")
    private String observacion_general;

    // Relación para guardar las asistencias de los niños junto con el registro del día
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "reg_id")
    private List<Asistencia> asistencias;
}