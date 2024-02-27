package com.example.backend.Testing;

import com.example.backend.controller.UserController;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Test
    void getUserById() throws Exception {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

        Long userId = 1L;

        // Assume UserService returns an empty optional for the given userId
        when(userService.getUsersById(userId)).thenReturn(java.util.Optional.empty());

        mockMvc.perform(get("/api/v2/users/{userId}", userId))
                .andExpect(status().isNotFound());  // Assuming a 404 status for simplicity
    }
}
