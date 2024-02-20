package sena.prueba.services;

import com.warrenstrange.googleauth.ICredentialRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;








@Component
public class CredentialRepository  implements ICredentialRepository {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    class UserTOTP {
        private String username;
        private String secretKey;
        private int validationCode;
        private List<Integer> scratchCodes;
    }

    private  final Map<String, UserTOTP> userKeys = new HashMap<String,UserTOTP>();


    public String getSecretKey(String username) {
        return userKeys.get(username).getSecretKey();
    }

    public UserTOTP getUser(String username){
        return userKeys.get(username);
    }

    public void saveUserCredentials(String userName, String secretKey, int validationCode, List<Integer> scratchCodes) {
    userKeys.put(userName , new UserTOTP(userName,secretKey,validationCode,scratchCodes));

    }



}
