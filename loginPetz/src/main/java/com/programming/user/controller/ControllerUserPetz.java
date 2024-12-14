package com.programming.user.controller;

import com.programming.user.entities.*;
import com.programming.user.service.UserServicePetz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("api/userPet/")
public class ControllerUserPetz {

    @Autowired
    private UserServicePetz userServicePetz;

    @PostMapping("enviarEmail")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> email) { // Chave e valor do postman
        String userEmail = email.get("userEmail"); // Nome do corpo da requisição que definimos.
        userServicePetz.enviarEmail(userEmail);
        return ResponseEntity.accepted().body("E-mail está sendo processado...");
    }

    @PostMapping("verifyCode")
    public ResponseEntity<String> verifyCode(@RequestBody VerifyCodeNumber number) {
        Boolean code = userServicePetz.verifyNumber(number.getCode()); // Verifica se é o mesmo código enviado no e-mail.
        if (code){
            return ResponseEntity.ok("Carregando....");
        }
        return ResponseEntity.ok("Código errado");
    }

    // change password
    @PostMapping("changePassword")
    public ResponseEntity<?> changePasswordUser(@RequestBody UserPetz newPassword){
        boolean objUpdate = userServicePetz.changePassword(newPassword);
        if (objUpdate){
            return ResponseEntity.ok("Senha alterada"); // Precisa ser true
        }
        return ResponseEntity.ok("Senha não alterada.");
    }
    // Create user.
    // If you want to show user your response from createUser, you should change <?> to UserPetz.
    @PostMapping("createUser")
    public ResponseEntity<?> creatUser(@RequestBody UserPetz obj) {
        try{
            UserPetz objUser = userServicePetz.creatUser(obj);
            return ResponseEntity.ok().body(objUser);
        }  catch (DataIntegrityViolationException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User's CPF: Already exist.\nUser's E-mail: Already Exist.\n  ");
        }
    }

    // Verify if is the user
    @PostMapping("loginUser")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserRequest obj){
        boolean requestBoolean;
        requestBoolean = userServicePetz.authRequest(obj.getUserCPF(), obj.getUserPassword());
        if (requestBoolean){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(true);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    // Read all Users - TESTE
    @GetMapping("readAllUser")
    public ResponseEntity<List<UserPetzDTO>> readAll(){
        List<UserPetzDTO> obj = userServicePetz.readAllUser();
        return ResponseEntity.ok().body(obj);
    }


}
