# SMTA — Social Media Trouble Advisor

AI-powered web app that classifies social media issues and generates structured action plans, legal references, and complaint drafts.


![SMTAOUPT5](https://github.com/user-attachments/assets/b2ab2254-1ca8-4647-a492-51d203f044c7)




















![SMTAOUPT6](https://github.com/user-attachments/assets/65babd40-d56c-4585-ac4a-02e04998d08a)

------------------------------------------------------------------------------------------------------------------------

## Project Structure

```
smta/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
└── README.md
```


Key Features
🔍 AI-Powered Threat Analysis: Automatically categorizes digital threats (Impersonation, Harassment, IP Theft, etc.) and calculates severity levels.

⚖️ Automated Legal Drafts: Generates professional, formal complaints (Platform Reports, Cyber Complaints, Cease & Desist) using "Sir/Madam" etiquette.

⚡ Interactive UI: Features a sleek dark-mode dashboard with real-time typing animations for a premium "Security Terminal" feel.

🛠️ Actionable Plans: Provides step-by-step guidance on evidence collection and platform reporting.

🚀 Tech Stack
Frontend: React.js, Vite, Tailwind CSS

Animations: Framer Motion / Typewriter-effect

AI Engine: Google Gemini / LLM (RAG-based architecture)

Icons: Lucide-React

📸 Interface Preview
The portal is divided into three main sections:

Analysis: Breakdown of the category, severity (Low/Medium/High), and reasoning.

Action Plan: Immediate steps for platform action and evidence collection.

Complaint Drafts: Collapsible, ready-to-copy formal legal notices.
------------------------------------------------------------------------------
![SMTAOUPT3](https://github.com/user-attachments/assets/5327f27b-6c9f-4dcd-b89a-e939de7d3557)












![SMTAOUPT4](https://github.com/user-attachments/assets/c528d6fd-bc56-4e44-ba90-2df083824a88)


🛠️ Installation & Setup
Clone the repository

Bash
git clone https://github.com/your-username/claudeproj3-smta.git
cd safeguard-ai/frontend
Install Dependencies
(Using Tailwind v4 setup)

Bash
npm install
Configure Environment
Create a .env file in the root and add your API keys:

Code snippet
VITE_AI_API_KEY=your_key_here
Run Development Server

Bash
npm run dev
📝 Important Disclaimer
This project is for informational purposes only and does not constitute legal advice. Users are encouraged to consult with legal professionals for official proceedings.





---

## Setup

### 1. Navigate to backend
```bash
cd backend
```

### 2. Create and activate virtual environment
```bash
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment
```bash
cp .env.example .env
# Edit .env and add your Gemini API key
```

### 5. Paste SMTA system prompt
Open `main.py` and replace `PASTE_SMTA_MD_HERE` with the full SMTA v5.0 system instructions.

### 6. Run the server
```bash
uvicorn main:app --reload
```

Server runs at: `http://localhost:8000`

---

## API Endpoints

| Method | Endpoint   | Description        |
|--------|------------|--------------------|
| GET    | /          | Health check       |
| POST   | /analyze   | Analyze user input |

---

## Test with curl

### Health check
```bash
curl http://localhost:8000/
```

### Analyze issue
```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Someone created a fake Instagram account using my photos and asking for money"}'
```

---


## Expected Response

```json
{
  "analysis": {
    "category": "Impersonation",
    "severity": "HIGH",
    "reasoning": "..."
  },
  "action_plan": [...],
  "legal_reference": [...],
  "drafts": {
    "platform_report": "...",
    "cyber_complaint": "...",
    "cease_and_desist": "..."
  },
  "disclaimer": "This is for informational purposes only and does not constitute legal advice."
}
```
![SMTAOUPT2](https://github.com/user-attachments/assets/597e18c0-f74e-45cc-adf3-679d0ee441d1)

