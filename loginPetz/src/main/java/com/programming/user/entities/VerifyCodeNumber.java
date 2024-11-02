package com.programming.user.entities;

public class VerifyCodeNumber {
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    private Integer code;

    public VerifyCodeNumber(){}

    public VerifyCodeNumber(Integer code){
        this.code = code;
    }
}
