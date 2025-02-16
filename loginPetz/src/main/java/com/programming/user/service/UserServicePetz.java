package com.programming.user.service;
import com.programming.user.entities.UserPetz;
import com.programming.user.entities.UserPetzDTO;
import com.programming.user.repositories.UserPetzRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.sound.midi.SysexMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CompletableFuture;

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
        code = randomCode.nextInt(900000);
        if (code > 100000) {
            return code;
        }
        return 0;
    }

     // Send an e-mail - Envia o código de confirmação.
    // Faremos com que o E-mail trabalhe de forma assíncrona
    @Async
    public CompletableFuture<Boolean> enviarEmail(String userEmail){ // CompletableFuture -> Quando queremos ver o resultado, usamos ele. Caso ao contrário, será necessário o Void.
        String email = userEmail.trim();
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        List<UserPetz> userData = userPetzRepository.findAll();
        for (UserPetz obj: userData){
            if (obj.getUserEmail().equals(email)){ // Se for verdadeiro.
                generateRandomCode();
                mailMessage.setTo(email);
                mailMessage.setSubject("Pets - Verificação de segurança");
                mailMessage.setText("Código para redefinição de senha: " + code); /* gerador de número */
                try{
                    javaMailSender.send(mailMessage);
                    System.out.println("E-mail enviado com sucesso para: " + email);
                    return CompletableFuture.completedFuture(true);
                } catch (Exception e) {
                    System.err.println("Erro ao enviar e-mail: " + e.getMessage());
                    return CompletableFuture.completedFuture(false);
                }
            }
        }
        System.out.println("E-mail não encontrado na base de dados.");
        return CompletableFuture.completedFuture(false);
    } // -> alternativa para o completableFuture é o Spring WebFlux

    // Verifica se o e-mail existe na base de dados para mudar a senha -> Método auxiliar para o enviarEmail
    public Boolean checkEmailUser (String email) {
        List<UserPetz> dataUser = userPetzRepository.findAll();
        for (UserPetz obj: dataUser){
            if (obj.getUserEmail().equals(email)){
                return true;
            }
        }
        return false;
    }

    // Vai verificar se é o mesmo código. Se sim, segue para a troca de senha (Troca de página no front-end).
    public Boolean verifyNumber(Integer number){
        return code == number;
    }

    // Pegar o E-mail do usuário e usá-lo para modificar a senha.
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
