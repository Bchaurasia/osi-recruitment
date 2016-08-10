package com.nisum.qatests;

import java.util.concurrent.TimeUnit;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import com.nisum.constants.AdminPageConstants;
import com.nisum.constants.DashboardPageConstants;
import com.nisum.constants.LoginPageConstants;
import com.nisum.employee.ref.login.LoginAndLogout;
import junit.framework.Assert;

public class TestElasticDataSync {

	private WebDriver driver;
	LoginAndLogout loginObject = new LoginAndLogout();

	@Before
	public void cleanDatabase() throws Exception {

		//Clean database and execute DB scripts
		String path = "cmd /c start " + LoginPageConstants.PATH_CLEAN_DATABASE;
		Runtime run = Runtime.getRuntime();
		run.exec(path);

		System.setProperty("webdriver.chrome.driver", "src\\test\\resources\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.manage().window().maximize();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

	}

	@Test
	public void elasticDataSync() throws Exception {

		loginObject.loginUser(driver, LoginPageConstants.ADMIN_USERNAME, LoginPageConstants.GPLUS_ALL_USERS_PASSWORD );
		navigateToESDataSyncTab();
		deleteDataIndex();
		updateDataIndex();
	}

	private void updateDataIndex() throws InterruptedException {
		
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		Thread.sleep(1000);
		driver.findElement(By.xpath(AdminPageConstants.BT_UPDATE_DATA_INDEX)).click();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		String updateActualMessage = driver.findElement(By.xpath(AdminPageConstants.MSG_DATA_INDEX_UPDATED_SUCCESSFULLY)).getText();
		String updateExpectedMessage = "Data index updated successfully";
		Assert.assertEquals(updateExpectedMessage, updateActualMessage);
	}

	private void deleteDataIndex() throws InterruptedException {
		
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		Thread.sleep(1000);
		driver.findElement(By.xpath(AdminPageConstants.BT_DELETE_DATA_INDEX)).click();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		String deleteActualMessage = driver.findElement(By.xpath(AdminPageConstants.MSG_DATA_INDEX_DELETED_SUCCESSFULLY)).getText();
		String deleteExpectedMessage = "Data index deleted successfully";
		Assert.assertEquals(deleteExpectedMessage, deleteActualMessage);
	}

	private void navigateToESDataSyncTab() throws InterruptedException {
		
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		driver.findElement(By.xpath(DashboardPageConstants.ADMIN_TAB)).click();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		Thread.sleep(1000);
		driver.findElement(By.xpath(AdminPageConstants.ES_DATA_SYNC_SUB_TAB)).click();
	}

	@After
	public void pageTearDown() throws Exception{

		driver.close();
		driver.quit();
	}
}
