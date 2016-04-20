package com.nisum.employee.ref.search;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.nisum.employee.ref.domain.Profile;

public interface ProfileIndexRepository extends ElasticsearchRepository<Profile, String>{

	List<Profile> findProfilesByEmailIdStartingWithOrCandidateNameStartingWithOrDesignationStartingWithAllIgnoreCase(String emailId, String name, String designation);
	List<Profile> findProfilesByEmailIdStartingWithAllIgnoreCase(String emailId);
	List<Profile> findProfilesByJobcodeProfileStartingWithAllIgnoreCase(String jobcodeProfile);
	List<Profile> findProfilesByCreatedByStartingWithAllIgnoreCase(String profilecreatedBy);
	
}
