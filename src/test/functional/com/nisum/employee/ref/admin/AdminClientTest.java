package com.nisum.employee.ref.admin;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import com.nisum.employee.ref.login.LoginPageTest;

public class AdminClientTest {
	LoginPageTest log_IN_OUT=new LoginPageTest();
	
	private static final String SAVE = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div[2]/div[2]/button[1]";
	private static final String LOCATION = "//*[@id='location']";
	private static final String CLIENT_NAME = "//*[@id='clientName']";
	private static final String ADD_CLIENT = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/a/span";
	private static final String ID_CLIENT= "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[1]/ul/li[2]/a";
	private static final String TABLE ="//*[@id='manageClient']";
	
	@Test
	public void clientTest() throws InterruptedException {
		WebDriver driver = new FirefoxDriver();
		
		try {
			log_IN_OUT.loginUser(driver);

			driver.switchTo();
			driver.get("http://localhost:8080/EmployeeReferral/main.html#/admin/client");
			
			Thread.sleep(10000);
			
			WebElement clientId=driver.findElement(By.xpath(ID_CLIENT));
			clientId.click();
			
			Thread.sleep(5000);
			
			System.out.println(driver.getCurrentUrl());	
			
			Assert.assertEquals(driver.getCurrentUrl(),"http://localhost:8080/EmployeeReferral/main.html#/admin/client");
			
			WebElement addClient=driver.findElement(By.xpath(ADD_CLIENT));
			addClient.click();
			
			Thread.sleep(8000);
			
			WebElement clientName=driver.findElement(By.xpath(CLIENT_NAME));
			clientName.sendKeys("XYZ");
			
			WebElement locaton=driver.findElement(By.xpath(LOCATION));
			locaton.sendKeys("PUNE");
			
			WebElement save=driver.findElement(By.xpath(SAVE));
			save.click();
			
			Thread.sleep(10000);
			
			WebElement table=driver.findElement(By.xpath(TABLE));
			
			System.out.println(table.getText());
			String tabledata=table.getText();
			
			System.out.println(tabledata.contains("XYZ"));
			
			Assert.assertEquals(tabledata.contains("XYZ"),true);
			
			log_IN_OUT.logoutUser(driver);
			
		} finally {
			driver.quit();
		}
	}

}
