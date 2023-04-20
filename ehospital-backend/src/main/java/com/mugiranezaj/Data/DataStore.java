package com.mugiranezaj.Data;

import java.util.LinkedHashMap;
import java.util.Map;

import com.mugiranezaj.Models.UserModel;
// import com.mugiranezaj.User.User;

public class DataStore {
    private static Map<String, UserModel> userStore = new LinkedHashMap<>();

    public static void addUser(UserModel user) {
        userStore.put(user.username, user);
    }

    public static UserModel getUser(String username) {
        return userStore.get(username);
    }

    public static Map<String, UserModel> getUserStore() {
        return userStore;
    }
}
