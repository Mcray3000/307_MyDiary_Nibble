import React, { useState } from "react";

function Calendar() {
  const [month, setMonth] = useState("November 2024");

  function getMonth() {
    return month;
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
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
          </tr>
          <tr>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
            <td>15</td>
            <td>16</td>
          </tr>
          <tr>
            <td>17</td>
            <td>18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
            <td>22</td>
            <td>23</td>
          </tr>
          <tr>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
            <td>29</td>
            <td>30</td>
          </tr>
        </>
      );
    } else if (month === "December 2024") {
      return (
        <>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
          <tr>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
          </tr>
          <tr>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
          </tr>
          <tr>
            <td>29</td>
            <td>30</td>
            <td>31</td>
            <td className="outOfMonth">1</td>
            <td className="outOfMonth">2</td>
            <td className="outOfMonth">3</td>
            <td className="outOfMonth">4</td>
          </tr>
        </>
      );
    }
  }

  function CalendarHeader() {
    return (
      <div className="calendar-header">
        <div className="title-card">{getMonth()}</div>
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
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
}

export default Calendar;
