package com.mugiranezaj.User;

import org.json.JSONObject;

public abstract class User {
    protected String id;
    protected String name;
    protected int age;
    protected String gender;
    protected String password;
    protected String role;

    public abstract JSONObject register();

    public abstract JSONObject login();


    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    public String getName() {
        return this.name;
    }

    public int getAge() {
        return this.age;
    }

    public String getGender() {
        return this.gender;
    }
}
