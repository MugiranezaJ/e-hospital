package com.mugiranezaj.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

public class Patient extends User {
    private String username;
    private String[] permitted;

    public String getUsername() {
        return this.username;
    }

    public String[] getPermitted() {
        return this.permitted;
    }

    public Patient(String id, String username, String password, String name, int age, String gender) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public Patient(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Patient() {
    }

    public static Map<String, Patient> patientMap = new LinkedHashMap<>();
    public static List<String> patientAccessManager = new ArrayList<>();
    public static Map<String, List<String>> patientDiseases = new HashMap<>();

    @Override
    public JSONObject register() {

        JSONObject response = new JSONObject();

        if (username.isEmpty()) {
            response.put("status", 400);
            response.put("message", "Username is required");
            return response;
        }

        if (this.password.length() < 4 || this.password.length() > 6) {
            response.put("status", 400);
            response.put("message", "password must be between 4 and 6 characters");
            return response;
        }

        if (patientMap.containsKey(this.username)) {
            response.put("status", 409);
            response.put("message", "Patient with this username already exists");
            return response;
        }

        // save the user
        patientMap.put(this.username, new Patient(id, username, password, name, age, gender));
        System.out.println("Users: " + patientMap);

        // return response
        response.put("status", 200);
        response.put("message", "Patient created successfully");
        response.put("data", "{}");
        return response;

    }

    @Override
    public JSONObject login() {
        JSONObject response = new JSONObject();

        if (this.username.isEmpty()) {
            response.put("status", 400);
            response.put("message", "username is required");
            return response;
        }
        if (patientMap.containsKey(this.username)) {
            Patient patient = patientMap.get(this.username);
            if (!patient.password.equals(this.password)) {
                response.put("status", 400);
                response.put("message", "username or password is invalid");
                return response;
            }

            response.put("message", "logged in successfully");
            response.put("status", 200);
            response.put("data", new JSONObject(patient.toString()));
            return response;
        }
        response.put("status", 400);
        response.put("message", "user doesn't exist");
        return response;

    }

    @Override
    public String toString() {
        return "{" +
                "id:'" + id + '\'' +
                ", name:'" + name + '\'' +
                ", username:'" + username + '\'' +
                ", gender:'" + gender + '\'' +
                ", age:" + age +
                ", role:'" + role + '\'' +
                '}';
    }

    public JSONArray getAllPatient() {
        JSONArray jsonArray = new JSONArray();
        for (Patient patient : patientMap.values()) {
            JSONObject patientJson = new JSONObject();
            patientJson.put("name", patient.getName());
            patientJson.put("username", patient.getUsername());
            patientJson.put("gender", patient.getGender());
            patientJson.put("age", patient.getAge());
            jsonArray.put(patientJson);
        }
        return jsonArray;
    }

    public boolean grantAccess(String user) {
        System.out.println(patientMap.toString() + Physician.physicianMap.toString());
        if (patientMap.containsKey(user) || Physician.physicianMap.containsKey(user))
            return patientAccessManager.add(user);
        return false;
    }

    public boolean hasAccess(String user) {
        return patientAccessManager.contains(user);
    }

    public List<String> getUsersWithAccess() {
        return patientAccessManager;
    }
}
