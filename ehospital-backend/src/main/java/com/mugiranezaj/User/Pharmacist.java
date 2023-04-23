package com.mugiranezaj.User;

import java.util.LinkedHashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Pharmacist extends User {
    private String phone;
    JSONObject response;

    public String getPhone() {
        return this.phone;
    }

    public Pharmacist(String id, String phone, String password, String name, int age, String gender, String role) {
        this.id = id;
        this.phone = phone;
        this.password = password;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.role = "pharmacist";
    }

    public Pharmacist(String phone, String password) {
        this.phone = phone;
        this.password = password;
    }

    public Pharmacist() {
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
        pharmacistMap.put(this.phone, new Pharmacist(id, phone, password, name, age, gender, role));

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

    public JSONArray getAllPharmacist() {
        JSONArray jsonArray = new JSONArray();
        for (Pharmacist pharmacist : pharmacistMap.values()) {
            JSONObject patientJson = new JSONObject();
            patientJson.put("name", pharmacist.getName());
            patientJson.put("phone", pharmacist.getPhone());
            patientJson.put("gender", pharmacist.getGender());
            patientJson.put("age", pharmacist.getAge());
            jsonArray.put(patientJson);
        }
        return jsonArray;
    }

    public void uploadMedicine(String medName, double medPrice, String medExpiration) throws IOException {
        File file = new File("medecines.csv");
        boolean fileExists = file.exists();

        FileWriter fileWriter = new FileWriter(file, true); // true to append to existing file, false to overwrite

        if (!fileExists) {
            fileWriter.append("med-name,med-price,med-expiration\n"); // add header row if file doesn't exist
        }

        fileWriter.append(String.format("%s,%.2f,%s\n", medName, medPrice, medExpiration)); // append new row

        fileWriter.close();
    }

}
