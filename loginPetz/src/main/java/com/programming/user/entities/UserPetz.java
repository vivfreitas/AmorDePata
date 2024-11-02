package com.programming.user.entities;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tb_user_petz")
public class UserPetz implements Serializable {

    public static final long SerialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    private String userName;
    @Column(unique = true)
    private String userEmail;
    @Column(unique = true)
    private String userCPF;
    private Long userNumber;
    private String userPassword;

    public UserPetz(){}

    public UserPetzDTO convertUserToDTO(){
        return new UserPetzDTO(
                this.idUser,
                this.userName,
                this.userEmail,
                this.userNumber,
                this.userPassword);
    }

    public Long getIdUser() {
        return idUser;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserCPF() {
        return userCPF;
    }

    public Long getUserNumber() {
        return userNumber;
    }

    public void setUserNumber(Long userNumber) {
        this.userNumber = userNumber;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
}
