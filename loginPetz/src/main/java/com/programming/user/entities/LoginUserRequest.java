package com.programming.user.entities;

public class LoginUserRequest {

    private String userCPF;
    private String userPassword;

    public LoginUserRequest(){
    }

    public LoginUserRequest(String userCPF, String userPassword){
        this.userCPF = userCPF;
        this.userPassword = userPassword;
    }

    public String getUserCPF() {
        return userCPF;
    }

    public void setUserCPF(String userCPF) {
        this.userCPF = userCPF;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
}
