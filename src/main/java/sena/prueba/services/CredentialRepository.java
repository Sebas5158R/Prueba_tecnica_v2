package sena.prueba.repository;

import org.springframework.stereotype.Component;
import sena.prueba.models.User;
import sena.prueba.models.UserTOTP;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CredentialRepository  implements   IcrendentialRepository{


    private  final Map<String, UserTOTP> userKeys = new HashMap<String,UserTOTP>();

    @Override
    public String getSecretKey(String username) {
        return userKeys.get(username).getSecretKey();
    }

    @Override
    public void saveUserCredentials(String userName, String secretKey, int validationCode, List<Integer> scratchCodes) {
    userKeys.put(userName , new UserTOTP(userName,secretKey,validationCode,scratchCodes));

    }

    public UserTOTP getUser(String username){
         return userKeys.get(username);
    }

}
