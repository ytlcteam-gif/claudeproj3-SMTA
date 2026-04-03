# SMTA — Social Media Trouble Advisor

AI-powered web app that classifies social media issues and generates structured action plans, legal references, and complaint drafts.

---

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
