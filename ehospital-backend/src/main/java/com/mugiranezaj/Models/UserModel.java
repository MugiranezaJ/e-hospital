package com.mugiranezaj.Models;

public class UserModel {
    public String id;
    public String name;
    public String username;
    public String password;
    public String gender;
    public int age;
    public String role;

    public UserModel(
            String id,
            String name,
            String username,
            String password,
            String gender,
            int age,
            String role) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.age = age;
        this.role = role;
    }

    @Override
    public String toString() {
        return "{" +
                "id:'" + id + '\'' +
                ", name:'" + name + '\'' +
                ", username:'" + username + '\'' +
                ", password:'" + password + '\'' +
                ", gender:'" + gender + '\'' +
                ", age:" + age +
                ", role:'" + role + '\'' +
                '}';
    }
}