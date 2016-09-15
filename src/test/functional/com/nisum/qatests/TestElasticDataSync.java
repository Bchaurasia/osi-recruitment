// Author: akakade@nisum.com

package com.nisum.qatests;

import static org.junit.Assert.assertEquals;
import java.util.concurrent.TimeUnit;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.nisum.constants.AdminPageConstants;
import com.nisum.constants.DashboardPageConstants;
import com.nisum.constants.LoginPageConstants;
import com.nisum.employee.ref.login.LoginAndLogout;

public class TestElasticDataSync {

	private WebDriver driver;
	WebDriverWait wait;
	LoginAndLogout loginObject = new LoginAndLogout();

	@Before
	public void cleanDatabase() throws Exception {

		//Clean database and execute DB scripts
		String path = "cmd /c start " + LoginPageConstants.PATH_CLEAN_DATABASE;
		Runtime run = Runtime.getRuntime();
		run.exec(path);

		System.setProperty("webdriver.chrome.driver", "src\\test\\resources\\chromedriver.exe");

		ChromeOptions options = new ChromeOptions();
		options.addArguments("--disable-extensions");
		driver = new ChromeDriver(options);
		wait = new WebDriverWait(driver, 10);
		driver.manage().window().maximize();
	}

	@Test
	public void elasticDataSync() throws Exception {

		String mainURL = loginObject.loginUser(driver, LoginPageConstants.ADMIN_USERNAME, LoginPageConstants.GPLUS_ALL_USERS_PASSWORD );
		Thread.sleep(1000);
		assertEquals(LoginPageConstants.MAIN_URL, mainURL);
		String dataSyncURL = navigateToESDataSyncTab();
		Thread.sleep(1000);
		assertEquals(LoginPageConstants.DATA_SYNC_URL, dataSyncURL);
		deleteDataIndex();
		updateDataIndex();
	}

	@After
	public void pageTearDown() throws Exception{

		driver.close();
		driver.quit();
	}

	private String navigateToESDataSyncTab() throws InterruptedException {

		WebElement AdminClick = wait.until(ExpectedConditions.elementToBeClickable(By.xpath(DashboardPageConstants.ADMIN_TAB)));
		AdminClick.click();
		Thread.sleep(1000);
		WebElement ESDataClick = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(AdminPageConstants.ES_DATA_SYNC_SUB_TAB)));
		ESDataClick.click();
		String datasyncURL = driver.getCurrentUrl();
		return datasyncURL;
	}

	private void deleteDataIndex() throws InterruptedException {

		Thread.sleep(1000);
		WebElement DeleteIndexClick = wait.until(ExpectedConditions.elementToBeClickable(By.xpath(AdminPageConstants.BT_DELETE_DATA_INDEX)));
		DeleteIndexClick.click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(AdminPageConstants.MSG_DATA_INDEX_DELETED_SUCCESSFULLY)));
		String deleteActualMessage = driver.findElement(By.xpath(AdminPageConstants.MSG_DATA_INDEX_DELETED_SUCCESSFULLY)).getText();
		String deleteExpectedMessage = "Data index deleted successfully";
		assertEquals(deleteExpectedMessage, deleteActualMessage);
	}

	private void updateDataIndex() throws InterruptedException {

		Thread.sleep(1000);
		WebElement UpdateIndexClick = wait.until(ExpectedConditions.elementToBeClickable(By.xpath(AdminPageConstants.BT_UPDATE_DATA_INDEX)));
		UpdateIndexClick.click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(AdminPageConstants.MSG_DATA_INDEX_UPDATED_SUCCESSFULLY)));
		String updateActualMessage = driver.findElement(By.xpath(AdminPageConstants.MSG_DATA_INDEX_UPDATED_SUCCESSFULLY)).getText();
		String updateExpectedMessage = "Data index updated successfully";
		assertEquals(updateExpectedMessage, updateActualMessage);
	}

}
