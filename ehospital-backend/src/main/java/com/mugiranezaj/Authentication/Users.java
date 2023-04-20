package com.mugiranezaj.Authentication;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.mugiranezaj.User.Patient;
import com.mugiranezaj.User.Pharmacist;
import com.mugiranezaj.User.Physician;
import com.mugiranezaj.User.User;

@WebServlet("/users")
public class Users extends HttpServlet {
    JSONObject json, jsonResponse;
    User user;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        jsonResponse = new JSONObject();
        response.setContentType("application/json");
        String requestBody = request.getReader().lines().collect(Collectors.joining());
        json = new JSONObject(requestBody);
        String userType = json.optString("userType", "");

        switch (userType) {
            case "pharmacist":
                Pharmacist pharmacist = new Pharmacist();
                jsonResponse.put("data", pharmacist.getAllPharmacist());
                break;
            case "patient":
                Patient patient = new Patient();
                System.out.println("OBJEct ::: " + patient.getAllPatient());
                jsonResponse.put("status", 200);
                jsonResponse.put("data", patient.getAllPatient());
                break;
            case "physician":
                Physician physician = new Physician();
                jsonResponse.put("data", physician.getAllPhysicians());
                break;
            default:
                System.out.println("default");
                jsonResponse.put("status", 400);
                jsonResponse.put("message", "Invalid role");
        }

        response.getWriter().write(jsonResponse.toString());
    }

}
