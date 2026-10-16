package com.cdlkids.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "asistencias")
public class Asistencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asi_id")
    private Long asiId;

    @Column(name = "ni_id")
    private Long niId;

    private Boolean presente;

    @Column(name = "trajo_biblia")
    private Boolean trajoBiblia;
}