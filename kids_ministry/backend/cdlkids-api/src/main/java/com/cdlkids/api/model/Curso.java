package com.cdlkids.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cursos")
@Data
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cur_id")
    private Long curId;
    @Column(name = "cur_nombre")
    private String curNombre;
}
