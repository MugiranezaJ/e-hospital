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
        // String userType = json.optString("userType", "");
        String user = json.optString("user", "");

        Patient patient = new Patient();
        if (patient.grantAccess(user)) {
            response.setStatus(200);
            jsonResponse.put("status", 200);
            jsonResponse.put("message", "access granted");
        } else {
            response.setStatus(404);
            jsonResponse.put("status", 404);
            jsonResponse.put("message", "user does not exist");
        }
        System.out.println(patient.getUsersWithAccess());

        response.getWriter().write(jsonResponse.toString());
    }
}