package com.nisum.employee.ref.position;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;
import java.util.Set;

import org.hamcrest.core.Is;
import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.WebDriver.TargetLocator;
import org.openqa.selenium.firefox.FirefoxDriver;

import com.nisum.employee.ref.login.LoginPageTest;

import au.com.bytecode.opencsv.CSVReader;

//@UseTestDataFrom("test-data/simple-data.csv")
public class PositionCsvTest {
	
	private static final String POSITION = "//*[@id='header']/div[1]/ul/li[2]/a/span" ;
	private static final String CREATE = ".//*[@id='rsBtn']";
	private static final String SAVE = ".//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/form/div/div/div[2]/div[5]/div[2]/button[1]";
	
	    WebDriver driver = new FirefoxDriver();
	    LoginPageTest loginPageTest = new LoginPageTest();
	 @Test
		public void positionCSVTest() throws InterruptedException, IOException {
			
			
			try{
				loginPageTest.loginUser(driver);
				 driver.switchTo();
				WebElement position=driver.findElement(By.xpath(POSITION));
				position.click();
				WebElement create=driver.findElement(By.xpath(CREATE));
				create.click();
				
				csvDataRead();
				
				WebElement save=driver.findElement(By.xpath(SAVE));
				save.click();
				  loginPageTest.logoutUser(driver);
			}finally{
				Thread.sleep(10000);
				driver.quit();
			}
		}
	
	@SuppressWarnings("resource")
	public void csvDataRead() throws IOException{
		File file1 = new File((new File(".").getCanonicalPath()) + "/src/resource/positionData.csv");	
		  
		  CSVReader reader = new CSVReader(new FileReader(file1));
		  String [] csvCell;
		  //while loop will be executed till the last line In CSV.
		  while ((csvCell = reader.readNext()) != null) {   
			  if( csvCell[0].equals("Designation")){
				  continue;
			  }
		   String designation = csvCell[0];
		   String client = csvCell[1];
		   String experience = csvCell[2];
		   String location = csvCell[3];
		   String skills = csvCell[4];
		   String SecondarySkills = csvCell[5];
		   String IRounds = csvCell[6];
		   String jobDiscription = csvCell[7];
		   driver.findElement(By.xpath(".//*[@id='designation']")).sendKeys(designation);
		   driver.findElement(By.xpath(".//*[@id='client']")).sendKeys(client);
		   driver.findElement(By.xpath(".//*[@id='exp']")).sendKeys(experience);
		   driver.findElement(By.xpath(".//*[@id='location']")).sendKeys(location);
		   driver.findElement(By.xpath(".//*[@id='skills']/ul/li/input")).sendKeys(skills,Keys.ENTER);
		   
		   driver.findElement(By.xpath(".//*[@id='secondarySkills']")).sendKeys(SecondarySkills);
		   driver.findElement(By.xpath(".//*[@id='irounds']/ul/li/input")).sendKeys(IRounds,Keys.ENTER);
		   driver.findElement(By.xpath(".//*[@id='jobProfile']")).sendKeys(jobDiscription);
		  driver.findElement(By.xpath(SAVE)).click();
		  
		
		  }  

}


	
}
