import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Sidebar from "../global/Sidebar";
import axios from "axios";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://gautam0511.pythonanywhere.com/product/events/")
      .then((res) => {
        const events = res.data.data.map((ev) => ({
          id: ev.id,
          title: ev.title,
          start: ev.date,
          end: ev.date,
        }));
        setCurrentEvents(events);
      })
      .catch((err) => console.log(err));
  };

  const handleDateClick = (selected) => {
    const selectedDate = selected.startStr;
    const existingEvent = currentEvents.find((event) => event.start === selectedDate);
  
    if (existingEvent) {
      const newTitle = prompt("Please enter a new title for your event", existingEvent.title);
      const eventId = existingEvent.id;
  
      if (newTitle) {
        axios
          .put(`https://gautam0511.pythonanywhere.com/product/events/update/${eventId}/`, { title: newTitle, date: selectedDate })
          .then((res) => {
            const updatedEvent = {
              id: eventId,
              title: newTitle,
              start: existingEvent.start,
              end: existingEvent.end,
            };
            setCurrentEvents(currentEvents.map((event) => (event.id === eventId ? updatedEvent : event)));
          })
          .catch((err) => console.log(err));
      }
    } else {
      const title = prompt("Please enter a title for your event");
      const calendarApi = selected.view.calendar;
      calendarApi.unselect();
  
      if (title) {
        const newEvent = {
          title: title,
          date: selectedDate
        };
        setCurrentEvents([...currentEvents, newEvent]);
        console.log(newEvent)
        axios
          .post("https://gautam0511.pythonanywhere.com/product/events/add/", newEvent)
          .then((res) => {
            const savedEvent = res.data.data;
            const updatedEvent = {
              id: savedEvent.id,
              title: savedEvent.title,
              start: savedEvent.date,
              end: savedEvent.date,
            };
            // setCurrentEvents((prevEvents) =>
            //   prevEvents.map((event) => (event.title === newEvent.title ? updatedEvent : event))
            // );
          })
          .catch((err) => console.log(err));
      }
    }
  };
  
  

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      const eventId = selected.event.id;
      axios
        .delete(`https://gautam0511.pythonanywhere.com/product/events/delete/${eventId}/`)
        .then((res) => {
          console.log(res,"!!!!!!")
          selected.event.remove();
          setCurrentEvents(currentEvents.filter((ev) => ev.id !== eventId));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box display="flex" width="100%" height="100%">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Box m="20px">
          <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

          <Box display="flex" justifyContent="space-between">
            {/* CALENDAR SIDEBAR */}
            <Box
              flex="1 1 20%"
              backgroundColor={colors.primary[400]}
              p="15px"
              borderRadius="4px"
            >
              <Typography variant="h5">Events</Typography>
              <List>
                {currentEvents.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      margin: "10px 0",
                      borderRadius: "2px",
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Typography>
                          {formatDate(event.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* CALENDAR */}
            <Box flex="1 1 100%" ml="15px">
              <FullCalendar
                height="75vh"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                
                events={currentEvents}
              />
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default Calendar;