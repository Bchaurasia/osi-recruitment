package com.nisum.employee.ref.service;

import java.util.List;

import com.nisum.employee.ref.domain.Event;

public interface IEventService {
public void setNotification(Event notification);
public List<Event> getNotifications();
}
