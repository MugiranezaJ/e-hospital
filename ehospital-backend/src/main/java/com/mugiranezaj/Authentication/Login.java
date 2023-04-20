package com.mugiranezaj.Authentication;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.mugiranezaj.User.Patient;
import com.mugiranezaj.User.Pharmacist;
import com.mugiranezaj.User.Physician;
import com.mugiranezaj.User.User;

import javax.servlet.annotation.WebServlet;

@WebServlet("/login")
public class Login extends HttpServlet {

    User user;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.getWriter().write("Mwiriwe ariko!");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        JSONObject jsonResponse = new JSONObject();
        resp.setContentType("application/json");
        String requestBody = req.getReader().lines().collect(Collectors.joining());
        JSONObject json = new JSONObject(requestBody);
        String role = json.optString("role", "");
        String username = json.optString("username", "");
        String phone = json.optString("phone", "");
        String email = json.optString("email", "");
        String password = json.optString("password", "");

        switch (role) {
            case "pharmacist":
                user = new Pharmacist(phone, password);
                jsonResponse = user.login();
                break;
            case "patient":
                user = new Patient(username, password);
                jsonResponse = user.login();
                break;
            case "physician":
                user = new Physician(email, password);
                jsonResponse = user.login();
                break;
            default:
                System.out.println("default");
                jsonResponse.put("status", 400);
                jsonResponse.put("message", "Invalid role");
        }

        resp.getWriter().write(jsonResponse.toString());
    }
}
