package com.mugiranezaj.Validation;

import java.util.ArrayList;
import java.util.List;

import com.mugiranezaj.Models.UserModel;

public class UserValidation {
    List<String> errors;

    public List<String> validateSignup(UserModel userModel) {
        errors = new ArrayList<String>();
        if (userModel.name == null || userModel.name.equals("")) {
            errors.add("Name is required");
        }
        if (userModel.password == null || userModel.password.equals("")) {
            errors.add("Password is required");
        }
        if (userModel.age == 0) {
            errors.add("Age is required");
        }
        if (userModel.gender == null || userModel.gender.equals("")) {
            errors.add("Gender is required");
        }
        return errors;
    }
}