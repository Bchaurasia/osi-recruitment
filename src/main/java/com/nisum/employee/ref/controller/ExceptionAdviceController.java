package com.nisum.employee.ref.controller;
import java.util.concurrent.ExecutionException;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
@Slf4j
public class ExceptionAdviceController {
	
	@ExceptionHandler({InterruptedException.class, RuntimeException.class, 
		ExecutionException.class})
    public ResponseEntity<String> handleRuntimeErrors(Exception e) {
        log.error(e.getMessage(), e);
        return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
}