package com.mugiranezaj.Authentication;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

import com.mugiranezaj.Data.DataStore;
import com.mugiranezaj.Models.UserModel;
import com.mugiranezaj.User.Patient;
import com.mugiranezaj.User.Pharmacist;
import com.mugiranezaj.User.Physician;
import com.mugiranezaj.User.User;
import com.mugiranezaj.Validation.UserValidation;

@WebServlet("/register")
public class Register extends HttpServlet {
    JSONObject jsonResponse;
    JSONObject userData;
    UserModel userModel;
    User user;

    enum Gender {
        Male,
        Female
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        JSONObject jsonObject = new JSONObject();
        response.setContentType("application/json");
        response.setStatus(404);
        jsonObject.put("status", 404);
        jsonObject.put("message", "You can only POST on this route");
        response.getWriter().write(jsonObject.toString());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        try {
            jsonResponse = new JSONObject();
            String requestBody = request.getReader().lines().collect(Collectors.joining());
            JSONObject json = new JSONObject(requestBody);
            String name = json.optString("name", "");
            String username = json.optString("username", "");
            String password = json.optString("password", "");
            String gender = json.optString("gender", "");
            String email = json.optString("email", "");
            String phone = json.optString("phone", "");
            int age = json.optInt("age", 0);
            String role = json.optString("role", "");
            String id = UUID.randomUUID().toString();
            UserValidation validation = new UserValidation();

            UserModel userModel = new UserModel(
                    id,
                    name,
                    username,
                    password,
                    gender,
                    age,
                    role);

            List<String> errors = validation.validateSignup(userModel);
            if (!errors.isEmpty()) {
                response.setStatus(404);
                jsonResponse.put("status", 404);
                jsonResponse.put("message", "validation error");
                jsonResponse.put("errors", errors);
            } else {
                switch (userModel.role.toLowerCase()) {

                    case "pharmacist":
                        user = new Pharmacist(id, phone, password, name, age, gender);
                        jsonResponse = user.register();
                        break;
                    case "patient":
                        user = new Patient(id, username, password, name, age, gender);
                        jsonResponse = user.register();
                        break;
                    case "physician":
                        user = new Physician(id, email, password, name, age, gender);
                        jsonResponse = user.register();
                        break;
                    default:
                        System.out.println("default");
                        jsonResponse.put("status", 400);
                        jsonResponse.put("message", "Invalid role");
                }
            }

            // Return JSON response
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            System.out.println(e);
            jsonResponse = new JSONObject();
            jsonResponse.put("status", 500);
            jsonResponse.put("error", "an error ocurred, please try again later");
            // jsonResponse.put("stack", e);
            response.setStatus(500);
            response.getWriter().write(jsonResponse.toString());
        }
    }

    public Boolean userExists(String username) {
        if (DataStore.getUser(username) != null)
            return true;
        return false;
    }
}
