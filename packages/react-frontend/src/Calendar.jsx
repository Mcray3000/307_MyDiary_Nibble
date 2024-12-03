import React, { useState, useEffect } from "react";
import HamburgerMenu from "./HamburgerMenu";
// there are modules for building calendars, but for our MVP we are hard coding the months of Nov, Dec 2024
function Calendar(props) {
  const [month, setMonth] = useState("November 2024");
  const [diaryEntries, setDiaryEntires] = useState({});
  const [selectDate, setSelectedDate] = useState(null);
  const [showPopUp, setPopUp] = useState(false);

  useEffect(() => {
    getEntries();
  }, []);

  //load all entries from db
  function getEntries() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/entries/home`, {
      method: "GET",
      headers: props.addAuth({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      // format timestamps to fetch entries by date only
      .then((data) => {
        const formattedEntries = {};
        data.forEach((entry) => {
          const date = formatDate(entry.date);
          if (!formattedEntries[date]) {
            formattedEntries[date] = [];
          }
          formattedEntries[date].push(entry);
        });
        // for debugging
        console.log(formattedEntries);
        setDiaryEntires(formattedEntries);
      })
      .catch((error) => {
        console.error("Error fetching entries", error);
      });
  }

  // parse timestamp into date
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function nextMonth() {
    if (month === "November 2024") {
      setMonth("December 2024");
    }
  }

  function previousMonth() {
    if (month === "December 2024") {
      setMonth("November 2024");
    }
  }

  function loadDaysOfMonth() {
    if (month === "November 2024") {
      return (
        <>
          <tr>
            <td className="outOfMonth">27</td>
            <td className="outOfMonth">28</td>
            <td className="outOfMonth">29</td>
            <td className="outOfMonth">30</td>
            <td className="outOfMonth">31</td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-01")}
              >
                1
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-02")}
              >
                2
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-03")}
              >
                3
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-04")}
              >
                4
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-05")}
              >
                5
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-06")}
              >
                6
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-07")}
              >
                7
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-08")}
              >
                8
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-09")}
              >
                9
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-10")}
              >
                10
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-11")}
              >
                11
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-12")}
              >
                12
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-13")}
              >
                13
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-14")}
              >
                14
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-15")}
              >
                15
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-16")}
              >
                16
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-17")}
              >
                17
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-18")}
              >
                18
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-19")}
              >
                19
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-20")}
              >
                20
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-21")}
              >
                21
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-22")}
              >
                22
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-23")}
              >
                23
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-24")}
              >
                24
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-25")}
              >
                25
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-26")}
              >
                26
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-27")}
              >
                27
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-28")}
              >
                28
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-29")}
              >
                29
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-11-30")}
              >
                30
              </button>
            </td>
          </tr>
        </>
      );
    } else if (month === "December 2024") {
      return (
        <>
          <tr>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-01")}
              >
                1
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-02")}
              >
                2
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-03")}
              >
                3
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-04")}
              >
                4
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-05")}
              >
                5
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-06")}
              >
                6
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-07")}
              >
                7
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-08")}
              >
                8
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-09")}
              >
                9
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-10")}
              >
                10
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-11")}
              >
                11
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-12")}
              >
                12
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-13")}
              >
                13
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-14")}
              >
                14
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-15")}
              >
                15
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-16")}
              >
                16
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-17")}
              >
                17
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-18")}
              >
                18
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-19")}
              >
                19
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-20")}
              >
                20
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-21")}
              >
                21
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-22")}
              >
                22
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-23")}
              >
                23
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-24")}
              >
                24
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-25")}
              >
                25
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-26")}
              >
                26
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-27")}
              >
                27
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-28")}
              >
                28
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-29")}
              >
                29
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-30")}
              >
                30
              </button>
            </td>
            <td>
              <button
                type="button"
                className="round-button"
                onClick={() => handelDateClick("2024-12-31")}
              >
                31
              </button>
            </td>
            <td className="outOfMonth">1</td>
            <td className="outOfMonth">2</td>
            <td className="outOfMonth">3</td>
            <td className="outOfMonth">4</td>
          </tr>
        </>
      );
    }
  }

  function handelDateClick(date) {
    if (diaryEntries[date]) {
      setSelectedDate(date);
      setPopUp(true);
    }
  }

  // render popup for when date gets clicked and date has entries
  function DiaryPopUp({ date, entries, onClose }) {
    return (
      <div className="calPopUp">
        <h2>Scribbles for: {date}</h2>
        <div className="entries-grid">
          {/* Map through the 'entries' state to display previous entries */}
          {entries.map((entry, index) => (
            <div key={index} className="entry-card">
              <div className="entry-title">{entry.title}</div>{" "}
              <div className="entry-author">Author: {entry.author}</div>
              <div className="entry-date">{formatDate(entry.date)}</div>{" "}
            </div>
          ))}
        </div>
        <button onClick={onClose} type="button" className="round-button">
          Close
        </button>
      </div>
    );
  }

  function CalendarHeader() {
    return (
      <div className="calendar-header">
        <div className="title-card">{month}</div>
        <button onClick={previousMonth} type="button" className="round-button">
          ←
        </button>
        <button onClick={nextMonth} type="button" className="round-button">
          →
        </button>
      </div>
    );
  }

  function CalendarBody() {
    return (
      <table>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>{loadDaysOfMonth()}</tbody>
      </table>
    );
  }

  return (
    <div>
      <HamburgerMenu />
      <CalendarHeader />
      {showPopUp && selectDate && (
        <DiaryPopUp
          date={selectDate}
          entries={diaryEntries[selectDate]}
          onClose={() => setPopUp(false)}
        />
      )}
      <CalendarBody />
    </div>
  );
}

export default Calendar;
