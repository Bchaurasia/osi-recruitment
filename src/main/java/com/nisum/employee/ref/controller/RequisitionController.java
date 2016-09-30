package com.nisum.employee.ref.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.JobCodeReport;
import com.nisum.employee.ref.domain.Offer;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;
import com.nisum.employee.ref.search.JobCodeInterviewReportSearchService;
import com.nisum.employee.ref.search.PositionSearchService;
import com.nisum.employee.ref.search.RequisitionSearchService;
import com.nisum.employee.ref.service.IPositionService;
import com.nisum.employee.ref.service.InterviewDetailsService;
import com.nisum.employee.ref.service.OfferService;
import com.nisum.employee.ref.service.RequisitionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class RequisitionController {
	private static final String MSG_START = "{\"msg\":\"";
	private static final String MSG_END = "\"}";
	private static final String REQUISITION_HAS_BEEN_REJECTED_SUCCESSFULLY = " Requisition has been rejected successfully";

	@Autowired
	RequisitionService requisitionService;

	@Autowired
	RequisitionSearchService requisitionSearchService;
	
	@Autowired
	private IPositionService positionService;

	@Autowired
	private PositionSearchService positionSearchService;
	
	@Autowired
	private InterviewDetailsService interviewDetailsService;
	
	@Autowired
	private OfferService offerService;
	
	@Autowired
	JobCodeInterviewReportSearchService jobCodeInterviewReportSearchService;
	
	

	@Secured({ "ROLE_ADMIN", "ROLE_HR", "ROLE_MANAGER", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/searchRequisitionByText", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> searchRequisitionBasedOnId(
			@RequestParam(value = "searchRequisition", required = true) String searchRequisition) throws Exception {
		List<Requisition> requisitionsDetails = null;
		if (!searchRequisition.isEmpty()) {
			requisitionsDetails = requisitionSearchService.getRequisitionReqIdOrPositionOrClientByNameOrStatus(searchRequisition);
		} else {
			requisitionsDetails = requisitionSearchService.getAllRequisitionDetails();
		}
		return new ResponseEntity<List<Requisition>>(requisitionsDetails, HttpStatus.OK);
	}

	@Secured({"ROLE_USER", "ROLE_ADMIN", "ROLE_HR", "ROLE_MANAGER", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@ResponseBody
	@RequestMapping(value = "/requisition", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveAllRequisitions() {
		List<Requisition> requisitionsDetails = requisitionService.retrieveAllRequistions();
		return new ResponseEntity<List<Requisition>>(requisitionsDetails, HttpStatus.OK);
	}
	
	

	@Secured({ "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/requisition", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> createRequisition(@RequestBody Requisition requisition) throws Exception {
		requisitionService.prepareRequisition(requisition);
		String jsonObj = MSG_START + "Requisition created successfully and notification sent to "
				+ requisition.getApproval1().getName() + "." + MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({ "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/requisition", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<String> updateRequisition(@RequestBody Requisition requisition) throws Exception {
		log.info("Updating requisition");
		RequisitionApproverDetails requisitionApproverDetails = requisitionService.updateRequisition(requisition);
		String message = "Requisition updated successfully and notification sent to "
				+ requisitionApproverDetails.getApproverName() + ".";
		String jsonObj = "{\"msg\":\"" + message + "\"}";
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({ "ROLE_ADMIN", "ROLE_HR", "ROLE_MANAGER", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/requisitionById", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> retrieveRequisitionBasedOnId(
			@RequestParam(value = "requisitionId", required = true) String requisitionId) {
		Requisition requisitionsDetails = requisitionService.retrieveRequisitionBasedOnId(requisitionId);
		return  new ResponseEntity<Requisition>(requisitionsDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/requisitionByCreatedById", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> requisitionByCreatedById(
			@RequestParam(value = "createdById", required = true) String createdById) {
		List<Requisition> requisitionsDetails = requisitionSearchService.getRequisitionsBrcreatedById(createdById);
		return  new ResponseEntity<List<Requisition>>(requisitionsDetails, HttpStatus.OK);
	}

	@Secured({ "ROLE_REQUISITION_APPROVER" })
	@ResponseBody
	@RequestMapping(value = "/rejectRequisition", method = RequestMethod.POST)
	public ResponseEntity<?> rejectRequisition(@RequestBody Requisition requisition) throws Exception {
		requisitionService.rejectRequisition(requisition);
		String jsonObj = MSG_START + requisition.getRequisitionId() + REQUISITION_HAS_BEEN_REJECTED_SUCCESSFULLY
				+ MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({ "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/cloneRequisition", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> cloneRequisition(@RequestBody Requisition requisition) throws Exception {
		requisitionService.cloneRequisition(requisition);
		String message = "Requisition cloned successfully and sent notification to "
				+ requisition.getApproval1().getName() + ".";
		String jsonObj = MSG_START + message + MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({ "ROLE_REQUISITION_APPROVER" })
	@ResponseBody
	@RequestMapping(value = "/approveRequisition", method = RequestMethod.POST)
	public ResponseEntity<?> approveRequisition(@RequestBody Requisition requisition) throws Exception {
		log.info("Approving requisition");
		String message = requisitionService.approveRequisition(requisition);
		String jsonObj = MSG_START + message + " " + MSG_END;
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}
	
	@Secured({ "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/getRequisitionBasedOnApproverId", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getRequisitionBasedOnApproverId(
			@RequestParam(value = "emailId", required = true) String emailId) throws Exception {
		List<Requisition> requisitionsDetails = null;
			requisitionsDetails = requisitionSearchService.getRequisitionByApprover(emailId);
		return new ResponseEntity<List<Requisition>>(requisitionsDetails, HttpStatus.OK);
	}
	@Secured({ "ROLE_ADMIN", "ROLE_HR", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/downloadReqReportFromDashboard", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<HttpServletResponse> downloadReqReportFromDashboard(HttpServletRequest request, HttpServletResponse response){
		
		List<Requisition> requisitionsDetails = requisitionService.retrieveAllRequistions();
		XSSFWorkbook  wb = new XSSFWorkbook ();
		XSSFSheet sheet = wb.createSheet();
		XSSFRow  row = sheet.createRow(0);
		
		 XSSFFont font = wb.createFont();
		 font.setFontHeightInPoints((short) 10);
	     font.setFontName("IMPACT");
	     font.setBold(false);
	     font.setColor(HSSFColor.BLACK.index);
	     XSSFCellStyle style = wb.createCellStyle();
	     style.setFont(font);
	     style.setFillBackgroundColor(HSSFColor.GREEN.index);
		
	     XSSFCell cell0 = row.createCell(0);
	     cell0.setCellValue("Job Code");
	     cell0.setCellStyle(style);
	     
	     XSSFCell cell1 = row.createCell(1);
	     cell1.setCellValue("Req Date");
	     cell1.setCellStyle(style);
	     
	     XSSFCell cell2 = row.createCell(2);
	     cell2.setCellValue("Approval Status");
	     cell2.setCellStyle(style);
	     
	     XSSFCell cell3 = row.createCell(3);
	     cell3.setCellValue("Target Date");
	     cell3.setCellStyle(style);
	     
	     XSSFCell cell4 = row.createCell(4);
	     cell4.setCellValue("No of Positions");
	     cell4.setCellStyle(style);
	     
	     XSSFCell cell5 = row.createCell(5);
	     cell5.setCellValue("Client");
	     cell5.setCellStyle(style);
	     
			
		ListIterator<Requisition> reqListIterator = requisitionsDetails.listIterator();

	    int rowIndex = 1;

	    while (reqListIterator.hasNext()) {

	    	Requisition req = reqListIterator.next();

	    	XSSFRow row1 = sheet.createRow(rowIndex++);

	        row1.createCell(0).setCellValue(req.getRequisitionId());
	        row1.createCell(1).setCellValue(req.getRequisitionDate());
	        row1.createCell(2).setCellValue(req.getStatus());
	        row1.createCell(3).setCellValue(req.getTargetDate());
	        row1.createCell(4).setCellValue(req.getNoOfPositions());
	        row1.createCell(5).setCellValue(req.getClient());
	    }
		ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
		try {
			wb.write(outByteStream);
			byte [] outArray = outByteStream.toByteArray();
			response.setContentType("application/vnd.ms-excel");
			response.setContentLength(outArray.length);
			response.setHeader("Expires:", "0"); // eliminates browser caching
			response.setHeader("Content-Disposition", "attachment; filename=testxls.xls");
			OutputStream outStream = response.getOutputStream();
			outStream.write(outArray);
			outStream.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<HttpServletResponse>(response, HttpStatus.OK);
	}
	
	@Secured({ "ROLE_ADMIN", "ROLE_HR", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/getReportBasedOnPositionandInterview", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getReportBasedOnPositionandInterview(
			@RequestParam(value = "requisitionId", required = true) String requisitionId) throws Exception {
		List<Position> positionDetails = null;
		int offeredCounter = 0;
		int declinedCounter = 0;
		List<JobCodeReport> reportDetails = new ArrayList<>();
		positionDetails = positionSearchService.getPositionForRequisitionId(requisitionId);
		if(positionDetails!= null && !positionDetails.isEmpty()){
			for(Position position:positionDetails){
				offeredCounter = 0;
				declinedCounter = 0;
				JobCodeReport reportData = new JobCodeReport();
				reportData.setRequisitionId(requisitionId);
				reportData.setJobcode(position.getJobcode());
				List<InterviewDetails> interviews = interviewDetailsService.getInterviewDetailsForReport(position.getJobcode());
				if(interviews != null && !interviews.isEmpty())
					reportData.setInteviewCounter(String.valueOf(interviews.size()));
				else
					reportData.setInteviewCounter("0");
				
				List<Offer> offerDetails = offerService.retrieveOfferForJobCode(position.getJobcode());
				if(offerDetails != null && !offerDetails.isEmpty()){
					for(Offer offer:offerDetails){
						if(offer.getOfferStatus()!=null && offer.getOfferStatus().equalsIgnoreCase("Offered"))
							++offeredCounter;
						else if(offer.getOfferStatus()!=null && offer.getOfferStatus().equalsIgnoreCase("Declined"))
							++declinedCounter;
					}
				}
				reportData.setOfferedCounter(String.valueOf(offeredCounter));
				reportData.setDeclinedCounter(String.valueOf(declinedCounter));
				reportDetails.add(reportData);
			}
		}
		jobCodeInterviewReportSearchService.saveJobCodeInterviewReport(reportDetails);
		return new ResponseEntity<List<JobCodeReport>>(reportDetails, HttpStatus.OK);
	}
	
	
	@Secured({ "ROLE_ADMIN", "ROLE_HR", "ROLE_REQUISITION_MANAGER", "ROLE_REQUISITION_APPROVER" })
	@RequestMapping(value = "/downloadInterviewReportFromDashboard", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<HttpServletResponse> downloadInterviewReportFromDashboard(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "requisitionId", required = true) String requisitionId){
		
		List<JobCodeReport> jobCodeReport = jobCodeInterviewReportSearchService.getJobCodeInterviewDetails(requisitionId);
		XSSFWorkbook  wb = new XSSFWorkbook ();
		XSSFSheet sheet = wb.createSheet();
		XSSFRow  row = sheet.createRow(0);
		
		 XSSFFont font = wb.createFont();
		 font.setFontHeightInPoints((short) 10);
	     font.setFontName("IMPACT");
	     font.setBold(false);
	     font.setColor(HSSFColor.BLACK.index);
	     XSSFCellStyle style = wb.createCellStyle();
	     style.setFont(font);
	     style.setFillBackgroundColor(HSSFColor.GREEN.index);
		
	     XSSFCell cell0 = row.createCell(0);
	     cell0.setCellValue("Req Id");
	     cell0.setCellStyle(style);
	     
	     XSSFCell cell1 = row.createCell(1);
	     cell1.setCellValue("Job Code");
	     cell1.setCellStyle(style);
	     
	     XSSFCell cell2 = row.createCell(2);
	     cell2.setCellValue("Total Interviewed");
	     cell2.setCellStyle(style);
	     
	     XSSFCell cell3 = row.createCell(3);
	     cell3.setCellValue("Offered");
	     cell3.setCellStyle(style);
	     
	     XSSFCell cell4 = row.createCell(4);
	     cell4.setCellValue("Declined");
	     cell4.setCellStyle(style);
	     
	  
		ListIterator<JobCodeReport> listIterator = jobCodeReport.listIterator();

	    int rowIndex = 1;

	    while (listIterator.hasNext()) {

	    	JobCodeReport report = listIterator.next();

	    	XSSFRow row1 = sheet.createRow(rowIndex++);

	        row1.createCell(0).setCellValue(report.getRequisitionId());
	        row1.createCell(1).setCellValue(report.getJobcode());
	        row1.createCell(2).setCellValue(report.getInteviewCounter());
	        row1.createCell(3).setCellValue(report.getOfferedCounter());
	        row1.createCell(4).setCellValue(report.getDeclinedCounter());
	    }
		ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
		try {
			wb.write(outByteStream);
			byte [] outArray = outByteStream.toByteArray();
			response.setContentType("application/vnd.ms-excel");
			response.setContentLength(outArray.length);
			response.setHeader("Expires:", "0"); // eliminates browser caching
			response.setHeader("Content-Disposition", "attachment; filename=testxls.xls");
			OutputStream outStream = response.getOutputStream();
			outStream.write(outArray);
			outStream.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<HttpServletResponse>(response, HttpStatus.OK);
	}
	
}