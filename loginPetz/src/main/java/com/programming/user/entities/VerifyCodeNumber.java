package com.programming.user.entities;

public class VerifyCodeNumber {

    private Integer codeUser;


    public Integer getCode() {
        return codeUser;
    }

    public void setCode(Integer codeUser) {
        this.codeUser = codeUser;
    }

    public VerifyCodeNumber(){}

    public VerifyCodeNumber(Integer codeUser){
        this.codeUser = codeUser;
    }
}
