package com.programming.user.entities;

public class UserPetzDTO {

    private Long idUser;
    private String userName;
    private String userEmail;
    private Long userNumber;
    private String userPassword;

    public UserPetzDTO(){}

    public UserPetzDTO(
            Long idUser,
            String userName,
            String userEmail,
            Long userNumber,
            String userPassword) {
        this.idUser = idUser;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userNumber = userNumber;
        this.userPassword = userPassword;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public Long getUserNumber() {
        return userNumber;
    }

    public void setUserNumber(Long userNumber) {
        this.userNumber = userNumber;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
