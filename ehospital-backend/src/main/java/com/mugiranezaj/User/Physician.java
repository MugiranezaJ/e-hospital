package com.mugiranezaj.User;

import java.util.LinkedHashMap;
import java.util.Map;

import org.json.JSONObject;

public class Physician extends User {
    private String email;
    JSONObject response;

    public Physician(String id, String email, String password, String name, int age, String gender) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public Physician(String email, String password) {
        this.email = email;
        this.password = password;
    }

    private static Map<String, Physician> physicianMap = new LinkedHashMap<>();

    @Override
    public JSONObject register() {
        response = new JSONObject();

        if (email.isEmpty()) {
            response.put("status", 400);
            response.put("message", "email is required");
            return response;
        }

        if (this.password.length() < 7 || this.password.length() > 8) {
            response.put("status", 400);
            response.put("message", "password must be between 4 and 6 characters");
            return response;
        }

        // save the user
        physicianMap.put(this.email, new Physician(id, email, password, name, age, gender));

        // return response
        response.put("status", 200);
        response.put("message", "physician created successfully");
        response.put("data", "{}");
        return response;

    }

    @Override
    public JSONObject login() {
        response = new JSONObject();
        if (this.email.isEmpty()) {
            response.put("status", 400);
            response.put("message", "Email is required");
            return response;
        }
        if (physicianMap.containsKey(this.email)) {
            Physician physician = physicianMap.get(this.email);
            if (!physician.password.equals(this.password)) {
                response.put("status", 400);
                response.put("message", "phone or password is invalid");
                return response;
            }

            response.put("message", "logged in successfully");
            response.put("status", 200);
            response.put("data", new JSONObject(physician.toString()));
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
                ", username:'" + email + '\'' +
                ", gender:'" + gender + '\'' +
                ", age:" + age +
                ", role:'" + role + '\'' +
                '}';
    }

}
