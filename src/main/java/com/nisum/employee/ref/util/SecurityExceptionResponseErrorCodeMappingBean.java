package com.nisum.employee.ref.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.Getter;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class SecurityExceptionResponseErrorCodeMappingBean extends
		SimpleUrlAuthenticationFailureHandler {

    @Getter
    private Map<String, Integer> failureStatusCodesMap = new HashMap<String, Integer>();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        Integer statusCode = failureStatusCodesMap.get(exception.getClass().getName());
        if (statusCode != null) {
        	response.sendError(statusCode, "Authentication Failed: " + exception.getMessage());
        } else {
            super.onAuthenticationFailure(request, response, exception);
        }
    }

    public void setFailureStatusCodesMap(Map<String,Integer> failureStatusCodesMap) {
        this.failureStatusCodesMap.clear();
        for (Map.Entry<String,Integer> entry : failureStatusCodesMap.entrySet()) {
            String exception = entry.getKey();
            Integer statusCode = entry.getValue();
            this.failureStatusCodesMap.put(exception, statusCode);
        }
    }
}