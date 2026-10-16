package com.cdlkids.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ninos")
@Data
public class Nino {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ni_id")
    private Long niId;
    @Column(name = "ni_nombre")
    private String niNombre;
    @Column(name = "ni_apellido")
    private String niApellido;
    @Column(name = "cur_id")
    private Long curId;

}
