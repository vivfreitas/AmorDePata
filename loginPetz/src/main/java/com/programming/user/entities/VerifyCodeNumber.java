package com.programming.user.entities;

public class VerifyCodeNumber {

    private Integer code;


    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public VerifyCodeNumber(){}

    public VerifyCodeNumber(Integer code){
        this.code = code;
    }
}
