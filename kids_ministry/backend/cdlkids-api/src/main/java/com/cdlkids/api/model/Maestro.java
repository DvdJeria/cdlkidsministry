package com.cdlkids.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "maestros")
@Data
public class Maestro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_id")
    private Long maId;
    @Column(name = "ma_nombre")
    private String maNombre;
    @Column(name = "ma_apellido")
    private String maApellido;

}
