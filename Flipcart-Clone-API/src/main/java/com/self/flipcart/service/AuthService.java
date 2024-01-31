package com.self.flipcart.service;

import com.self.flipcart.requestdto.AuthRequest;
import com.self.flipcart.dto.OtpModel;
import com.self.flipcart.requestdto.UserRequest;
import com.self.flipcart.responsedto.AuthResponse;
import com.self.flipcart.responsedto.UserResponse;
import com.self.flipcart.util.ResponseStructure;
import org.springframework.http.ResponseEntity;

import java.util.concurrent.ExecutionException;

public interface AuthService {
    ResponseEntity<ResponseStructure<String>> registerUser(UserRequest userRequest) throws ExecutionException, InterruptedException;

    ResponseEntity<ResponseStructure<UserResponse>> verifyUserEmail(OtpModel otpModel);

    ResponseEntity<ResponseStructure<AuthResponse>> login(AuthRequest authRequest);

}