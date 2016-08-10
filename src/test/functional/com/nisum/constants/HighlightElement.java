package com.nisum.constants;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

final public class HighlightElement {
	
	public static void drawBorderUsingXPATH(WebDriver driver, String xpath){
        WebElement element_node = driver.findElement(By.xpath(xpath));
        JavascriptExecutor jse = (JavascriptExecutor) driver;
        jse.executeScript("arguments[0].style.border='3px solid red'", element_node);
    }
	
	public static void drawBorderUsingClassName(WebDriver driver, String className){
        WebElement element_node = driver.findElement(By.className(className));
        JavascriptExecutor jse = (JavascriptExecutor) driver;
        jse.executeScript("arguments[0].style.border='3px solid red'", element_node);
    }
	
	public static void drawBorderUsingPartialLinkText(WebDriver driver, String partialLinktext){
        WebElement element_node = driver.findElement(By.partialLinkText(partialLinktext));
        JavascriptExecutor jse = (JavascriptExecutor) driver;
        jse.executeScript("arguments[0].style.border='3px solid red'", element_node);
    }
}
