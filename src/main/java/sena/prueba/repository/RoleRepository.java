package sena.prueba.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sena.prueba.models.Role;
@Repository
public interface RoleRepository  extends CrudRepository<Role,Integer> {
}
