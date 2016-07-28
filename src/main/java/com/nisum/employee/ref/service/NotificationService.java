package com.nisum.employee.ref.service;

import java.io.File;
import java.io.StringWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.TimeZone;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.activation.MailcapCommandMap;
import javax.activation.MimetypesFileTypeMap;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nisum.employee.ref.domain.InterviewFeedback;
import com.nisum.employee.ref.domain.InterviewSchedule;
import com.nisum.employee.ref.domain.Offer;
import com.nisum.employee.ref.domain.Position;
import com.nisum.employee.ref.domain.Profile;
import com.nisum.employee.ref.domain.Requisition;
import com.nisum.employee.ref.domain.RequisitionApproverDetails;
import com.nisum.employee.ref.domain.UserInfo;
import com.nisum.employee.ref.domain.UserNotification;

@Service
public class NotificationService {

	private static final String CANDIDATE_APPROVAL_REQUEST = "Candidate Approval Request";
	private static final String DD_MMM_YYYY_HH_MM = "dd-MMM-yyyy HH:mm";
	private static final String YYYY_MM_DD_T_HH_MM_SS_SSS_Z = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
	private static final String FILE_RESOURCE_LOADER_PATH = "file.resource.loader.path";
	private static final String YOUR_INTERVIEW_FOR = " - Your Interview For ";
	private static final String YOU_NEED_TO_TAKE_INTERVIEW_OF = " - You Need To Take Interview Of ";
	private static final String SKYPE_ID = "skypeId";
	private static final String OSI_TECHNOLOGIES = "OSI Recruitment Portal";

	private static final String LOCATION = "location";
	private static final String ADDRESS = "address";
	private static final String ALTMOBILE_NO = "altmobileNo";
	private static final String MOBILE_NO = "mobileNo";
	private static final String INTERVIEW_DATE_TIME = "interviewDateTime";
	private static final String TYPE_OF_INTERVIEW = "typeOfInterview";
	private static final String CANDIDATE_NAME = "candidateName";
	private static final String HR_NAME = "hr_name";
	private static final String HR_CONTACT_DETAILS = "hr_contactNo";
	private static final String HR_EMAIL = "hr_emailId";

	private static final String ROUND_NAME = "roundName";
	private static final String INAME = "iname";
	private static final String CNAME = "cname";
	private static final String JOBCODE = "jobcode";
	private static final String TEXT_HTML = "text/html";
	private static final String OF = " of ";
	private static final String FEEDBACK_SUBMITTED_FOR = "Feedback Submitted For ";
	private static final String RATING_LIST = "ratingList";
	private static final String IMPROVEMENTS = "improvements";
	private static final String STRENGTHS = "strengths";

	private static final String DOMAIN_SKILL_SIZE = "domainSkillSize";
	private static final String DOMAIN_LIST = "domainList";
	private static final String COMMUNICATION_SKILLS = "communicationSkills";
	private static final String CONSULTING_AND_ARTICULATION_SKILLS = "consultingAndArticulationSkills";
	private static final String SELF_LEARNING_AND_INITIATIVE = "selfLearningAndInitiative";
	private static final String CUSTOMER_ORIENTATION = "customerOrientation";
	private static final String BUSINESS_ATTITUDE = "businessAttitude";
	private static final String FLEXIBILITY = "flexibility";
	private static final String TEAM_WORK = "teamWork";
	private static final String ONSITE_SUITABILITY = "onsiteSuitability";

	private static final String ROLE_HR = "ROLE_HR";
	private static final String TRUE = "true";
	private static final String PORT_587 = "587";
	private static final String MAIL_SMTP_PORT = "mail.smtp.port";
	private static final String MAIL_SMTP_HOST = "mail.smtp.host";
	private static final String MAIL_SMTP_STARTTLS_ENABLE = "mail.smtp.starttls.enable";
	private static final String MAIL_SMTP_AUTH = "mail.smtp.auth";

	private static final String POSITION = "position";
	private static final String OSI_TECHNOLOGIES1 = "From The Desk Of HR : Referal Drive For ";
	private static final String JOB_DESCRIPTION = "job_description";
	private static final String SKILLS = "skills";
	private static final String OTHER_SKILLS = "other_skills";
	private static final String MIN_EXP = "min_exp";
	private static final String MAX_EXP = "max_exp";
	private static final String TOTAL_EXP = "total_exp";
	private static final String QUALIFICATION = "qualification";
	private static final String TITLE = "title";
	private static final String CREATED_BY_USER = "created_by_user";
	private static final String SUBMITTED_BY_USER = "submittedBy";
	private static final String UPDATED_BY = "updatedBy";
	private static final String UPDATED_BY_NAME = "updatedByName";

	@Value("${mail.fromAddress}")
	private String from;
	@Value("${mail.username}")
	private String username;
	@Value("${mail.password}")
	private String password;
	@Value("${mail.host}")
	private String host;

	@Value("${mail.toAddress}")
	private String to;

	@Value("${SRC_CANDIDATE_VM}")
	private String SRC_CANDIDATE_VM;
	@Value("${SRC_INTERVIEWER_VM}")
	private String SRC_INTERVIEWER_VM;
	@Value("${SRC_FEEDBACK_HR_VM}")
	private String SRC_FEEDBACK_HR_VM;
	@Value("${SRC_JOB_REQUISITION_VM}")
	private String SRC_JOB_REQUISITION_VM;
	@Value("${SRC_INTERVIEW_FEEDBACK_FORM}")
	private String SRC_INTERVIEW_FEEDBACK_FORM;
	@Value("${SRC_CANCELINTERVIEW_VM}")
	private String SRC_CANCELINTERVIEW_VM;
	@Value("${SRC_POST_REF_JOB_VM}")
	private String SRC_POST_REF_JOB;
	@Value("${SRC_APPROVE_REQUISITION_VM}")
	private String SRC_APPROVE_REQUISITION_VM;
	@Value("${SRC_OFFER_TO_BE_APPROVED_VM}")
	private String SRC_OFFER_TO_BE_APPROVED_VM;
	@Value("${SRC_OFFER_VM}")
	private String SRC_OFFER_VM;
	@Value("${SRC_PROFILE_VM}")
	private String SRC_PROFILE_VM;
	@Value("${SRC_PROFILE_APPROVED_VM}")
	private String SRC_PROFILE_APPROVED_VM;
	@Value("${SRC_POSITION_UPDATE}")
	private String SRC_POSITION_UPDATE;
	@Value("${SRC_OFFER_INFO_TO_HR}")
	private String SRC_OFFER_INFO_TO_HR;
	@Value("${SRC_OFFER_INFO_TO_REFERRER}")
	private String SRC_OFFER_INFO_TO_REFERRER;
	@Value("${SRC_PROFILE_UPDATED_VM}")
	private String SRC_PROFILE_UPDATED_VM;
	
	@Autowired
	IProfileService profileService;

	@Autowired
	UserService userService;

	@Autowired
	UserNotificationService userNotificationService;

	public String sendScheduleMail(InterviewSchedule interviewSchedule, String mobileNo, String altMobileNo,
			String skypeId) throws Exception {

		try {
			UserNotification userNotification = new UserNotification();
			userNotification.setUserId(interviewSchedule.getEmailIdInterviewer());
			userNotification.setMessage("Take interview of " + interviewSchedule.getCandidateName() + " for "
					+ interviewSchedule.getRoundName());
			userNotification.setRead("No");
			userNotificationService.createNotification(userNotification);
		} catch (Exception e) {
			System.out.println(e);
		}

		String to = interviewSchedule.getCandidateId();
		String toInterviewer = interviewSchedule.getEmailIdInterviewer();
		Date date = change12HrsTo24HrsFormat(interviewSchedule.getInterviewDateTime());

		Session session = getSession();

		VelocityContext context = getVelocityContext(interviewSchedule.getCandidateName(),
				interviewSchedule.getJobcode(), interviewSchedule.getInterviewerName(),
				interviewSchedule.getRoundName());
		context.put(TYPE_OF_INTERVIEW, interviewSchedule.getTypeOfInterview());
		context.put(INTERVIEW_DATE_TIME, interviewSchedule.getInterviewDateTime());
		context.put(MOBILE_NO, mobileNo);
		context.put(ALTMOBILE_NO, altMobileNo);
		context.put(LOCATION, interviewSchedule.getInterviewLocation());
		context.put(JOB_DESCRIPTION, interviewSchedule.getJobDescription());
		context.put(ADDRESS, interviewSchedule.getInterviewAddress());
		context.put(HR_NAME, interviewSchedule.getHrName());
		context.put(HR_CONTACT_DETAILS, interviewSchedule.getHrContactNo());
		context.put(HR_EMAIL, interviewSchedule.getHrEmailId());

		Template candidateTemplate = getVelocityTemplate(SRC_CANDIDATE_VM);

		StringWriter writer = new StringWriter();
		candidateTemplate.merge(context, writer);

		VelocityContext context2 = getVelocityContext(interviewSchedule.getCandidateName(),
				interviewSchedule.getJobcode(), interviewSchedule.getInterviewerName(),
				interviewSchedule.getRoundName());
		context2.put(MOBILE_NO, mobileNo);
		context2.put(ALTMOBILE_NO, altMobileNo);
		context2.put(TYPE_OF_INTERVIEW, interviewSchedule.getTypeOfInterview());
		context2.put(INTERVIEW_DATE_TIME, interviewSchedule.getInterviewDateTime());
		context2.put(SKYPE_ID, skypeId);

		Template interviewerTemplate = getVelocityTemplate(SRC_INTERVIEWER_VM);

		StringWriter writer2 = new StringWriter();
		interviewerTemplate.merge(context2, writer2);

		// register the text/calendar mime type
		MimetypesFileTypeMap mimetypes = (MimetypesFileTypeMap) MimetypesFileTypeMap.getDefaultFileTypeMap();
		mimetypes.addMimeTypes("text/calendar ics ICS");

		// register the handling of text/calendar mime type
		MailcapCommandMap mailcap = (MailcapCommandMap) MailcapCommandMap.getDefaultCommandMap();
		mailcap.addMailcap("text/calendar;; x-java-content-handler=com.sun.mail.handlers.text_plain");

		// --- Set Interviewer Email Content ---
		Message msgInterviewer = getMessage();
		// msgInterviewer.setFrom(new InternetAddress(from));
		msgInterviewer.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toInterviewer));
		msgInterviewer
				.setSubject(OSI_TECHNOLOGIES + YOU_NEED_TO_TAKE_INTERVIEW_OF + interviewSchedule.getCandidateName());
		BodyPart messageBodyPart = new MimeBodyPart();
		messageBodyPart.setContent(writer2.toString(), TEXT_HTML);
		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart);
		BodyPart resumeBodyPart = new MimeBodyPart();

		BodyPart calendarPart = buildCalendarPart(date);
		multipart.addBodyPart(calendarPart);

		String[] resume = profileService.getResume(interviewSchedule.getCandidateId());
		DataSource source = new FileDataSource(resume[0]);
		resumeBodyPart.setDataHandler(new DataHandler(source));
		resumeBodyPart.setFileName(interviewSchedule.getCandidateName() + "_" + resume[1]);

		// ************************************

		// code to attach interview feedback in Interview's mail

		String absolutePath = new File(Thread.currentThread().getContextClassLoader().getResource("").getFile())
				.getPath();
		String filename = absolutePath + "/vm/" + SRC_INTERVIEW_FEEDBACK_FORM;

		DataSource feedbackForm = new FileDataSource(filename);
		BodyPart feedbackBodyPart = new MimeBodyPart();
		feedbackBodyPart.setDataHandler(new DataHandler(feedbackForm));
		feedbackBodyPart.setFileName("OSI_Interview_Feedback_Form.doc");

		// ************************************

		multipart.addBodyPart(resumeBodyPart);
		multipart.addBodyPart(feedbackBodyPart);
		msgInterviewer.setContent(multipart);

		// --- Set Candidate Content ---
		Message msgCandidate = getMessage();
		msgCandidate.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
		msgCandidate.setSubject(
				OSI_TECHNOLOGIES + YOUR_INTERVIEW_FOR + interviewSchedule.getRoundName() + " Is Scheduled.");
		msgCandidate.setContent(writer.toString(), TEXT_HTML);

		BodyPart candidateMsgBodyPart = new MimeBodyPart();
		candidateMsgBodyPart.setContent(writer.toString(), TEXT_HTML);
		Multipart candiateMultipart = new MimeMultipart();
		candiateMultipart.addBodyPart(candidateMsgBodyPart);
		BodyPart calendarPart2 = buildCalendarPart(date);
		candiateMultipart.addBodyPart(calendarPart2);
		msgCandidate.setContent(candiateMultipart);

		// --- Send Mails ---
		Transport.send(msgInterviewer);
		Transport.send(msgCandidate);

		return "Mails Sent Successfully!";
	}

	// define somewhere the icalendar date format
	private static SimpleDateFormat iCalendarDateFormat = new SimpleDateFormat("yyyyMMdd'T'HHmm'00'");

	// private BodyPart buildCalendarPart(String organizer,String candiate,Date
	// time ) throws Exception {
	private BodyPart buildCalendarPart(Date date) throws Exception {
		BodyPart calendarPart = new MimeBodyPart();

		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.setTimeZone(TimeZone.getTimeZone("GMT"));
		iCalendarDateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
		cal.add(Calendar.DAY_OF_MONTH, 1);
		cal.add(Calendar.DATE, -1);
		Date start = cal.getTime();
		cal.add(Calendar.HOUR_OF_DAY, 1);
		Date end = cal.getTime();

		// check the icalendar spec in order to build a more complicated meeting
		// request
		String calendarContent = "BEGIN:VCALENDAR\n" + "METHOD:REQUEST\n" + "PRODID: BCP - Meeting\n" + "VERSION:2.0\n"
				+ "BEGIN:VEVENT\n" + "DTSTAMP:" + iCalendarDateFormat.format(start) + "\n" + "DTSTART:"
				+ iCalendarDateFormat.format(start) + "\n" + "DTEND:" + iCalendarDateFormat.format(end) + "\n"
				+ "SUMMARY:Portal Request\n" + "UID:324\n"
				+ "ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:MAILTO:ositechportal@gmail.com\n"
				+ "ORGANIZER:MAILTO:" + "ositechportal@gmail.com" + "\n" + "LOCATION:OSI Tech Office\n"
				+ "DESCRIPTION:learn some stuff\n" + "SEQUENCE:0\n" + "PRIORITY:5\n" + "CLASS:PUBLIC\n"
				+ "STATUS:CONFIRMED\n" + "TRANSP:OPAQUE\n" + "BEGIN:VALARM\n" + "ACTION:DISPLAY\n"
				+ "DESCRIPTION:REMINDER\n" + "TRIGGER;RELATED=START:-PT00H15M00S\n" + "END:VALARM\n" + "END:VEVENT\n"
				+ "END:VCALENDAR";

		calendarPart.addHeader("Content-Class", "urn:content-classes:calendarmessage");
		calendarPart.setContent(calendarContent, "text/calendar;method=CANCEL");

		return calendarPart;
	}

	private Date change12HrsTo24HrsFormat(String dateTime) {
		// Format of the date defined in the input String
		DateFormat df = new SimpleDateFormat("MM/dd/yyyy hh:mm aa");
		// Desired format: 24 hour format: Change the pattern as per the need
		DateFormat outputformat = new SimpleDateFormat("MM/dd/yyyy HH:mm");
		Date date = null;
		String output = null;
		try {
			// Converting the input String to Date
			date = df.parse(dateTime);
			// Changing the format of date and storing it in String
			output = outputformat.format(date);
			// Displaying the date
			// System.out.println(output);

			// Convert 24Hrs String to Date Object
			DateFormat format = new SimpleDateFormat("MM/dd/yyyy HH:mm");
			date = format.parse(output);
			// System.out.println(date);

		} catch (ParseException pe) {
			pe.printStackTrace();
		}
		return date;
	}

	public void sendFeedbackMail(InterviewFeedback interviewFeedback) throws MessagingException {

		List<UserInfo> info = userService.retrieveUserByRole(ROLE_HR);
		List<String> HR_Emails = new ArrayList<String>();

		for (UserInfo ui : info) {
			HR_Emails.add(ui.getEmailId());
		}

		VelocityContext context = getVelocityContext(interviewFeedback.getCandidateName(),
				interviewFeedback.getJobcode(), interviewFeedback.getInterviewerName(),
				interviewFeedback.getRoundName());

		context.put(DOMAIN_SKILL_SIZE, interviewFeedback.getDomainSkills().size());
		context.put(DOMAIN_LIST, interviewFeedback.getDomainSkills());
		context.put(COMMUNICATION_SKILLS, interviewFeedback.getCommunicationSkills());
		context.put(CONSULTING_AND_ARTICULATION_SKILLS, interviewFeedback.getConsultingAndArticulationSkills());
		context.put(SELF_LEARNING_AND_INITIATIVE, interviewFeedback.getSelfLearningAndInitiative());
		context.put(CUSTOMER_ORIENTATION, interviewFeedback.getCustomerOrientation());
		context.put(BUSINESS_ATTITUDE, interviewFeedback.getBusinessAttitude());
		context.put(FLEXIBILITY, interviewFeedback.getFlexibility());
		context.put(TEAM_WORK, interviewFeedback.getTeamWork());
		context.put(ONSITE_SUITABILITY, interviewFeedback.getOnsiteSuitability());
		context.put(STRENGTHS, interviewFeedback.getStrengths());
		context.put(IMPROVEMENTS, interviewFeedback.getImprovement());
		context.put(SKILLS, interviewFeedback.getAdditionalSkills());
		context.put(RATING_LIST, interviewFeedback.getRateSkills());

		Template candidateTemplate = getVelocityTemplate(SRC_FEEDBACK_HR_VM);

		StringWriter writer = new StringWriter();
		candidateTemplate.merge(context, writer);

		Message message = getMessage();
		message.setSubject(
				FEEDBACK_SUBMITTED_FOR + interviewFeedback.getRoundName() + OF + interviewFeedback.getCandidateName());
		message.setContent(writer.toString(), TEXT_HTML);

		for (String obj : HR_Emails) {
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(obj));
			Transport.send(message);
		}
	}

	private Template getVelocityTemplate(String templetName) {
		Properties prop = new Properties();
		String absolutePath = new File(Thread.currentThread().getContextClassLoader().getResource("").getFile())
				.getPath();
		prop.put(FILE_RESOURCE_LOADER_PATH, absolutePath + "/vm");
		Velocity.init(prop);
		return Velocity.getTemplate(templetName);
	}

	private VelocityContext getVelocityContext(String cname, String jobcode, String iname, String roundName) {
		VelocityContext context = new VelocityContext();
		context.put(CNAME, cname);
		context.put(JOBCODE, jobcode);
		context.put(INAME, iname);
		context.put(ROUND_NAME, roundName);
		return context;
	}

	private Message getMessage() throws AddressException, MessagingException {
		Session session = getSession();
		Message message = new MimeMessage(session);
		message.setFrom(new InternetAddress(from));
		return message;
	}

	private Session getSession() {
		Properties props = new Properties();
		props.put(MAIL_SMTP_AUTH, TRUE);
		props.put(MAIL_SMTP_STARTTLS_ENABLE, TRUE);
		props.put(MAIL_SMTP_HOST, host);
		props.put(MAIL_SMTP_PORT, PORT_587);

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
		return session;
	}

	public void sendJobRequisitionNotification(RequisitionApproverDetails requisitionApproverDetails)
			throws AddressException, MessagingException, ResourceNotFoundException, ParseErrorException,
			MethodInvocationException {

		String userId = requisitionApproverDetails.getApproverEmailId();
		String message = "Approve the Requisition";
		String readStatus = "No";
		updateUserNotification(userId, message, readStatus);

		VelocityEngine engine = new VelocityEngine();
		engine.init();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_JOB_REQUISITION_VM);

		VelocityContext context = new VelocityContext();
		context.put("approverName", requisitionApproverDetails.getApproverName());

		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		// message1.setFrom(new InternetAddress(from));
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(userId));
		message1.setSubject(OSI_TECHNOLOGIES + " Please Approve the Requisition "
				+ requisitionApproverDetails.getJobRequisitionId());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);
	}

	// offer Notifications

	public void sendOfferApprovalNotification(Offer offer) throws AddressException, MessagingException,
			ResourceNotFoundException, ParseErrorException, MethodInvocationException {

		String userId = offer.getApproval().getEmailId();
		String message = "Approve the Offer";
		String readStatus = "No";
		updateUserNotification(userId, message, readStatus);

		VelocityEngine engine = new VelocityEngine();
		engine.init();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_OFFER_TO_BE_APPROVED_VM);

		VelocityContext context = new VelocityContext();
		context.put("approverName", offer.getApproval().getName());

		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(userId));
		message1.setSubject(
				CANDIDATE_APPROVAL_REQUEST + " : " + offer.getApprovedPositions() + " : " + offer.getCandidateName());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);
	}

	public void approvedNotification(Offer offer) throws AddressException, MessagingException,
			ResourceNotFoundException, ParseErrorException, MethodInvocationException {

		String userId = offer.getRecruiter().getEmailId();
		String message = "Approve the Offer";
		String readStatus = "No";
		updateUserNotification(userId, message, readStatus);

		VelocityEngine engine = new VelocityEngine();
		engine.init();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_OFFER_VM);

		VelocityContext context = new VelocityContext();
		context.put("recruiter", offer.getRecruiter().getName());
		context.put("approverName", offer.getApproval().getName());
		context.put("offerStatus", offer.getOfferStatus());

		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(userId));
		message1.setSubject(
				CANDIDATE_APPROVAL_REQUEST + " : " + offer.getCandidateName() + " is selected for Designation :" + offer.getOrgGrade().getDesignation().getName());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);
	}

	public void OfferedCandidateNotificationToReferredBy(Offer offer,Profile profile) throws AddressException, MessagingException,
			ResourceNotFoundException, ParseErrorException, MethodInvocationException {
		String ReferredByName = profile.getReferredByName();
		String ReferredByEmail = profile.getReferredBy();
		
		String userId = ReferredByEmail;
		String message = "Candidate Selected";
		String readStatus = "No";
		updateUserNotification(userId, message, readStatus);

		VelocityEngine engine = new VelocityEngine();
		engine.init();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_OFFER_INFO_TO_REFERRER);

		VelocityContext context = new VelocityContext();
		context.put("CandidateName", offer.getCandidateName());
		context.put("jobCode", offer.getJobcodeProfile());
		context.put("Manager", offer.getReportingManager().getName());
		context.put("JoiningDate", offer.getExpectedJoiningDate());
		context.put("location", offer.getWorkLocation());
		context.put("ReferredByName", ReferredByName);
		context.put("ReferredByEmail", ReferredByEmail);
		context.put("Designation", offer.getOrgGrade().getDesignation().getName());

		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(userId));
		message1.setSubject(
				"Candidate" + " : " + offer.getCandidateName() + " is selected for Designation :" + offer.getOrgGrade().getDesignation().getName());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);
	}

	public void OfferedCandidateNotificationToHRTeam(Offer offer,Profile profile) throws AddressException, MessagingException,
			ResourceNotFoundException, ParseErrorException, MethodInvocationException {

		String userId = offer.getRecruiter().getEmailId();
		String message = "Candidate Selected";
		String readStatus = "No";
		List<UserInfo> info = userService.retrieveUserByRole(ROLE_HR);
		List<String> HR_Emails = new ArrayList<String>();

		for (UserInfo ui : info) {
			HR_Emails.add(ui.getEmailId());
		}

		updateUserNotification(userId, message, readStatus);

		VelocityEngine engine = new VelocityEngine();
		engine.init();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_OFFER_INFO_TO_HR);

		String ReferredByName = profile.getReferredByName();
		String ReferredByEmail = profile.getReferredBy();
		
		VelocityContext context = new VelocityContext();
		context.put("CandidateName", offer.getCandidateName());
		context.put("jobCode", offer.getJobcodeProfile());
		context.put("Manager", offer.getReportingManager().getName());
		context.put("JoiningDate", offer.getExpectedJoiningDate());
		context.put("location", offer.getWorkLocation());
		context.put("ReferredByName", ReferredByName);
		context.put("ReferredByEmail", ReferredByEmail);
		context.put("Designation", offer.getOrgGrade().getDesignation().getName());

		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		String toMail = userId;
		for (String hrEMails : HR_Emails) {
			if (toMail == null || toMail == "")
				toMail = hrEMails;
			else
				toMail = toMail + "," + hrEMails;
		}
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail));
		message1.setSubject(
				"Candidate" + " : " + offer.getApprovedPositions() + " : " + offer.getCandidateName());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);
	}

	// End Offer
	public void sendJobRequisitionNotificationForFullyApproved(RequisitionApproverDetails requisitionApproverDetails)
			throws AddressException, MessagingException, ResourceNotFoundException, ParseErrorException,
			MethodInvocationException {

		String userId = requisitionApproverDetails.getApproverEmailId();
		String message = "Approve the Requisition";
		String readStatus = "No";
		updateUserNotification(userId, message, readStatus);

		VelocityEngine engine = new VelocityEngine();
		engine.init();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_APPROVE_REQUISITION_VM);

		VelocityContext context = new VelocityContext();
		context.put("approverName", requisitionApproverDetails.getApproverName());
		context.put("requisitionId", requisitionApproverDetails.getJobRequisitionId());
		context.put("noOfPositions", requisitionApproverDetails.getPosition());

		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message2 = getMessage();
		message2.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse(requisitionApproverDetails.getHrEmailId()));
		message2.setSubject(OSI_TECHNOLOGIES + " " + requisitionApproverDetails.getJobRequisitionId()
				+ " Requisition has been approved");
		message2.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message2);

		Message message3 = getMessage();
		message3.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse(requisitionApproverDetails.getRequisitionManagerEmail()));
		message3.setSubject(OSI_TECHNOLOGIES + " " + requisitionApproverDetails.getJobRequisitionId()
				+ " Requisition has been approved");
		message3.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message3);

	}

	public void sendRejectRequisitionNotification(RequisitionApproverDetails requisitionApproverDetails)
			throws AddressException, MessagingException, ResourceNotFoundException, ParseErrorException,
			MethodInvocationException {

		String userId = requisitionApproverDetails.getRequisitionManagerEmail();
		String message = requisitionApproverDetails.getApproverName() + " has Rejected The Requisition "
				+ requisitionApproverDetails.getJobRequisitionId();
		String readStatus = "No";
		updateUserNotification(userId, message, readStatus);

		VelocityEngine engine = new VelocityEngine();
		engine.init();

		// Template jobRequisitionTemplate =
		// getVelocityTemplate(SRC_JOB_REQUISITION_VM);

		VelocityContext context = new VelocityContext();
		context.put("approverName", requisitionApproverDetails.getApproverName());

		StringWriter writer = new StringWriter();
		// jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		message1.setFrom(new InternetAddress(from));
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(userId));
		message1.setSubject(requisitionApproverDetails.getApproverName() + " has Rejected The Requisition "
				+ requisitionApproverDetails.getJobRequisitionId());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);
	}

	private void updateUserNotification(String userId, String message, String readStatus) {
		UserNotification userNotification = new UserNotification();
		userNotification.setUserId(userId);
		userNotification.setMessage(message);
		userNotification.setRead(readStatus);
	}

	public String sendCancelMail(InterviewSchedule interviewSchedule) throws Exception {

		String to = interviewSchedule.getCandidateId();
		String toInterviewer = interviewSchedule.getEmailIdInterviewer();
		Date date = change12HrsTo24HrsFormat(interviewSchedule.getInterviewDateTime());
		List<UserInfo> info = userService.retrieveUserByRole(ROLE_HR);
		List<String> HR_Emails = new ArrayList<String>();

		for (UserInfo ui : info) {
			HR_Emails.add(ui.getEmailId());
		}
		Session session = getSession();

		VelocityContext context = getVelocityContext(interviewSchedule.getCandidateName(),
				interviewSchedule.getJobcode(), interviewSchedule.getInterviewerName(),
				interviewSchedule.getRoundName());
		context.put(CANDIDATE_NAME, interviewSchedule.getCandidateName());
		context.put(TYPE_OF_INTERVIEW, interviewSchedule.getTypeOfInterview());
		context.put(INTERVIEW_DATE_TIME, interviewSchedule.getInterviewDateTime());
		context.put(LOCATION, interviewSchedule.getInterviewLocation());
		Template cancelInterviewTemplate = getVelocityTemplate(SRC_CANCELINTERVIEW_VM);

		StringWriter writer = new StringWriter();
		cancelInterviewTemplate.merge(context, writer);

		// --- Set Interviewer Email Content ---
		Message cancelInterview = new MimeMessage(session);
		cancelInterview.setFrom(new InternetAddress(from));
		String toMail = interviewSchedule.getCandidateId() + "," + toInterviewer;
		for (String obj : HR_Emails) {
			if (toMail == null || toMail == "")
				toMail = obj;
			else
				toMail = toMail + "," + obj;
		}

		cancelInterview.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail));
		cancelInterview.setSubject(interviewSchedule.getRoundName() + " Interview Cancelled for :" + interviewSchedule.getCandidateName());
		
		BodyPart messageBodyPart = new MimeBodyPart();
		messageBodyPart.setContent(writer.toString(), TEXT_HTML);
		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart);
		cancelInterview.setContent(multipart);

		// --- Send Mails ---
		Transport.send(cancelInterview);
		return "Mails Sent Successfully!";
	}

	public String sendJobToReffarals(Position position, Requisition requisition) throws MessagingException {

		VelocityEngine engine = new VelocityEngine();
		engine.init();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_POST_REF_JOB);

		ArrayList<String> skills = position.getPrimarySkills();
		String formatedskills = skills.toString().replace(",", "-") // remove
																	// the
																	// commas
				.replace("[", "") // remove the right bracket
				.replace("]", "") // remove the left bracket
				.trim();

		List<String> qualifications1 = new ArrayList<String>();

		for (int i = 0; i < requisition.getQualifications().size(); i++) {
			String qualifications = requisition.getQualifications().get(i).getQualification();

			qualifications1.add(qualifications);
		}
		String formatedqualifications1 = qualifications1.toString().replace(",", "or") // remove
																						// the
																						// commas
				.replace("[", "") // remove the right bracket
				.replace("]", "") // remove the left bracket
				.trim();
		VelocityContext context = new VelocityContext();
		context.put(TITLE, requisition.getJobTitle());
		context.put(POSITION, position.getDesignation());
		context.put(CNAME, position.getClient());
		context.put(JOB_DESCRIPTION, position.getJobProfile());
		context.put(SKILLS, formatedskills);
		context.put(MIN_EXP, position.getMinExpYear());
		context.put(MAX_EXP, position.getMaxExpYear());
		context.put(LOCATION, position.getLocation());
		context.put(QUALIFICATION, formatedqualifications1);
		context.put(JOBCODE, position.getJobcode());
		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		message1.setFrom(new InternetAddress(from));
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
		message1.setSubject("OSI Internal Job Posting: " + position.getLocation() + " : " + position.getDesignation());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);

		return "Mails Sent Successfully!";

	}

	public String sendProfileCreatedNotification(Profile candidate) throws MessagingException {

		String createdBy = candidate.getCreatedBy();
		String message = "Profile created";
		String readStatus = "No";
		List<UserInfo> info = userService.retrieveUserByRole(ROLE_HR);
		List<String> HR_Emails = new ArrayList<String>();

		for (UserInfo ui : info) {
			HR_Emails.add(ui.getEmailId());
		}

		updateUserNotification(createdBy, message, readStatus);
		VelocityEngine engine = new VelocityEngine();
		engine.init();

		ArrayList<String> skills = candidate.getPrimarySkills();
		String primarySkills = skills.toString().replace(",", "-") // remove the
																	// commas
				.replace("[", "") // remove the right bracket
				.replace("]", "") // remove the left bracket
				.trim();

		String totalExperience = candidate.getExpYear() + "." + candidate.getExpMonth();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_PROFILE_VM);

		VelocityContext context = new VelocityContext();
		context.put(CREATED_BY_USER, candidate.getIsReferral());
		context.put(CANDIDATE_NAME, candidate.getCandidateName());
		context.put(TOTAL_EXP, totalExperience);
		context.put(SKILLS, primarySkills);
		context.put(OTHER_SKILLS, candidate.getOtherSkills());
		context.put(SUBMITTED_BY_USER, candidate.getReferredByName());

		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		message1.setFrom(new InternetAddress(from));
		String toMail = createdBy;
		for (String hrEMails : HR_Emails) {
			if (toMail == null || toMail == "")
				toMail = hrEMails;
			else
				toMail = toMail + "," + hrEMails;
		}
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail));
		message1.setSubject("Profile has been created for: " + candidate.getCandidateName());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);

		return "Mails Sent Successfully!";

	}

	public void sendProfileApprovedNotification(Profile candidate) throws MessagingException {
		String createdBy = candidate.getCreatedBy();
		String message = "Profile approved";
		String readStatus = "No";
		
		List<UserInfo> info = userService.retrieveUserByRole(ROLE_HR);
		List<String> HR_Emails = new ArrayList<String>();

		for (UserInfo ui : info) {
			HR_Emails.add(ui.getEmailId());
		}
		
		updateUserNotification(createdBy, message, readStatus);
		VelocityEngine engine = new VelocityEngine();
		engine.init();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_PROFILE_APPROVED_VM);

		VelocityContext context = new VelocityContext();
		context.put("jobCode", candidate.getJobCode());
		context.put("createdBy", candidate.getReferredByName());
		context.put("candidateName", candidate.getCandidateName());

		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		// message1.setFrom(new InternetAddress(from));
		String toMail = createdBy;
		for (String hrEMails : HR_Emails) {
			if (toMail == null || toMail == "")
				toMail = hrEMails;
			else
				toMail = toMail + "," + hrEMails;
		}
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail));
		message1.setSubject(OSI_TECHNOLOGIES + " :Profile has been approved for: " + candidate.getCandidateName());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);
	}

	public void sendPositionUpdateNotification(Position position) throws MessagingException {
		String createdBy = position.getCreatedBy();
		String message = "Position updated";
		String readStatus = "No";
		updateUserNotification(createdBy, message, readStatus);
		VelocityEngine engine = new VelocityEngine();
		engine.init();
		Template positionUpdateTemplate = getVelocityTemplate(SRC_POSITION_UPDATE);

		VelocityContext context = new VelocityContext();
		context.put("jobCode", position.getJobcode());
		context.put("createdBy", position.getCreatedBy());
		context.put("designation", position.getDesignation());
		context.put("location", position.getLocation());
		context.put("skills", position.getPrimarySkills());
		context.put("status", position.getStatus());
		context.put("UpdatedBy", position.getUpdatedBy());
		context.put("positionType", position.getPositionType());

		List<UserInfo> info = userService.retrieveUserByRole(ROLE_HR);
		List<String> HR_Emails = new ArrayList<String>();

		for (UserInfo ui : info) {
			HR_Emails.add(ui.getEmailId());
		}

		StringWriter writer = new StringWriter();
		positionUpdateTemplate.merge(context, writer);
		Message message1 = getMessage();
		message1.setFrom(new InternetAddress(from));
		String toMail = createdBy;
		for (String hrEMails : HR_Emails) {
			if (toMail == null || toMail == "")
				toMail = hrEMails;
			else
				toMail = toMail + "," + hrEMails;
		}
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail));
		message1.setSubject("Position updated with job code: " + position.getJobcode());
		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);

	}

	public void sendProfileUpdatedNotification(Profile candidate)  throws MessagingException {
		String createdBy = candidate.getCreatedBy();
		List<UserInfo> info = userService.retrieveUserByRole(ROLE_HR);
		List<String> HR_Emails = new ArrayList<String>();

		for (UserInfo ui : info) {
			HR_Emails.add(ui.getEmailId());
		}
		/*String message = "Profile updated";
		String readStatus = "No";

		updateUserNotification(createdBy, message, readStatus);*/
		VelocityEngine engine = new VelocityEngine();
		engine.init();

		Template jobRequisitionTemplate = getVelocityTemplate(SRC_PROFILE_UPDATED_VM);

		VelocityContext context = new VelocityContext();
		context.put("jobCode", candidate.getJobCode());
		context.put("createdBy", candidate.getReferredByName());
		context.put("candidateName", candidate.getCandidateName());
		context.put(UPDATED_BY, candidate.getUpdatedBy());
		context.put(UPDATED_BY_NAME, candidate.getUpdatedByName());

		StringWriter writer = new StringWriter();
		jobRequisitionTemplate.merge(context, writer);

		Message message1 = getMessage();
		message1.setFrom(new InternetAddress(from));
		String toMail = createdBy;
		for (String hrEMails : HR_Emails) {
			if (toMail == null || toMail == "")
				toMail = hrEMails;
			else
				toMail = toMail + "," + hrEMails;
		}
		message1.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail));
		message1.setSubject("Profile has been updated for: " + candidate.getCandidateName());

		message1.setContent(writer.toString(), TEXT_HTML);
		Transport.send(message1);
	}

}
