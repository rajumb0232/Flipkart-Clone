package com.self.flipcart.service;

import com.self.flipcart.model.Store;
import com.self.flipcart.requestdto.StoreRequest;
import com.self.flipcart.requestdto.StoreRequestComplete;
import com.self.flipcart.responsedto.StoreResponse;
import com.self.flipcart.util.ResponseStructure;
import org.springframework.http.ResponseEntity;

public interface StoreService {
    ResponseEntity<ResponseStructure<Store>> setUpStore(StoreRequestComplete storeRequestComplete);

    ResponseEntity<ResponseStructure<Store>> updateStore(StoreRequest storeRequest, String storeId);


    ResponseEntity<ResponseStructure<StoreResponse>> getStore(String storeId);

    ResponseEntity<Boolean> checkIfStoreExistBySeller();

    ResponseEntity<ResponseStructure<Store>> getStoreBySeller();
}
