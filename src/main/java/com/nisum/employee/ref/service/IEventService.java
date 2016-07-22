package com.nisum.employee.ref.service;

import java.util.List;

import com.nisum.employee.ref.domain.Event;

public interface IEventService {
public void setEvent(Event event);
public List<Event> getEvents();
public List<Event> getEventsForGeneral();
}
