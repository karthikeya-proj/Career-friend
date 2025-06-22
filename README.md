# 💼 CareerFriend – Smart AI Career Assistant

CareerBuddy is a full-stack AI chatbot that provides intelligent career guidance using a local LLaMA3 model. Built for the Qualcomm Hackathon 2025, it helps users explore career paths, learn essential skills, and stay on track with personalized recommendations — all without internet access for AI processing.

[CareerBuddy UI](https://drive.google.com/uc?id=10YOtTXzGw-K7U-47czl2XSMeq8e7gzkj)

#### Credits

#### Built with ❤️ by:

####  **👨‍💻 P. Naga Karthikeya**  
#### 📩 [eyakarthik872@gmail.com](mailto:eyakarthik872@gmail.com)
---

##  Project Overview

CareerBuddy is a locally hosted chatbot powered by the LLaMA3 model using Ollama. It supports real-time conversation, voice input/output, dark mode, and a sleek, responsive UI.

---

##  Features

-  Interactive chat interface
-  Smart AI responses via LLaMA3 (Ollama)
-  Voice input & 🗣️ Text-to-speech output
-  Dark mode toggle (with localStorage support)
-  Typing animation with timestamped messages
-  Suggestion chips for quick queries
-  User feedback (👍 / ❤️ / 👎) on bot replies
-  Stream toggle / Stop response

---

## 🛠️ Tech Stack

| Layer     | Technology             |
|-----------|------------------------|
| Frontend  | Vite, HTML, CSS, JavaScript |
| Backend   | Node.js, Express.js    |
| AI Model  | LLaMA3 via Ollama (runs locally) |
| Styling   | Custom CSS (Dark mode, animations) |
| Extras    | Web Speech API (voice), Font Awesome |

---
##  Why Use LLaMA3 with Ollama?

**LLaMA3** is a powerful open-source large language model by Meta, designed to deliver high-quality AI responses locally. When paired with **[Ollama](https://ollama.com/)** — a tool that runs LLMs directly on your system — you get:

###  Key Benefits:

- **No API keys or internet required** (runs 100% locally)
- **Privacy-first** — no data is sent to external servers
- **Fast performance**, even on CPU
- **Easy integration** with local applications (via REST API)
- **Great for hackathons, offline apps, and prototyping**

For  **CareerFriend** chatbot, LLaMA3 via Ollama powers the brain of the bot, enabling offline career guidance with fast, context-aware replies.

---

##  How to Set Up Ollama with LLaMA3

###  Step-by-step Guide:

####  1. **Install Ollama**

- Download from: [https://ollama.com/download](https://ollama.com/download)
- Choose your OS (Windows, macOS, or Linux)
- Install and verify it's working

---

####  2. **Check Ollama Version**
#### open  command prompt or terminal in VScode
```bash
ollama --version
Recommended: Use version 0.1.28 or higher.

ollama pull llama3
This downloads the default LLaMA3 model to your machine (~4–8GB).

ollama run llama3
This starts the local LLaMA3 server at:http://localhost:11434

```
##  How to Test LLaMA3 with Postman via `/ask` Endpoint
###  Prerequisites

- Ollama must be running LLaMA3 locally:
```bash
ollama run llama3
```

Once your backend is running and LLaMA3 is active via Ollama, you can easily test it using [Postman](https://www.postman.com/).
#### Your backend Express server should be running on:
```
http://localhost:5000
```
### Step-by-Step: Testing /ask in Postman
 *  Open Postman and click "New → HTTP Request"
 *  Set the request to POST
 *  Enter the URL:
 ``` 
 http://localhost:5000/ask
```
* Go to the Body tab → Select raw → Choose JSON format
*  Paste the following sample body:
``` 
{
  "message": "What are the best career paths in AI for 2025?"
}
```
* Click Send
####  Expected Success Response
```
{
  "reply": "Some of the best career paths in AI for 2025 include machine learning engineering, AI ethics roles, data science, prompt engineering, and AI-powered product management."
}
```

### How It Works Internally
##### Your backend (/ask route) forwards the request to Ollama’s local server:
```
POST http://localhost:11434/api/chat
```
```
{
  "model": "llama3",
  "messages": [
    {
      "role": "system",
      "content": "You are CareerBot, a smart AI..."
    },
    {
      "role": "user",
      "content": "What are the best career paths in AI for 2025?"
    }
  ],
  "stream": false
}
```
####  If You See an Error
```
Is ollama run llama3 still running in a terminal?

Is your backend running without errors?

Is Postman using the correct Content-Type: application/json?

Try localhost instead of 127.0.0.1 if facing network issues.
```


## 📁 Folder Structure

```bash
Career-bot/
├── backend/
│ ├── index.js
│ └── package.json
├── frontend/
│ ├── index.html
│ ├── src/
│ │ ├── main.js
│ │ └── style.css
│ └── vite.config.js
├── .gitignore
└── README.md

```

## ⚙️ Local Setup Instructions

###  Clone the Repository

```bash
git clone https://github.com/karthikeya-proj/Career-friend.git
cd Career-friend
```
### Install Dependencies
```
backend :
cd backend
npm install
```
```
frontend :
cd ../frontend
npm install
```
### Start Frontend (Vite) in one terminal
```
cd frontend
npm run dev
```
### Start Backend in another terminal
```
cd backend
node index.js
```
### Start llama3 model in another terminal
```
ollama run llama3
```
## Make sure all three are running:
###  Final Check – Running URLs

| Component              | URL                        |
|------------------------|----------------------------|
|  Ollama (LLaMA3)     | `http://localhost:11434`   |
|  Backend (Express)   | `http://localhost:5000`    |
|  Frontend (Vite)     | `http://localhost:5173`    |

> 🎉 **Open localhost and Happy Prompting!  
> Your CareerFriend gives every response!**

## 💡 Tips & Best Practices

Here are some useful tips to help you work smoothly with CareerBuddy:

---

###  Ollama + LLaMA3

- Always keep **`ollama run llama3`** running in one terminal tab.
- If you change system prompt behavior, restart Ollama and your backend.
- Use `ollama list` to see all installed models.
- Use `ollama pull llama3` to install it if missing.

---

###  Testing the API

- Use **Postman** to test the backend endpoint `POST /ask`.
- Check that:
  - Content-Type is `application/json`
  - You’re sending a `"message"` field in the request body

---

###  Frontend Tips

- Open frontend at `http://localhost:5173`
- Voice input (mic) needs an internet connection (browser uses Web Speech API).
- Try suggestion chips like **“Best careers for AI/ML”** for instant prompts.
- Use the speaker 🔊 button to hear bot replies via text-to-speech.
- Use dark mode toggle (top-right 🌙 / ☀️).

---


###  Multi-Terminal Workflow

Make sure these are running in separate terminals:

| Task                | Command                      | Description                         |
|---------------------|------------------------------|-------------------------------------|
| 🧠 Ollama Model     | `ollama run llama3`          | Starts the local LLaMA3 model       |
| 📡 Backend Server   | `node index.js`              | Starts Express backend on port 5000 |
| 🌐 Frontend (Vite)  | `npm run dev` (inside `/frontend`) | Starts the web UI on port 5173 |

---

### 🛑 Common Issues

| Problem                              | Fix                                                                 |
|--------------------------------------|----------------------------------------------------------------------|
| ❌ Backend not responding             | Ensure Ollama is running and `index.js` is started                   |
| ❌ Mic not working                   | Check internet connection and browser permissions                   |
| ❌ Empty response from API           | Restart backend + verify model name is `"llama3"`                   |
| ❌ Ollama error or slow response     | Restart Ollama and try again                                        |

---

## 🤝 Collaborations & Contact

If you're interested in collaborating on improving CareerFriend or want to contribute new ideas, feel free to connect!

📩 **Email**: [eyakarthik872@gmail.com](mailto:eyakarthik872@gmail.com)  
🔗 **GitHub**: [@karthikeya-proj](https://github.com/karthikeya-proj)

Whether you're a developer, designer, or just passionate about AI career tools — all contributions are welcome!

---

