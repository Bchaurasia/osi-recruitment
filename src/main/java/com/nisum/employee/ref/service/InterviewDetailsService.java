package com.nisum.employee.ref.service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.InterviewDetails;
import com.nisum.employee.ref.domain.InterviewFeedback;
import com.nisum.employee.ref.domain.InterviewSchedule;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.domain.Round;
import com.nisum.employee.ref.repository.InterviewDetailsRepository;


@Service
public class InterviewDetailsService implements IInterviewDetailsService{
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private InterviewDetailsRepository interviewDetailsRepository;
	
	@Autowired
	private INotificationService notificationService;
	
	@Autowired
	private ProfileService profileService;
	
	@Override
	public InterviewDetails  saveFeedback(InterviewFeedback interviewFeedback) throws MessagingException{
		InterviewDetails interviewDetails = null;
		InterviewDetails interviewDetails2 = interviewDetailsRepository.getInterviewDetailsById(interviewFeedback.getCandidateId());
		if(interviewDetails2.getInterviewerId() != null){
			interviewDetails = enrichInterviewDetails2(interviewDetails2, interviewFeedback);
			interviewDetailsRepository.scheduleInterview(interviewDetails);
			notificationService.sendFeedbackMail(interviewFeedback);
			return interviewDetails;
		}
		return null;
	}
	@Override
	public InterviewDetails  scheduleInterview(InterviewSchedule interviewSchedule) throws Exception{
		InterviewDetails interviewDetails = null;
		InterviewDetails interviewDetails2 = interviewDetailsRepository.getInterviewDetailsById(interviewSchedule.getCandidateId());
		interviewDetails = enrichInterviewDetails(interviewDetails2 ,interviewSchedule);
		interviewDetailsRepository.scheduleInterview(interviewDetails);
		List<Profile> pro = profileService.retrieveCandidateDetails(interviewSchedule.getCandidateId());
		String mobileNo = pro.get(0).getMobileNo();
		String altMobileNo = pro.get(0).getAltmobileNo();
		String skypeId = pro.get(0).getSkypeId();
		notificationService.sendScheduleMail(interviewSchedule, mobileNo, altMobileNo, skypeId);
		return interviewDetails;
	}
	
	public InterviewDetails  scheduleInterview1(InterviewSchedule interviewSchedule) throws Exception{
		InterviewDetails interviewDetails = null;
		InterviewDetails interviewDetails2 = interviewDetailsRepository.getInterviewDetailsById(interviewSchedule.getCandidateId());
		interviewDetails = enrichInterviewDetailsUpdate(interviewDetails2 ,interviewSchedule);
		interviewDetailsRepository.scheduleInterview(interviewDetails);
		List<Profile> pro = profileService.retrieveCandidateDetails(interviewSchedule.getCandidateId());
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
		interviewDetails2.setCurrentPositionId(interviewSchedule.getJobcode());
		return interviewDetails2;
	}
	@Override
	public InterviewDetails  createInterview(InterviewDetails interviewDetails){
			interviewDetailsRepository.scheduleInterview(interviewDetails);
		return interviewDetails;
	}
	@Override
	public List<InterviewDetails> getInterview(String interviewerId) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("interviewerId").regex(Pattern.compile(interviewerId, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	@Override
	public List<InterviewDetails> getInterviewByInterviewer(String interviewerEmail) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("interviewerEmail").regex(Pattern.compile(interviewerEmail, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	
	public List<InterviewDetails> getInterviewByInterviewerAndJobCode(String interviewerEmail,String jobCode) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("interviewerEmail").regex(Pattern.compile(interviewerEmail, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)).and("currentPositionId").regex(Pattern.compile(jobCode, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	
	@Override
	public List<InterviewDetails> getAll() {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		List<InterviewDetails> checkDetails = mongoOperations.findAll(InterviewDetails.class, "InterviewDetails");
		return checkDetails;
	}
	@Override
	public List<InterviewDetails> getInterviewByJobCode(String jobCode) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("positionId").regex(Pattern.compile(jobCode, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	@Override
	public List<InterviewDetails> getInterviewByCandidateId(String candidateId) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("candidateEmail").regex(Pattern.compile(candidateId, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	@Override
	public List<InterviewDetails> getInterviewByClient(String client) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("clientName").regex(Pattern.compile(client, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	@Override
	public List<InterviewDetails> getInterviewByProgress(String progress) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("progress").regex(Pattern.compile(progress, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	@Override
	public List<InterviewDetails> getInterviewBySkill(String skill) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("candidateSkills").is(skill));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	@Override
	public void updateInterviewDetails(InterviewDetails interviewDetails) {
		interviewDetailsRepository.updateinterviewDetails(interviewDetails);
	}
	@Override
	public List<InterviewDetails> getInterviewByDesignation(String designation) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("designation").is(designation));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	@Override
	public List<InterviewDetails> getInterviewByinterviewId(String interviewId) {
		MongoOperations mongoOperations = (MongoOperations) mongoTemplate;
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(interviewId));
		List<InterviewDetails> checkDetails = mongoOperations.find(query, InterviewDetails.class);
		return checkDetails;
	}
	@Override
	public InterviewDetails enrichInterviewDetails(InterviewDetails interviewDetails2 ,InterviewSchedule interviewSchedule){
		if(interviewDetails2.getRounds()!=null) {
			int size = interviewDetails2.getRounds().size();
			if(size!=0){
			List<Round> rounds = interviewDetails2.getRounds();
			rounds.add(size,new Round(interviewSchedule.getRoundName(), interviewSchedule, null));
			interviewDetails2.setProgress( interviewSchedule.getRoundName() + " Scheduled");
			interviewDetails2.setInterviewerEmail(interviewDetails2.getInterviewerEmail());
			interviewDetails2.setRounds(rounds);
			interviewDetails2.setCurrentPositionId(interviewSchedule.getJobcode());
		}
		}else{
			int i=0;
			List<Round> rounds = new ArrayList<Round>();
			rounds.add(i,new Round(interviewSchedule.getRoundName(), interviewSchedule, null));
			interviewDetails2.setInterviewerEmail(interviewSchedule.getEmailIdInterviewer());
			//interviewDetails2.setInterviewerId(interviewSchedule.getCandidateId()+"_"+interviewSchedule.getJobcode());
			interviewDetails2.setProgress(interviewSchedule.getRoundName() + " Scheduled");
			interviewDetails2.setRounds(rounds);
			interviewDetails2.setCurrentPositionId(interviewSchedule.getJobcode());
		}
		return interviewDetails2;
	}
	@Override
	public InterviewDetails enrichInterviewDetails2(InterviewDetails interviewDetails2, InterviewFeedback interviewFeedback){
		int i = 0;
		if(interviewDetails2.getRounds().get(i).getInterviewFeedback()==null){
		InterviewSchedule is = interviewDetails2.getRounds().get(i).getInterviewSchedule();
		List<Round> rounds = new ArrayList<Round>();
		rounds.add(i,new Round(interviewFeedback.getRoundName(), is, interviewFeedback));
		interviewDetails2.setCandidateEmail(interviewFeedback.getCandidateId());
		interviewDetails2.setInterviewerEmail(interviewFeedback.getInterviewerEmail());
		//interviewDetails2.setInterviewerId(interviewFeedback.getCandidateId()+"_"+interviewFeedback.getJobcode());
		interviewDetails2.setProgress(interviewFeedback.getRoundName() + " Feedback Submitted");
		interviewDetails2.setRounds(rounds);
		}else{
			int size = interviewDetails2.getRounds().size();
			size--;
			InterviewSchedule is = interviewDetails2.getRounds().get(size).getInterviewSchedule();
			List<Round> rounds = interviewDetails2.getRounds();
			rounds.set(size,new Round(interviewFeedback.getRoundName(), is, interviewFeedback));
			interviewDetails2.setCandidateEmail(interviewFeedback.getCandidateId());
			interviewDetails2.setInterviewerEmail(interviewFeedback.getInterviewerEmail());
			//interviewDetails2.setInterviewerId(interviewFeedback.getCandidateId()+"_"+interviewFeedback.getJobcode());
			interviewDetails2.setProgress(interviewFeedback.getRoundName() + " Feedback Submitted");
			interviewDetails2.setRounds(rounds);
		}
		return interviewDetails2;
	}
}
