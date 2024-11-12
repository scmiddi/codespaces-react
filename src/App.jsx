import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const solutions = {
    1: "2",  // Beispiel: Lösung für den 1. Dezember
    2: "4",  // Beispiel: Lösung für den 2. Dezember
    // Füge hier weitere Lösungen hinzu
  };

  const answerOptions = ["1", "2", "3", "4", "5"]; // Beispielhafte Antworten, für alle Tage gleich
  const [openedDays, setOpenedDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  // Beim ersten Laden des Components die gespeicherten Daten aus dem localStorage laden
  useEffect(() => {
    const savedDays = JSON.parse(localStorage.getItem('openedDays')) || [];
    setOpenedDays(savedDays);
  }, []);

  // Speichert die Liste der geöffneten Tage im localStorage
  const updateOpenedDays = (newOpenedDays) => {
    setOpenedDays(newOpenedDays);
    localStorage.setItem('openedDays', JSON.stringify(newOpenedDays));
  };

  // Funktion zur Überprüfung der Antwort
  const checkAnswer = (day, answer) => {
    if (answer === solutions[day]) {
      alert("Richtig!");
      const newOpenedDays = [...openedDays, day];
      updateOpenedDays(newOpenedDays);
    } else {
      alert("Leider falsch. Versuche es nochmal!");
    }
    setSelectedDay(null); // Antwortliste schließen
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Adventskalender Rätsel</h1>
        <p>Klicke auf den Tag, um das Rätsel zu lösen!</p>

        <div id="calendar" className="calendar">
          {/* Generiere 24 Kästchen für die Tage */}
          {[...Array(24)].map((_, i) => {
            const day = i + 1;
            return (
              <div
                key={day}
                className={`day-box ${openedDays.includes(day) ? 'opened' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Antwortmöglichkeiten nur anzeigen, wenn ein Tag ausgewählt wurde */}
        {selectedDay && (
          <div className="answer-list">
            <h2>Rätsel für den {selectedDay}. Dezember</h2>
            <p>Wähle die richtige Antwort:</p>
            <div className="options">
              {answerOptions.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => checkAnswer(selectedDay, option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="close-button" onClick={() => setSelectedDay(null)}>
              Schließen
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
