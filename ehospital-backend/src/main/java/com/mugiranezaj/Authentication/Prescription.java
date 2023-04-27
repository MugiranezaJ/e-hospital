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
import com.mugiranezaj.User.Physician;

@WebServlet("/diagnose")
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
        String disease = json.optString("disease", "");

        if (!Physician.myPatients.contains(patientId)) {
            response.setStatus(401);
            jsonResponse.put("message", "Unauthorized");
            response.getWriter().write(jsonResponse.toString());
        } else {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("doctor", doctor);
            jsonObject.put("disease", disease);
            if (Patient.patientMedecines.containsKey(patientId)) {
                Patient.patientMedecines.get(patientId).put("disease", disease);
            } else {
                List<String> diseases = new ArrayList<>();
                diseases.add(disease);

                Patient.patientMedecines.put(patientId, jsonObject);
            }
            jsonResponse.put("status", 200);
            jsonResponse.put("patient", patientId);
            jsonResponse.put("doctor", doctor);
            jsonResponse.put("disease", disease);
            jsonResponse.put("message", "added");

        }
        response.getWriter().write(jsonResponse.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        jsonResponse = new JSONObject();
        response.setContentType("application/json");
        String patientId = request.getParameter("patientId");

        jsonResponse.put("status", 200);
        jsonResponse.put("data", Patient.patientMedecines.get(patientId));

        response.getWriter().write(jsonResponse.toString());
    }

}
