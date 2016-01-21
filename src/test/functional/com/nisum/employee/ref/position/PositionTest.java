package com.nisum.employee.ref.position;

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
public class PositionTest {
	private static final String POSITION = ".//*[@id='header']/div[1]/ul/li[2]/a/span" ;
	private static final String CREATE = "//*[@id='rsBtn']";
	private static final String CREATE1 = "//*[contains(@id, 'rsBtn')]";
	
	private static final String SELECT_DESIG = ".//*[@id='designation']/option[5]";
	private static final String SELECT_CLIENT = "id('client')/option[3]";
	private static final String SELECT_LOCATION = "id('location')/option[3]";
	private static final String SELECT_EXP = "id('exp')/option[3]";
	private static final String SELECT_SKILLS = ".//*[@id='skills']/ul/li/input";  
	private static final String SELECT_SKILLS_LANG = ".//*[@id='ui-select-choices-row-0-6']/div";
	private static final String SELECT_SKILLS_LANG1 = "//*[starts-with(@id, 'ui-select-choices-row-') and ends-with(@id, '[0-9]+-6')]/div";
	private static final String ENTER_SECONDARYSKILLS = ".//*[@id='secondarySkills']";  
	private static final String ENTER_JOBDISCRIPTION = ".//*[@id='jobProfile']";  

	private static final String SELECT_IROUNDS = ".//*[@id='irounds']/ul/li/input";
	private static final String SELECT_IROUNDS1 = ".//*[@id='ui-select-choices-row-1-2']/div";
	private static final String SAVE = ".//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/form/div/div/div[2]/div[5]/div[2]/button[1]";
	
	  private static final String OSI_TECHNOLOGIES = "OSI Technologies";
	    private static final String ID_LOGOUT = "//*[@id='logout']";
	    private static final String OSI_TECHNOLOGIES_RECRUITMENT_PORTAL = "OSI Technologies - Recruitment Portal";
	    private static final String SIGN_IN_BUTTON = "//*[@id='signIn']";
	    private static final String ID_PASSWD = "//*[@id='Passwd']";
	    private static final String ID_EMAIL = "//*[@id='Email']";
	    private static final String ID_WRAPPER = "//*[@id='header']/div[2]/ul/li/a";
	    
	    @Test
		public void positionTest() throws InterruptedException {
			WebDriver driver = new FirefoxDriver();
//			HtmlUnitDriver driver = new HtmlUnitDriver(false);
			// WebDriver driver = new HtmlUnitDriver();
			
			try{
				TargetLocator target;
				loginUser(driver);

				target = driver.switchTo();
				WebElement position=driver.findElement(By.xpath(POSITION));
				position.click();
				WebElement create=driver.findElement(By.xpath(CREATE));
				create.click();
				WebElement selectDesig=driver.findElement(By.xpath(SELECT_DESIG));
				selectDesig.click();
				WebElement selectClient=driver.findElement(By.xpath(SELECT_CLIENT));
				selectClient.click();
				WebElement selectExp=driver.findElement(By.xpath(SELECT_EXP));
				selectExp.click();
				WebElement selectLocation=driver.findElement(By.xpath(SELECT_LOCATION));
				selectLocation.click();
				WebElement selectSkills=driver.findElement(By.xpath(SELECT_SKILLS));
				
				selectSkills.click();
				
				WebElement selectSkills_lang=driver.findElement(By.xpath(SELECT_SKILLS_LANG));
				selectSkills_lang.click();
				WebElement enterDiscription=driver.findElement(By.xpath(ENTER_JOBDISCRIPTION));
				enterDiscription.sendKeys("job profile");
				
				WebElement enterSecondarySkills=driver.findElement(By.xpath(ENTER_SECONDARYSKILLS));
				enterSecondarySkills.sendKeys("J2SE");
				
				WebElement selectIRounds=driver.findElement(By.xpath(SELECT_IROUNDS));
				selectIRounds.click();
				WebElement selectIRounds1=driver.findElement(By.xpath(SELECT_IROUNDS1));
				selectIRounds1.click();
				WebElement save=driver.findElement(By.xpath(SAVE));
				save.click();
			
				
				logout(driver);
			}finally{
				Thread.sleep(10000);
				driver.quit();
			}
		}
	    
	    private void logout(WebDriver driver) throws InterruptedException {
			TargetLocator target;
			target = driver.switchTo();
			WebElement account = target.activeElement().findElement(By.xpath(ID_WRAPPER));
			account.click();

			WebElement logout = target.activeElement().findElement(By.xpath(ID_LOGOUT));
			logout.click();

			Thread.sleep(10000);

			System.out.println(driver.getTitle());
			Assert.assertEquals(OSI_TECHNOLOGIES, driver.getTitle());
		}

	    
	    private void loginUser(WebDriver driver) throws InterruptedException {
			driver.get("http://localhost:8080/EmployeeReferral/login.html");

			WebElement signInWithGoogle = driver.findElement(By.id("signInG"));
			signInWithGoogle.click();

			Set<String> windowIds = driver.getWindowHandles();

			Iterator<String> ids = windowIds.iterator();

			String mainId = ids.next();
			String popupId = ids.next();
			driver.switchTo().window(popupId);
			System.out.println(driver.getTitle());

			TargetLocator target = driver.switchTo();
			WebElement username = target.activeElement().findElement(By.xpath(ID_EMAIL));
			username.sendKeys("osirecruitmentportal@gmail.com");
			username.sendKeys(Keys.ENTER);

			Thread.sleep(5000);
			WebElement password = target.activeElement().findElement(By.xpath(ID_PASSWD));
			password.sendKeys("123vinu123");

			target.activeElement().sendKeys(Keys.TAB);

			WebElement loginButton = target.activeElement().findElement(By.xpath(SIGN_IN_BUTTON));
			loginButton.click();

			driver.switchTo().window(mainId);
			
			Thread.sleep(10000);

			System.out.println(driver.getTitle());

			Assert.assertThat(driver.getTitle(), Is.is(OSI_TECHNOLOGIES_RECRUITMENT_PORTAL));
		}

}
