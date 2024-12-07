package com.programming.user.service;
import com.programming.user.entities.UserPetz;
import com.programming.user.entities.UserPetzDTO;
import com.programming.user.repositories.UserPetzRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.sound.midi.SysexMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class UserServicePetz {

   @Autowired
   private UserPetzRepository userPetzRepository;

   @Autowired
   private JavaMailSender javaMailSender;

   // Random number code
   private final Random randomCode = new Random();
   private int code;
    public int generateRandomCode(){
        code = randomCode.nextInt(6000);
        return code;
    }

   // Send an e-mail - Envia o código de confirmação.
    public Boolean enviarEmail(String userEmail){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        List<UserPetz> userData = userPetzRepository.findAll();
        for (UserPetz obj: userData){
            if (obj.getUserEmail().equals(userEmail)){ // Se for verdadeiro.
                generateRandomCode();
                mailMessage.setTo(userEmail);
                mailMessage.setSubject("Changed Password");
                mailMessage.setText("Código: " + code); /* gerador de número */
                javaMailSender.send(mailMessage);
                return true;
            }
        }
        return false;
    }

    // Vai verificar se é o mesmo código. Se sim, segue para a troca de senha (Troca de página no front-end).
    public Boolean verifyNumber(Integer number){
        return code == number;
    }

    // Pegar alguma informação do usuário e usá-lo para modificar a senha.
    public Boolean changePassword(UserPetz oldPassword){
        List<UserPetz> dataUser = userPetzRepository.findAll();
        for (UserPetz obj: dataUser){
            if (obj.getUserEmail().equals(oldPassword.getUserEmail())){ // Rastrear o e-mail desejado.
                System.out.println(oldPassword.getUserEmail());
                UserPetz newPassword = userPetzRepository.getReferenceById(obj.getIdUser()); // Vai pegar o ID referenciado
                dataUpdate(newPassword, oldPassword);
                userPetzRepository.save(newPassword);
                return true;
            }
        }
            return false;
    }

    private void dataUpdate(UserPetz newPassword, UserPetz oldPassword) {
        newPassword.setUserPassword(oldPassword.getUserPassword());
    }

    // Create User
   public UserPetz creatUser(UserPetz userPetz) {
        return userPetzRepository.save(userPetz);
   }

   // Request for User
    public Boolean authRequest(String userCPF, String userPassword){
        List<UserPetz> userData = userPetzRepository.findAll();
        for (UserPetz obj: userData){
            if (obj.getUserCPF().equals(userCPF) && obj.getUserPassword().equals(userPassword)){
                return true;
            }
        }
        return false;
    }

    // Read All with DTO
    public List<UserPetzDTO> readAllUser(){
        List<UserPetz> obj = userPetzRepository.findAll();
        List<UserPetzDTO> ObjDTO = new ArrayList<>();

        for (UserPetz objData: obj){
            UserPetzDTO dto = new UserPetzDTO(
                    objData.getIdUser(),
                    objData.getUserName(),
                    objData.getUserEmail(),
                    objData.getUserNumber(),
                    objData.getUserPassword());
             ObjDTO.add(dto);
        }
        return ObjDTO;
    }

}
