package com.mugiranezaj.Authentication;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.mugiranezaj.User.Pharmacist;

@WebServlet("/medecines")
public class Medecines extends HttpServlet {
    JSONObject json, jsonResponse;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        jsonResponse = new JSONObject();
        response.setContentType("application/json");
        String requestBody = request.getReader().lines().collect(Collectors.joining());
        json = new JSONObject(requestBody);
        // String userType = json.optString("userType", "");
        String medName = json.optString("medName", "");
        double medPrice = json.optDouble("medPrice", 0);
        String medExpiration = json.optString("medExpiration", "");

        Pharmacist pharmacist = new Pharmacist();
        try {
            pharmacist.uploadMedicine(medName, medPrice, medExpiration);
            response.setStatus(200);
            jsonResponse.put("status", 200);
            jsonResponse.put("message", "medecines added successfully");
        } catch (Exception e) {
            response.setStatus(500);
            jsonResponse.put("status", 500);
            jsonResponse.put("message", "an error accured while uploading medecines, please try again later");
        }

        response.getWriter().write(jsonResponse.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("CWD: " + System.getProperty("user.dir"));
        jsonResponse = new JSONObject();
        File file = new File("medecines.csv");
        if (!file.exists()) {
            response.setContentType("application/json");
            jsonResponse.put("message", "No data!");
            response.getWriter().write(jsonResponse.toString());
        } else {

            FileReader fileReader = new FileReader("medecines.csv");
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                stringBuilder.append(line);
                stringBuilder.append("\n");
            }
            bufferedReader.close();
            String fileContent = stringBuilder.toString();

            response.setContentType("text/csv");
            response.setHeader("Content-Disposition", "attachment;filename=medicines.csv");
            ServletOutputStream outputStream = response.getOutputStream();
            outputStream.print(fileContent);
            outputStream.flush();
            outputStream.close();
        }
    }

}
