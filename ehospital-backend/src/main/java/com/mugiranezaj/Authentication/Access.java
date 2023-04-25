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

@WebServlet("/access/grant")
public class Access extends HttpServlet {
    JSONObject json, jsonResponse;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        jsonResponse = new JSONObject();
        response.setContentType("application/json");
        String requestBody = request.getReader().lines().collect(Collectors.joining());
        json = new JSONObject(requestBody);
        String userType = json.optString("userType", "");
        String user = json.optString("user", "");

        // Patient patient = new Patient();
        Physician physician = new Physician();
        Pharmacist pharmacist = new Pharmacist();

        if (userType.equals("physician")) {
            if (physician.getAccess(user)) {
                response.setStatus(200);
                jsonResponse.put("status", 200);
                jsonResponse.put("message", "access granted");
            } else {
                response.setStatus(404);
                jsonResponse.put("status", 404);
                jsonResponse.put("message", "user does not exist");
            }
        } else if (userType.equals("pharmacist")) {
            if (pharmacist.getAccess(user)) {
                response.setStatus(200);
                jsonResponse.put("status", 200);
                jsonResponse.put("message", "access granted");
            } else {
                response.setStatus(404);
                jsonResponse.put("status", 404);
                jsonResponse.put("message", "user does not exist");
            }
        } else {
            jsonResponse.put("message", "invalid user type");
        }
        // System.out.println(physician.getPatients());

        response.getWriter().write(jsonResponse.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        jsonResponse = new JSONObject();
        response.setContentType("application/json");
        // String requestBody =
        // request.getReader().lines().collect(Collectors.joining());
        // json = new JSONObject(requestBody);
        String userType = request.getParameter("userType");
        System.out.println("usertype: " + userType);
        // String user = json.optString("user", "");

        // Patient patient = new Patient();
        Physician physician = new Physician();
        Pharmacist pharmacist = new Pharmacist();

        if (userType.equals("physician")) {
            response.setStatus(200);
            jsonResponse.put("status", 200);
            jsonResponse.put("data", physician.getPatients());
            // jsonResponse.put("data", patient.getPhysiciansWithAccess());
        } else if (userType.equals("pharmacist")) {
            response.setStatus(200);
            jsonResponse.put("status", 200);
            jsonResponse.put("data", pharmacist.getPatients());
        } else {
            jsonResponse.put("message", "Invalid choice");
        }
        System.out.println(physician.getPatients());

        response.getWriter().write(jsonResponse.toString());
    }
}
