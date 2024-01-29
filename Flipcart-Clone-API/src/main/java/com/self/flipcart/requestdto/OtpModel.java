package com.self.flipcart.requestdto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OtpModel {
    private String userId;
    private int otp;
}
