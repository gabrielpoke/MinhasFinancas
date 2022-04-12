package com.Gabriel.MinhasFinancas.api.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {

    @GetMapping("/")
    public String helloworld(){
        return "Hello world!";
    }
}
