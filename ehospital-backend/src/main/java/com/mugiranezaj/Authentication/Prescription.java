package com.mugiranezaj.Authentication;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.mugiranezaj.User.Patient;

@WebServlet("/prescriptions")
public class Prescription extends HttpServlet {
    JSONObject json, jsonResponse;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        jsonResponse = new JSONObject();
        response.setContentType("application/json");
        String requestBody = request.getReader().lines().collect(Collectors.joining());
        json = new JSONObject(requestBody);
        String doctor = json.optString("doctor", "");
        String patientId = json.optString("patientId", "");
        String prescriptions = json.optString("prescriptions", "");

        if (!Patient.physiciansWithAccess.containsKey(doctor)) {
            response.setStatus(401);
            jsonResponse.put("message", "Un Authorized");
            response.getWriter().write(jsonResponse.toString());
        } else {

            if (Patient.patientDiseases.containsKey(patientId)) {
                Patient.patientDiseases.get(patientId).add(prescriptions);
            } else {
                List<String> diseases = new ArrayList<>();
                diseases.add(prescriptions);
                Patient.patientDiseases.put(patientId, diseases);
            }

            jsonResponse.put("message", "Prescriptions added successfully");
            jsonResponse.put("data", Patient.patientDiseases.get(patientId));

            response.getWriter().write(jsonResponse.toString());
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        jsonResponse = new JSONObject();
        response.setContentType("application/json");
        String requestBody = request.getReader().lines().collect(Collectors.joining());
        json = new JSONObject(requestBody);
        String patientId = json.optString("patientId", "");

        jsonResponse.put("status", 200);
        // jsonResponse.put("message", "Prescriptions added successfully");
        jsonResponse.put("data", Patient.patientDiseases.get(patientId));

        response.getWriter().write(jsonResponse.toString());
    }

}
