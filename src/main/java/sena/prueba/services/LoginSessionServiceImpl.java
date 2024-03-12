package sena.prueba.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sena.prueba.models.LoginSession;
import sena.prueba.models.User;
import sena.prueba.repository.LoginSessionRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class LoginSessionServiceImpl implements LoginSessionService{

    @Autowired
    private LoginSessionRepository loginSessionRepository;
    @Override
    public void registerLoginSession(User userId, String ipAddress, String location, String city, Integer sessionId) {
        LoginSession loginSession = new LoginSession();
        loginSession.setUserId(userId);
        loginSession.setIpAddress(ipAddress);
        loginSession.setCountry(location);
        loginSession.setCity(city);
        loginSession.setLoginTime(LocalDateTime.now());
        loginSession.setSessionId(sessionId);
        loginSessionRepository.save(loginSession);
    }

    @Override
    public void deleteLoginSession(Integer sessionId) {
        LoginSession optionalLoginSession = loginSessionRepository.findLoginSessionBySessionId(sessionId);
        loginSessionRepository.delete(optionalLoginSession);
    }
}
