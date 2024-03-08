package sena.prueba.models;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class Validation {

    private boolean isValid;
    private String errorMessage;

    // Constructor para caso de éxito
    public Validation(boolean isValid) {
        this.isValid = isValid;
    }


    public Validation(boolean isValid, String errorMessage) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }

    // Getters y setters, si es necesario
}