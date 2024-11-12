import './App.css';
import { useState, useEffect } from 'react';

// Funktion zum Mischen von Arrays (Fisher-Yates-Algorithmus)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
  }
  return shuffled;
};

function App() {
  // Alle Rätsel mit der richtigen Antwort und den falschen Antworten
  const riddles = {
    1: { question: "Mio Einwohner Saarland", correctAnswer: "1" },
    3: { question: "?.12. und nochmal älter geworden", correctAnswer: "3" },
    5: { question: "Wochen ohne dich", correctAnswer: "5" },
    7: { question: "löcher bald", correctAnswer: "7" },
    9: { question: "mal Waschalarm", correctAnswer: "9" },
    11: { question: "Cro", correctAnswer: "11" },
    13: { question: "1|1|2|3|5|8|?", correctAnswer: "13" },
    15: { question: "Minuten bis zum Forst", correctAnswer: "15" },
    17: { question: "Bis morgen", correctAnswer: "17" },
    19: { question: "Insta Beiträge", correctAnswer: "19" },
    21: { question: "Makko", correctAnswer: "21" },
    23: { question: "Trotzdem noch jung", correctAnswer: "23" },
  };

  const [openedDays, setOpenedDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  // LocalStorage beim Laden der Komponente abrufen
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
    const correctAnswer = riddles[day]?.correctAnswer;
    if (answer === correctAnswer) {
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
            const isRiddleDay = riddles.hasOwnProperty(day);

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

        {/* Anzeige von Bild oder Rätsel je nach Tag */}
        {selectedDay && (
          <div className="answer-list">
            {riddles[selectedDay] ? (
              <>
                <h2>Wähle das passende Rätsel für den {selectedDay}. Dezember:</h2>
                <div className="options">
                  {/* Antwortmöglichkeiten mischen */}
                  {shuffleArray(Object.values(riddles).map(riddle => riddle.question)).map((answer, index) => (
                    <button
                      key={index}
                      className="option-button"
                      onClick={() => checkAnswer(selectedDay, answer)}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="image-box">
                {/* Lade das Bild aus dem public/images Ordner */}
                <img 
                  src={`./images/${selectedDay}.jpeg`} 
                  alt={`Bild für den ${selectedDay}. Dezember`} 
                  className="image" 
                />
              </div>
            )}
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
