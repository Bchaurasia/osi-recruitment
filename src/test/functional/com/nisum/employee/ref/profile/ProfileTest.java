package com.nisum.employee.ref.profile;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Set;

import org.hamcrest.core.Is;
import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriver.TargetLocator;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
public class ProfileTest {
	private static final String PROFILE = ".//*[@id='header']/div[1]/ul/li[3]/a/span";
	private static final String CREATE = ".//*[@id='rsBtn1']";
	private static final String ENTER_CNAME = ".//*[@id='cname']";
	private static final String ENTER_EMAILID = ".//*[@id='emailId']";
	private static final String ENTER_MOBILENUM = ".//*[@id='mobileNo']";
	private static final String ENTER_ALTMOBILENUM = ".//*[@id='altmobileNo']";
	private static final String ENTER_PASSPORTNUM = ".//*[@id='passportNo']";
	private static final String ENTER_ADDRESS = ".//*[@id='address']";
	private static final String ENTER_SKYPEID = ".//*[@id='skypeID']";
	
	
	private static final String PROFESSIONALDETAILS = ".//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/form/div/accordion/div/div[2]/div[1]/h4/a/font";
	
	private static final String SELECT_QUALIFICATION=".//*[@id='qualification']/option[3]";
	private static final String STREAM = ".//*[@id='stream']";
	private static final String SELECT_DESIGNATION = ".//*[@id='designation']/option[2]";
	private static final String ENTER_CURRENT_EMPLOYER = ".//*[@id='currentEmployer']";
	private static final String EXPERIENCE_YEARS = ".//*[@id='experienceYear']/option[6]";
	private static final String EXPERIENCE_MONTHS = ".//*[@id='experienceMonth']/option[7]";
	private static final String SKILLS = ".//*[@id='skills']/ul/li/input";
	private static final String SELECT_SKILLS = ".//*[@id='ui-select-choices-row-0-0']/div";
	private static final String RECRUITMENT_TEAM_ASSIGNED = ".//*[@id='qualification']";
	private static final String SELECT_RECRUITMENT_TEAM_ASSIGNED = ".//*[@id='referredBy']/option[3]";
	private static final String JOBCODE = ".//*[@id='jobcode']/ul/li/input";
    private static final String SELECTED_JOBCODE = ".//*[@id='ui-select-choices-row-1-0']/div";
	private static final String UPLOAD_FILE=".//*[@id='uploadFile']";
	private static final String ADDITIONAL_NOTES = ".//*[@id='notes']";
	private static final String SAVE = ".//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/form/div/accordion/div/div[2]/div[2]/div/div[8]/div[3]/button";

	   private static final String OSI_TECHNOLOGIES = "OSI Technologies";
	    private static final String ID_LOGOUT = "//*[@id='logout']";
	    private static final String OSI_TECHNOLOGIES_RECRUITMENT_PORTAL = "OSI Technologies - Recruitment Portal";
	    private static final String SIGN_IN_BUTTON = "//*[@id='signIn']";
	    private static final String ID_PASSWD = "//*[@id='Passwd']";
	    private static final String ID_EMAIL = "//*[@id='Email']";
	    private static final String ID_WRAPPER = ".//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/form/div/accordion/div/div[2]/div[2]/div/div[8]/div[3]/button";
	    
	    
	    
	    @Test
		public void profileTest() throws InterruptedException, IOException {
			WebDriver driver = new FirefoxDriver();
			//HtmlUnitDriver driver = new HtmlUnitDriver(false);
			// WebDriver driver = new HtmlUnitDriver();
			
			try{
				TargetLocator target;
				loginUser(driver);

				target = driver.switchTo();
				WebElement profile=driver.findElement(By.xpath(PROFILE));
				profile.click();
				WebElement createbtn= driver.findElement(By.xpath(CREATE));
				createbtn.click();
				WebElement candidateName=driver.findElement(By.xpath(ENTER_CNAME));
				candidateName.sendKeys("Pranay");
				WebElement enterEmailId=driver.findElement(By.xpath(ENTER_EMAILID));
				enterEmailId.sendKeys("pgogulapati@nisum.com");
				WebElement enterMobileNum=driver.findElement(By.xpath(ENTER_MOBILENUM));
				enterMobileNum.sendKeys("9890707807");
				WebElement enterAltMobileNum=driver.findElement(By.xpath(ENTER_ALTMOBILENUM));
				enterAltMobileNum.sendKeys("98552977008");
				WebElement enterPassportNum=driver.findElement(By.xpath(ENTER_PASSPORTNUM));
				enterPassportNum.sendKeys("98552977008");
				WebElement enterAddress=driver.findElement(By.xpath(ENTER_ADDRESS));
				enterAddress.sendKeys("pune");
				WebElement enterSkypeId=driver.findElement(By.xpath(ENTER_SKYPEID));
				enterSkypeId.sendKeys("pranaygogulapati");
				
				
				WebElement professionalDetails=driver.findElement(By.xpath(	PROFESSIONALDETAILS));
				professionalDetails.click();
				WebElement selectQualification=driver.findElement(By.xpath(SELECT_QUALIFICATION));
				selectQualification.click();
				WebElement stream=driver.findElement(By.xpath(STREAM));
				stream.sendKeys("IT");
				WebElement selectDesignation=driver.findElement(By.xpath(SELECT_DESIGNATION));
				selectDesignation.click();
				WebElement entercurrentEmployer=driver.findElement(By.xpath(ENTER_CURRENT_EMPLOYER));
				entercurrentEmployer.sendKeys("Nisum");
				WebElement experienceYears=driver.findElement(By.xpath(EXPERIENCE_YEARS));
				experienceYears.click();
				WebElement experienceMonths=driver.findElement(By.xpath(EXPERIENCE_MONTHS));
				experienceMonths.click();
				WebElement skills=driver.findElement(By.xpath(SKILLS));
				skills.click();
				WebElement selectskills=driver.findElement(By.xpath(SELECT_SKILLS));
				selectskills.click();
				WebElement recruitmentTeam=driver.findElement(By.xpath(RECRUITMENT_TEAM_ASSIGNED));
				recruitmentTeam.click();
				WebElement selectRecruitmentTeam=driver.findElement(By.xpath(SELECT_RECRUITMENT_TEAM_ASSIGNED));
				selectRecruitmentTeam.click();
				WebElement jobCode=driver.findElement(By.xpath(JOBCODE));
				jobCode.click();
				WebElement selecetdJobCode=driver.findElement(By.xpath(SELECTED_JOBCODE));
				selecetdJobCode.click();
				WebElement uploadFile =driver.findElement(By.xpath(UPLOAD_FILE));
				
				 File file1 = new File((new File(".").getCanonicalPath()) + "/src/main/webapp/static/files/sampleResume.pdf");
				 //"/src/main/webapp/static/files/sampleResume.pdf"
				uploadFile.sendKeys(file1.getPath());
				WebElement additionalNotes=driver.findElement(By.xpath(ADDITIONAL_NOTES));
				additionalNotes.sendKeys("GAP CORP");
				WebElement savebtn=driver.findElement(By.xpath(SAVE));
				savebtn.click();
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
			username.sendKeys("ositechportal@gmail.com");
			username.sendKeys(Keys.ENTER);

			Thread.sleep(5000);
			WebElement password = target.activeElement().findElement(By.xpath(ID_PASSWD));
			password.sendKeys("123osi123");

			target.activeElement().sendKeys(Keys.TAB);

			WebElement loginButton = target.activeElement().findElement(By.xpath(SIGN_IN_BUTTON));
			loginButton.click();

			driver.switchTo().window(mainId);
			
			Thread.sleep(10000);

			System.out.println(driver.getTitle());

			Assert.assertThat(driver.getTitle(), Is.is(OSI_TECHNOLOGIES_RECRUITMENT_PORTAL));
		}

}