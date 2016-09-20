package com.nisum.employee.ref.service;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.nisum.employee.ref.domain.Advertisement;
import com.nisum.employee.ref.repository.AdRepository;
import com.nisum.employee.ref.repository.SequenceRepository;

@Service
public class AdService implements IAdService{
	
	@Autowired
	AdRepository adRepository;
	
	@Autowired
	SequenceRepository sequenceRepository;

	@Override
	public String uploadImage(String fileName,MultipartFile multipartFile) {
		Advertisement adv=new Advertisement();
		adv.setName(fileName);
		adv.setCreatedDate(new Date());
		adv.setFlag("ACTIVE");
	    adv.setAdvId("ADV_" + sequenceRepository.getNextSequenceId("ADV"));
	
		String cloudinaryURL=adRepository.uploadImageToCloud(adv, multipartFile);
		return cloudinaryURL;
	}
	
	@Override
	public List<Advertisement> getImages() {
		// TODO Auto-generated method stub
		return adRepository.retieveCurrentSliderImages();
	
	}
	
	
}