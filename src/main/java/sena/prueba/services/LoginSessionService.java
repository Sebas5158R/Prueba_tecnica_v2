package sena.prueba.services;

import sena.prueba.models.User;

public interface LoginSessionService {
    void registerLoginSession(User userId, String ipAddress, String location, String city);

    void deleteLoginSession(int sessionId);
}
