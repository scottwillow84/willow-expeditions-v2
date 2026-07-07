import Layout from "../components/Layout";

const feedbackSections = [
  {
    name: "Sarah",
    prompts: [
      "Seafood places you want",
      "Breweries / cider stops",
      "Accommodation preferences",
      "Anything that feels too rushed?",
    ],
  },
  {
    name: "Mia",
    prompts: [
      "Cafés or food stops",
      "Photo spots",
      "Shopping / markets",
      "Activities you want added",
    ],
  },
  {
    name: "Simone",
    prompts: [
      "Fun activities",
      "Beaches",
      "Food / dessert stops",
      "Anything you want removed",
    ],
  },
  {
    name: "Jane",
    prompts: [
      "Animals you want to see",
      "Rock pools / beaches",
      "Snow",
      "Adventure ideas",
    ],
  },
  {
    name: "Scott",
    prompts: [
      "4WD tracks",
      "Vehicle prep",
      "Photography spots",
      "Remote / hidden detours",
    ],
  },
];

const openQuestions = [
  "Where should Scott and Jane stay on the way to Geelong?",
  "Should we do 2 nights at St Helens, Bicheno or Coles Bay?",
  "Do we prioritise Bruny Island or more Hobart / Carlton River time?",
  "How many nights should we spend at Cradle Mountain to maximise snow chance?",
  "Which Gordon River cruise should we book?",
];

export default function Feedback() {
  return (
    <Layout title="Ideas & Feedback">
      <p className="intro">
        This is the family planning board. For now, send ideas to Scott and we’ll
        add them here. Later we can turn this into proper editable forms.
      </p>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3>❓ Open Questions</h3>
        <ul>
          {openQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>

      <div className="grid">
        {feedbackSections.map((section) => (
          <div className="card" key={section.name}>
            <h3>{section.name}</h3>
            <p className="muted">Feedback needed</p>

            <ul>
              {section.prompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>

            <h4>Notes</h4>
            <p>Waiting for ideas...</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h3>✅ Decisions Made</h3>
        <ul>
          <li>Maria Island skipped for this trip.</li>
          <li>Carlton River is locked in as the family base.</li>
          <li>Sarah, Mia and Simone arrive at Launceston Airport on 28 Sept at 3:20 pm.</li>
          <li>Scott and Jane start the trip first and meet the others in Launceston.</li>
        </ul>
      </div>
    </Layout>
  );
}