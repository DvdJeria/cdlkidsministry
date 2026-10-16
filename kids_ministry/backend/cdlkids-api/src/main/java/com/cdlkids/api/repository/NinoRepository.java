package com.cdlkids.api.repository;

import com.cdlkids.api.model.Nino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NinoRepository extends JpaRepository<Nino, Long> {
    //@Query("SELECT n FROM Nino n WHERE n.curId = :curId")
    List<Nino> findByCurId(@Param("cur_id") Long cur_id);
}
