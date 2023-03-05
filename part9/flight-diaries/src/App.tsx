import React from "react";
import logo from "./logo.svg";

import { useState, useEffect } from "react";
import axios from "axios";
interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}
const AddEntry = ({
  diaries,
  setDiaries,
}: {
  diaries: Diary[];
  setDiaries: Function;
}): JSX.Element => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<any>("");
  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };
    try {
      const response = await axios.post<Diary>(
        "http://localhost:3003/api/diaries",
        newEntry
      );
      setDiaries(diaries.concat(response.data));
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        setError(error.response ? error.response.data : "IDK");
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <form onSubmit={entryCreation}>
        <p style={{ color: "red" }}>{error}</p>
        <div>
          date
          <input
            value={date}
            type="date"
            name="weather"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          weather
          <input
            value="sunny"
            type="radio"
            name="weather"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="sunny">sunny</label>
          <input
            value="rainy"
            type="radio"
            name="weather"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="rainy">rainy</label>
          <input
            value="cloudy"
            type="radio"
            name="weather"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            value="stormy"
            type="radio"
            name="weather"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="stormy">stormy</label>
          <input
            value="windy"
            type="radio"
            name="weather"
            onChange={({ target }) => setWeather(target.value)}
          />
          <label htmlFor="windy">windy</label>
        </div>
        <div>
          visibility
          <input
            value="great"
            type="radio"
            name="visibility"
            onChange={({ target }) => setVisibility(target.value)}
          />
          <label htmlFor="great">great</label>
          <input
            value="good"
            type="radio"
            name="visibility"
            onChange={({ target }) => setVisibility(target.value)}
          />
          <label htmlFor="good">good</label>
          <input
            value="ok"
            type="radio"
            name="visibility"
            onChange={({ target }) => setVisibility(target.value)}
          />
          <label htmlFor="ok">ok</label>
          <input
            value="poor"
            type="radio"
            name="visibility"
            onChange={({ target }) => setVisibility(target.value)}
          />
          <label htmlFor="poor">poor</label>
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3003/api/diaries").then((response) => {
      console.log(response.data);
      setDiaries(response.data as Diary[]);
    });
  }, []);

  const Entries = () => {
    return (
      <div className="App">
        <h1>Diary Entries</h1>
        {diaries.map((x) => (
          <p key={x.id}>
            date: {x.date}
            <br />
            weather: {x.weather}
            <br />
            visibility: {x.visibility}
            <br />
            comment: {x.comment}
          </p>
        ))}
      </div>
    );
  };
  return (
    <>
      <Entries />
      <AddEntry setDiaries={setDiaries} diaries={diaries} />
    </>
  );
};

export default App;
