 package com.nisum.employee.ref.controller;

import java.io.BufferedInputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.gridfs.GridFSDBFile;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.search.ProfileSearchService;
import com.nisum.employee.ref.service.IAppInfoService;
import com.nisum.employee.ref.service.IProfileService;

import gherkin.deps.net.iharder.Base64.InputStream;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ProfileController {

	private static final String MSG = "{\"msg\":\"";

	@Autowired
	private IProfileService profileService;
	
	@Autowired
	private ProfileSearchService profileSearchService;
	
	@Autowired
	private IAppInfoService infoService;
	
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public ResponseEntity<?> retrieveProfile(@RequestParam(value = "emailId", required = false) String emailId,@RequestParam(value = "jobcodeProfile", required = false) String jobcodeProfile,@RequestParam(value = "profilecreatedBy", required = false) String profilecreatedBy) throws Exception {
		List<Profile> positionsDetails = null;
		if (emailId != null && !emailId.isEmpty()) {
			positionsDetails = profileService.getProfileByEmailId(emailId);
		} else if (jobcodeProfile != null && !jobcodeProfile.isEmpty()) {
			positionsDetails = profileService.retrieveProfileByJobCode(jobcodeProfile);
		}else if(profilecreatedBy != null && !profilecreatedBy.isEmpty()){
			positionsDetails = profileService.getProfileByProfileCreatedId(profilecreatedBy);
		}else {
			positionsDetails = profileSearchService.getAllProfiles();
		}
		return new ResponseEntity<List<Profile>>(positionsDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/searchProfileByEmail", method = RequestMethod.GET)
	public ResponseEntity<?> searchProfileByEmailId(@RequestParam(value = "emailId", required = false) String emailId) throws Exception {
		List<Profile> positionsDetails = profileSearchService.getProfilesByProfilecreated(emailId);
		return  new ResponseEntity<List<Profile>>(positionsDetails, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/searchProfile", method = RequestMethod.GET)
	public ResponseEntity<?> searchProfile(@RequestParam(value = "searchQuery", required = false) String searchText) throws Exception {
		List<Profile> positionsDetails = null;
		if (searchText != null && searchText.isEmpty()) {
			positionsDetails = profileSearchService.getAllProfiles();
		} else if (searchText != null && !searchText.isEmpty()) {
			positionsDetails = profileSearchService.getProfilesByEmailIdOrByNameOrByDesignation(searchText);
		} 
		return  new ResponseEntity<List<Profile>>(positionsDetails, HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/profile", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> registerUser(@RequestBody Profile candidate) throws Exception{
			Profile profile = profileService.prepareCandidate(candidate);
			String jsonObj=MSG+ profile.getCandidateName() +"'s profile successfully created\"}";
			return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/approveProfile", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> approveProfile(@RequestBody Profile candidate) {
		profileService.approveCandidate(candidate);
		System.out.println("in controller");
		String jsonObj="{\"msg\":\"Uploaded profile successfully approved\"}";
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/profile", method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> updateUser(@RequestBody Profile candidate) {
		profileService.updateCandidate(candidate);
		String jsonObj="{\"msg\":\"Uploaded profile successfully updated\"}";
		return new ResponseEntity<String>(jsonObj, HttpStatus.OK);
	}

	@ResponseStatus(HttpStatus.OK)
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
	public ResponseEntity<String> uploadResume(HttpServletRequest request, Model model, @RequestParam(value = "file") MultipartFile multipartFile, @RequestParam(value = "candidateId", required = true) String candidateId) throws Exception {
		profileService.saveResume(multipartFile, candidateId);
		return new ResponseEntity<String>("Resume uploaded successfully", HttpStatus.OK);
	}
	
	@ResponseStatus(HttpStatus.OK)
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/status", method = RequestMethod.POST)
	public ResponseEntity<String> updateProfileStatus(@RequestParam(value = "emailId", required = true) String emailId,
			@RequestParam(value = "status", required = true) String status) throws Exception {
		profileService.updateCandidateStatus(emailId, status);
		return new ResponseEntity<String>("Status updated successfully", HttpStatus.OK);
	}
	
	@SuppressWarnings("null")
	@ResponseStatus(HttpStatus.OK)
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	
	@RequestMapping(value = "/fileDownload", method = RequestMethod.GET)
	public ResponseEntity<HttpServletResponse> downloadOndemandOrder(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "candidateId", required = true) String candidateId) throws Exception {
		List<GridFSDBFile> files = profileService.getFileData(candidateId);
		InputStream is = null ;
		GridFSDBFile file = files.get(0);
		if(file!=null){
    	response.setContentType(file.getContentType().toString());
		response.setContentLength((new Long(file.getLength()).intValue()));
        IOUtils.copyLarge(file.getInputStream(), response.getOutputStream());
    	is.close();
		}else{
			log.info("file does not exist");
		}
		return new ResponseEntity<HttpServletResponse>(response, HttpStatus.OK);
	}
	
	@SuppressWarnings("null")
	@ResponseStatus(HttpStatus.OK)
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	
	@RequestMapping(value = "/helpFileDownload", method = RequestMethod.GET)
	public ResponseEntity<HttpServletResponse> downHelpDoc(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "candidateId", required = true) String candidateId) throws Exception {
		BufferedInputStream file = (BufferedInputStream) infoService.getFileData();
		if(file!=null){
    	response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
		response.setContentLength(file.available());
        IOUtils.copyLarge(file, response.getOutputStream());
    	
		}else{
			log.info("file does not exist");
		}
		return new ResponseEntity<HttpServletResponse>(response, HttpStatus.OK);
	}
	
	@Secured({"ROLE_ADMIN","ROLE_USER","ROLE_HR","ROLE_MANAGER","ROLE_INTERVIEWER","ROLE_REQUISITION_MANAGER","ROLE_REQUISITION_APPROVER"})
	@RequestMapping(value = "/getProfileByReferralEmail", method = RequestMethod.GET)
	public ResponseEntity<?> getProfileByReferralEmail(@RequestParam(value = "emailId", required = false) String emailId) throws Exception {
		List<Profile> positionsDetails = profileSearchService.getProfilesByRefreedBy(emailId);
		return  new ResponseEntity<List<Profile>>(positionsDetails, HttpStatus.OK);
	}
}

		
