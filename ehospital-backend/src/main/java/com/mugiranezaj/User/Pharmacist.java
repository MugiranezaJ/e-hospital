package com.mugiranezaj.User;

import java.util.LinkedHashMap;
import java.util.Map;

import org.json.JSONObject;

public class Pharmacist extends User {
    private String phone;
    JSONObject response;

    public Pharmacist(String id, String phone, String password, String name, int age, String gender) {
        this.id = id;
        this.phone = phone;
        this.password = password;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public Pharmacist(String phone, String password) {
        this.phone = phone;
        this.password = password;
    }

    private static Map<String, Pharmacist> pharmacistMap = new LinkedHashMap<>();

    @Override
    public JSONObject register() {
        response = new JSONObject();

        if (phone.isEmpty()) {
            response.put("status", 400);
            response.put("message", "phone is required");
            return response;
        }

        if (this.password.length() < 9 || this.password.length() > 10) {
            response.put("status", 400);
            response.put("message", "password must be between 9 and 10 characters");
            return response;
        }
        if (pharmacistMap.containsKey(this.phone)) {
            response.put("status", 400);
            response.put("message", "User with this phone already exists");
            return response;
        }

        // save the user
        pharmacistMap.put(this.phone, new Pharmacist(id, phone, password, name, age, gender));

        // return response
        response.put("status", 200);
        response.put("message", "pharmacist created successfully");
        response.put("data", "{}");
        return response;

    }

    @Override
    public JSONObject login() {
        response = new JSONObject();
        if (this.phone.isEmpty()) {
            response.put("status", 400);
            response.put("message", "phone is required");
            return response;
        }
        if (pharmacistMap.containsKey(this.phone)) {
            Pharmacist pharmacist = pharmacistMap.get(this.phone);
            if (!pharmacist.password.equals(this.password)) {
                response.put("status", 400);
                response.put("message", "phone or password is invalid");
                return response;
            }

            response.put("message", "logged in successfully");
            response.put("status", 200);
            response.put("data", new JSONObject(pharmacist.toString()));
            return response;
        }
        response.put("status", 400);
        response.put("message", "Pharmacist doesn't exist");
        return response;
    }

    @Override
    public String toString() {
        return "{" +
                "id:'" + id + '\'' +
                ", name:'" + name + '\'' +
                ", phone:'" + phone + '\'' +
                ", gender:'" + gender + '\'' +
                ", age:" + age +
                ", role:'" + role + '\'' +
                '}';
    }

}
