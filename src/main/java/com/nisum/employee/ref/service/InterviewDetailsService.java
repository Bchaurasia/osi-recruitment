package com.nisum.employee.ref.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.Event;
import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.InterviewFeedback;
import com.nisum.employee.ref.domain.InterviewSchedule;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.domain.Round;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.repository.InterviewDetailsRepository;
import com.nisum.employee.ref.search.InterviewSearchService;
import com.nisum.employee.ref.search.ProfileSearchService;


@Service
public class InterviewDetailsService implements IInterviewDetailsService{
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private InterviewDetailsRepository interviewDetailsRepository;
	
	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private ProfileService profileService;
	
	@Autowired
	private InterviewSearchService  interviewSearchService;
	
	@Autowired
	private ProfileSearchService profileSearchService;
	
	@Autowired
	IEventService eventService;
	
	@Autowired
	private UserService userService;
	
	
	public InterviewDetails  saveFeedback(InterviewFeedback interviewFeedback) throws Exception{
		InterviewDetails interviewDetails = null;
		InterviewDetails interviewDetails2 = interviewDetailsRepository.getInterviewDetailsById(interviewFeedback.getCandidateId());
		if(interviewDetails2.getInterviewerId() != null){
			Event e= new Event();
			e.setEventDesc("Feedback for "+interviewFeedback.getRoundName()+" interview of "+interviewFeedback.getCandidateName()+" has been submitted.");
			e.setCategory("Management");
			e.setEmailId(interviewFeedback.getFeedbackSubmittedBy());
			eventService.setEvent(e);
			interviewDetails = enrichInterviewDetails2(interviewDetails2, interviewFeedback);
			interviewDetailsRepository.scheduleInterview(interviewDetails);
			interviewDetails=interviewSearchService.updateInterviewDetailsIndex(interviewDetails);
			List<Profile> pro = profileService.getProfileByEmailId(interviewFeedback.getCandidateId());
			profileService.updateCandidateStatus(pro.get(0).getEmailId(), interviewDetails.getProgress());
			pro.get(0).setStatus(interviewDetails.getProgress());
			profileSearchService.updateProfileIndex(pro.get(0));
			notificationService.sendFeedbackMail(interviewFeedback);
			return interviewDetails;
		}
		return null;
	}
	
	public InterviewDetails  scheduleInterview(InterviewSchedule interviewSchedule) throws Exception{
		interviewSchedule.setUpdatedScheduleDate(new Date());
		InterviewDetails interviewDetails = null;
		InterviewDetails interviewDetails2 = interviewDetailsRepository.getInterviewDetailsById(interviewSchedule.getCandidateId());
		interviewDetails = enrichInterviewDetails(interviewDetails2 ,interviewSchedule);
		interviewDetailsRepository.scheduleInterview(interviewDetails);
		interviewDetails=interviewSearchService.updateInterviewDetailsIndex(interviewDetails);
		List<Profile> pro = profileService.getProfileByEmailId(interviewSchedule.getCandidateId());
		String mobileNo = pro.get(0).getMobileNo();
		String altMobileNo = pro.get(0).getAltmobileNo();
		String skypeId = pro.get(0).getSkypeId();
		pro.get(0).setStatus(interviewDetails.getProgress());
		profileService.updateCandidateStatus(pro.get(0).getEmailId(), interviewDetails.getProgress());
		profileSearchService.updateProfileIndex(pro.get(0));
		notificationService.sendScheduleMail(interviewSchedule, mobileNo, altMobileNo, skypeId);
		return interviewDetails;
	}
	
	public InterviewDetails  scheduleInterview1(InterviewSchedule interviewSchedule) throws Exception{
		InterviewDetails interviewDetails = null;
		InterviewDetails interviewDetails2 = interviewDetailsRepository.getInterviewDetailsById(interviewSchedule.getCandidateId());
		interviewDetails = enrichInterviewDetailsUpdate(interviewDetails2 ,interviewSchedule);
		interviewDetailsRepository.scheduleInterview(interviewDetails);
		List<Profile> pro = profileService.getProfileByEmailId(interviewSchedule.getCandidateId());
		String mobileNo = pro.get(0).getMobileNo();
		String altMobileNo = pro.get(0).getAltmobileNo();
		String skypeId = pro.get(0).getSkypeId();
		notificationService.sendScheduleMail(interviewSchedule, mobileNo, altMobileNo, skypeId);
		return interviewDetails;
	}
	
	public InterviewDetails enrichInterviewDetailsUpdate(InterviewDetails interviewDetails2 ,InterviewSchedule interviewSchedule){
		List<Round> rounds1 = interviewDetails2.getRounds();
		int i=0;
		for (Round round : rounds1) {
		if(round.getInterviewSchedule().getRoundName().equals(interviewSchedule.getRoundName()))
			break;
		i++;
		}
		rounds1.remove(i);
		rounds1.add(i,new Round(interviewSchedule.getRoundName(), interviewSchedule, null));
		interviewDetails2.setRounds(rounds1);
		interviewDetails2.setInterviewerName(interviewSchedule.getInterviewerName());
		interviewDetails2.setCurrentPositionId(interviewSchedule.getJobcode());
		return interviewDetails2;
	}
	
	public InterviewDetails  createInterview(InterviewDetails interviewDetails){
			try {
				interviewDetailsRepository.scheduleInterview(interviewDetails);
				interviewSearchService.addInterviewDetailsIndex(interviewDetails);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		return interviewDetails;
	}
	
	public InterviewDetails getInterview(String interviewerId) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		return mongoOperations.findById(interviewerId, InterviewDetails.class);
	}
	
	public List<InterviewDetails> getInterviewByInterviewer(String interviewerEmail) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("scheduledInterviewersEmails").all(interviewerEmail));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		if(checkDetails!= null){
			for(InterviewDetails detail :checkDetails){
				if(detail.getRounds().size() > 0){
					int count = detail.getRounds().size()-1;
					detail.setInterviewDateTime(detail.getRounds().get(count).getInterviewSchedule().getInterviewDateTime());
				}
			}
			
		}
		return checkDetails;
	}
	
	
	public List<InterviewDetails> getInterviewByInterviewerAndJobCode(String jobCode) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("jobCode").regex(Pattern.compile(jobCode, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)).andOperator(Criteria.where("progress").ne("Not Initialized")));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	
	public List<InterviewDetails> getAll() {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		List<InterviewDetails> checkDetails = mongoOperations.findAll(InterviewDetails.class);
		return checkDetails;
	}
	
	public List<InterviewDetails> getInterviewByJobCode(String jobCode) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("positionId").regex(Pattern.compile(jobCode, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	public List<InterviewDetails> getInterviewByCandidateId(String candidateId) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("candidateEmail").regex(Pattern.compile(candidateId, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	public List<InterviewDetails> getInterviewByClient(String client) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("clientName").regex(Pattern.compile(client, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	public List<InterviewDetails> getInterviewByProgress(String progress) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("progress").regex(Pattern.compile(progress, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	public List<InterviewDetails> getInterviewBySkill(String skill) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("candidateSkills").is(skill));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	public void updateInterviewDetails(InterviewDetails interviewDetails) {
		interviewDetailsRepository.updateinterviewDetails(interviewDetails);
	}
	
	public List<InterviewDetails> getInterviewByDesignation(String designation) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("designation").is(designation));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	public List<InterviewDetails> getInterviewByinterviewId(String interviewId) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(interviewId));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	public InterviewDetails enrichInterviewDetails(InterviewDetails interviewDetails2 ,InterviewSchedule interviewSchedule){
		if(interviewDetails2.getRounds()!=null && interviewDetails2.getRounds().size()>0) {
			int size = interviewDetails2.getRounds().size();
			List<Round> rounds = interviewDetails2.getRounds();
			interviewSchedule.setRoundStatus( interviewSchedule.getRoundName() + " Scheduled");
			ArrayList<String> emailIds =  new ArrayList<String>();
			interviewDetails2.setScheduledInterviewersEmails(emailIds);
			for (Round round : rounds) {
					interviewDetails2.getScheduledInterviewersEmails().add(round.getInterviewSchedule().getEmailIdInterviewer());	
				}
			
			interviewSchedule.setCreatedScheduleDate(new Date());
			rounds.add(size,new Round(interviewSchedule.getRoundName(), interviewSchedule, null));
		
			interviewDetails2.setProgress( interviewSchedule.getRoundName() + " Scheduled");
			interviewDetails2.setInterviewerEmail(interviewSchedule.getEmailIdInterviewer());
			interviewDetails2.setInterviewerName(interviewSchedule.getInterviewerName());
			interviewDetails2.setRounds(rounds);
			interviewDetails2.setCurrentPositionId(interviewSchedule.getJobcode());
			interviewDetails2.setJobCode(interviewSchedule.getJobcode());
			interviewDetails2.setJobDescription(interviewSchedule.getJobDescription());
			interviewDetails2.setRequisitionId(interviewSchedule.getRequisitionId());
			interviewDetails2.setRoundName(interviewSchedule.getRoundName());
			interviewDetails2.getScheduledInterviewersEmails().add(interviewSchedule.getEmailIdInterviewer());
			interviewDetails2.setInterviewDateTime(interviewSchedule.getInterviewDateTime());

		}else{
			int i=0;
			List<Round> rounds = new ArrayList<Round>();
			interviewSchedule.setRoundStatus( interviewSchedule.getRoundName() + " Scheduled");
			interviewSchedule.setCreatedScheduleDate(new Date());
			rounds.add(i,new Round(interviewSchedule.getRoundName(), interviewSchedule, null));
			interviewDetails2.setInterviewerEmail(interviewSchedule.getEmailIdInterviewer());
			interviewDetails2.setInterviewerName(interviewSchedule.getInterviewerName());
			interviewDetails2.setProgress(interviewSchedule.getRoundName() + " Scheduled");
			interviewDetails2.setRounds(rounds);
			interviewDetails2.setCurrentPositionId(interviewSchedule.getJobcode());
			interviewDetails2.setJobCode(interviewSchedule.getJobcode());
			interviewDetails2.setJobDescription(interviewSchedule.getJobDescription());
			interviewDetails2.setRequisitionId(interviewSchedule.getRequisitionId());
			interviewDetails2.setRoundName(interviewSchedule.getRoundName());
			interviewDetails2.setInterviewDateTime(interviewSchedule.getInterviewDateTime());
			try {
				ArrayList<String> emailIds =  new ArrayList<String>();
				emailIds.add(interviewSchedule.getEmailIdInterviewer());
				interviewDetails2.setScheduledInterviewersEmails(emailIds);
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		return interviewDetails2;
	}
	
	public InterviewDetails enrichInterviewDetails2(InterviewDetails interviewDetails2, InterviewFeedback interviewFeedback){
		for (int j=0;j<interviewDetails2.getRounds().size();j++) {
			if(interviewDetails2.getRounds().get(j).getInterviewFeedback() == null &&
					interviewDetails2.getRounds().get(j).getInterviewSchedule().getEmailIdInterviewer().equals(interviewFeedback.getInterviewerEmail()))
			{
				interviewDetails2.getRounds().get(j).setInterviewFeedback(interviewFeedback);
				interviewDetails2.getRounds().get(j).getInterviewSchedule().setIsFeedBackSubmitted(true);
				interviewDetails2.getRounds().get(j).getInterviewSchedule().setRoundStatus(interviewFeedback.getRoundName() + " Feedback Submitted");
				interviewDetails2.setProgress(interviewFeedback.getRoundName() + " Feedback Submitted");
				interviewDetails2.setStatus(interviewFeedback.getStatus());
				//interviewDetails2.getScheduledInterviewersEmails().remove(interviewFeedback.getInterviewerEmail());
				break;
			}	
		}
	return interviewDetails2;
}
	
	@Override
	public void cancelInterviewSchedule(String candidateId,String roundName) throws Exception{
		
		InterviewDetails interviewDetails2 = interviewDetailsRepository.getInterviewDetailsById(candidateId);
		List<Round> rounds1 = interviewDetails2.getRounds();
		int i=0;
		for (Round round : rounds1) {
		if(round.getInterviewSchedule().getRoundName().equals(roundName))
			break;
		i++;
		}
		InterviewSchedule interviewSchedule = rounds1.get(i).getInterviewSchedule();
		rounds1.remove(i);
	
		interviewDetails2.setProgress( interviewSchedule.getRoundName() + " Cancelled");
		interviewDetails2.setRounds(rounds1);
		if(rounds1 != null && rounds1.size()>0){
			int count = rounds1.size()-1;
			interviewDetails2.setInterviewDateTime(rounds1.get(count).getInterviewSchedule().getInterviewDateTime());
		}
		interviewDetailsRepository.scheduleInterview(interviewDetails2);
		interviewSearchService.addInterviewDetailsIndex(interviewDetails2);
		
		List<Profile> pro = profileService.getProfileByEmailId(candidateId);
		pro.get(0).setStatus(interviewDetails2.getProgress());
		profileService.updateCandidateStatus(pro.get(0).getEmailId(), interviewDetails2.getProgress());
		profileSearchService.updateProfileIndex(pro.get(0));
		List<UserInfo> userInfo = userService.retrieveUserById(SecurityContextHolder.getContext().getAuthentication().getName());
		notificationService.sendCancelMail(interviewSchedule,userInfo.get(0).getName());
	}
}
