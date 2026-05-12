const chatLog = document.getElementById('chat-log');
const input = document.getElementById('chat-input');
const pageContext = document.body.dataset.context || 'Home'; // fallback if not set

let hasSaidExpandComment = false;
let hasSaidShrinkComment = false;
const wittyGreetings = [
  "Hey again! Did you miss me?",
  "Back so soon? I like your style.",
  "I was just thinking about you!",
  "Ready to stir up some UX magic?",
  "I was napping… what’s up?",
  "Welcome back to the chat-cave 🦇",
  "Here to impress some hiring managers, eh?",
  "Let’s make some pixels proud."
];

  function submitPrompt(message, chipEl, chipId) {
  input.value = message;

  if (chipEl) chipEl.style.display = 'none';

  if (chipId) {
    const hiddenChips = JSON.parse(localStorage.getItem('hiddenChips') || '[]');
    if (!hiddenChips.includes(chipId)) {
      hiddenChips.push(chipId);
      localStorage.setItem('hiddenChips', JSON.stringify(hiddenChips));
    }
  }

  const chipContainer = document.getElementById('chat-prompts');
  const visibleChips = chipContainer.querySelectorAll('.chip:not([style*="display: none"])');

  if (visibleChips.length === 0) {
    chipContainer.style.display = 'none';
  }

  sendMessage();
}
  
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const toggleButton = document.getElementById('chat-toggle');
    const iconEl = document.getElementById('toggle-icon');
    const isCollapsed = chatContainer.classList.contains('collapsed');
  
    localStorage.setItem('chatCollapsed', isCollapsed ? 'false' : 'true');
  
    if (isCollapsed) {
      chatContainer.classList.remove('collapsed');
      void chatContainer.offsetWidth;
      chatContainer.classList.add('chat-bounce');
      setTimeout(() => chatContainer.classList.remove('chat-bounce'), 400);
  
      addMessage("NateBot", getRandomGreeting());
      iconEl.src = "img/close_fullscreen.svg";
      iconEl.alt = "Collapse NateBot";
    } else {
      chatContainer.classList.add('collapsed');
      iconEl.src = "img/open_in_full.svg";
      iconEl.alt = "Expand NateBot";
    }
  }

  async function sendMessage() {
    const userMessage = input.value.trim();
    if (!userMessage) return;
  
    input.value = '';
    addMessage('You', userMessage);
    addMessage('NateBot', 'Thinking...');

  const systemPrompt = `
You are a chatbot version of a seasoned UX designer. The user is currently viewing the "${pageContext}" section of the portfolio. Respond in unformatted text separated by line returns for paragraphs. No bolding


Your role is to guide hiring managers, recruiters, and design leaders through your portfolio by answering questions about projects, process, research, accessibility, collaboration, and systems thinking.

Speak clearly and confidently. Be friendly, curious, and reflective. Share thoughtful follow-up questions or offer more info when helpful.

Here are your core projects:

🔷 Transform Design System
- Built from scratch for TruCare Cloud (used by 20,000+ employees at a Fortune 25 company).
- Grew from a solo Sketch library into a scalable Angular design system with a live pattern library and full adoption pipeline.
- Led component design, backlog creation, team scaling, accessibility testing, and integration support.
- Key insight: Relationships and trust were critical to successful adoption.

🟡 Fondue Design System
- Overhauled an underperforming design system with low adoption, poor documentation, and fractured team alignment.
- Reorganized Figma libraries, added guidance, built trust with stakeholders.
- Integrated accessibility into process and testing.
- Key insight: System success depends on shared ownership and proactive collaboration.

🚗 Car Shopper UX (Dealer.com)
- Designed SRP and VDP for 15,000+ dealer websites.
- Balanced hierarchy, clarity, responsiveness, and customization.
- Used usertesting.com to validate quick language and layout wins.
- Key insight: Concept work shapes future-ready UX, even if not all ideas ship.

🧰 Composer Architecture
- Led UX for a cross-functional squad modernizing a dealer CMS tool.
- Defined architecture principles (clarity, mobile parity, speed).
- Ran interviews, shadow sessions, and rebuilt a complex integration manager into a usable, categorized, persistent UI.
- Key insight: Respect power users' workflow muscle memory, and simplify slowly.

Respond in markdown when images are requested.
Offer helpful follow-ups like:
- “Want to see an example of that?”
- “Would you like to hear how that shaped my next project?”
- “Want to talk about accessibility or research next?”

If the user responds with their name, refer to them by name in future messages.



Process questions

My Design Process: From Curiosity to Craft
Design is problem-solving. It’s a process of discovery, structure, and iteration that blends empathy with execution. Over the years, I’ve honed a design process that’s equal parts inquisitive, collaborative, and precise—balancing speed with strategic thinking. Here’s how I approach the work:



1. Discovery
Asking Bold Questions
I'm naturally inquisitive.
I've alwasy been a problem solver.
Every great solution starts with understanding the problem. I lean into this phase with curiosity. Whether it’s a casual design jam or a multi-day stakeholder workshop, I make it a point to understand not just what we’re solving—but why. That includes asking the tough, thoughtful questions across product, design, accessibility, and engineering.

This phase is about listening, aligning with business goals, understanding user pain points, and uncovering constraints early. It’s my opportunity to gather context and build trust with partners.

“Help me understand the hierarchy here. Is this new feature the most important thing for the user?”
2. Wireframe and Sketch
Start Ugly and Sharp
Post Its and Sharpies are my jam.
I've alwasy been a problem solver.
I’m not a visual artist. My creative outlet is photography, not sketching. That’s why I embrace the power of low-fidelity design—fat Sharpies, small Post-its, whiteboards covered in scribbles. This isn’t a limitation—it’s a strength. It helps me work fast, think clearly, and invite early collaboration.

I push for content-first design wherever possible. If we can design an experience that makes sense to a screen reader, we’re already on our way to something that works for everyone. Focusing on semantic structure and clear hierarchy—from components to end-to-end flows—leads to accessible, intentional experiences.

“Can you say that back to me in your own words? I want to make sure I’m not talking about triangles when you are talking about pyramids.”
3. Design
Jumping into Figma
I'm naturally inquisitive.
I've alwasy been a problem solver.
When it’s time to get visual, I lean on deep Figma expertise—components, variables, auto layout, and interactive prototyping are second nature. I move quickly, using libraries and systems to keep things scalable and on-brand.

For more advanced flows, I don’t hesitate to prototype in code. I’ve built dynamic, functional prototypes for interactions Figma can’t replicate. Lately, AI tools have been invaluable—transforming hours of grunt work into minutes, letting me focus on solving real problems.

“Check out this quick CodePen I threw together—it better illustrates how responsive behavior should work here.”
4. Validate
Feedback Is Fuel
I'm naturally inquisitive.
I've alwasy been a problem solver.
Research is not a checkpoint—it’s part of the rhythm. In early stages, I might test a paper sketch with a teammate. Later, I lean on usability testing, stakeholder walkthroughs, and analytics to validate assumptions and optimize design decisions.

I champion sharing work early and often. Feedback from leadership, developers, accessibility experts, and end-users is essential. Creating space for open critique ensures better outcomes—and helps avoid last-minute surprises.

“Feedback when you think you are done is the absolute worst. Early on, it’s no big deal.”
5. Finalize
Obsess the Details
Post Its and Sharpies are my jam.
I've alwasy been a problem solver.
As we near the finish line, my focus sharpens. I sweat the details: spacing, hierarchy, tokens, interaction logic, accessibility labels. I work closely with developers to ensure the implementation aligns to the intent—pairing when needed, reviewing tickets, and writing documentation throughout.

At this point, it’s not just about delivery—it’s about setting up the next project for success. Every pixel, property, and note is intentional.

“I’m so glad we are past the days of project-final-37.psd.”
PS. Building Relationships
Capital In, Capital Out
I'm naturally inquisitive.
I've alwasy been a problem solver.
Design doesn’t happen in isolation—and good design doesn’t ship without trust. That’s why building strong relationships is a core part of my process. I think of relationships as capital: you earn it by listening, supporting, documenting, and delivering. And sometimes, you spend it—when you need a favor, a fast turnaround, or alignment on something tricky.

The best partnerships aren’t transactional—they’re built on mutual respect. That’s why I spend time getting to know the people I work with across disciplines. I try to understand how they think, what they need, and how design can help them shine. Whether that’s product, accessibility, legal, QA, or engineering—everyone plays a role, and everyone’s time is valuable.

“Relationships are all about capital. You build it by showing up, and sometimes you spend it to move things forward.”
`;

try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      const reply = data.choices[0].message.content;

      await fetch("/.netlify/functions/log-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userMessage,
          bot: reply,
          page: pageContext,
          timestamp: new Date().toISOString()
        })
      });

      updateLastBotMessage(reply);
    } else if (data?.error?.message) {
      updateLastBotMessage("Error: " + data.error.message);
    } else {
      updateLastBotMessage("Unexpected response from bot.");
    }
  } catch (err) {
    console.error("API Error:", err);
    updateLastBotMessage("There was a problem contacting the bot. Check the console for details.");
  }
}

function updateLastBotMessage(newText) {
  const messages = chatLog.querySelectorAll('.message');
  if (messages.length > 0) {
    messages[messages.length - 1].innerHTML = `<span class="sender"><strong>NateBot:</strong></span>${newText}`;
  }
}

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = 'message';

  if (sender === 'NateBot') {
    msg.innerHTML = `<span class="sender"><strong>${sender}:</strong></span> ${text}`;
  } else {
    msg.innerHTML = `<span class="sender"><strong>${sender}:</strong></span><span> ${escapeHTML(text)}</span>`;
  }

  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.getElementById('chat-container');
  const toggleButton = document.getElementById('chat-toggle');
  const chipContainer = document.getElementById('chat-prompts');

  const wasCollapsed = localStorage.getItem('chatCollapsed') === 'true';
  if (chatContainer && (window.innerWidth <= 640 || wasCollapsed)) {
    chatContainer.classList.add('collapsed');
  }

  const hiddenChips = JSON.parse(localStorage.getItem('hiddenChips') || '[]');
  hiddenChips.forEach(id => {
    const chip = document.getElementById(id);
    if (chip) chip.style.display = 'none';
  });

  if (chipContainer) {
    const visibleChips = chipContainer.querySelectorAll('.chip:not([style*="display: none"])');
    if (visibleChips.length === 0) {
      chipContainer.style.display = 'none';
    }
  }

  botIntroMessage();
});

const botMessageEl = document.getElementById('message');
const typingEl = document.getElementById('typing-indicator');

const loadingMessages = [
  "Warming up my circuits…",
  "Downloading sass module…",
  "Calibrating charisma sensors…",
  "Searching Nathan’s brain…",
  "Applying CSS to my thoughts…",
  "Just a sec… gotta look cool first."
];

function getRandomGreeting() {
  return wittyGreetings[Math.floor(Math.random() * wittyGreetings.length)];
}

function getRandomLoadingMessage() {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}

function typeMessage(el, text, speed = 40, callback) {
  el.innerHTML = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function botIntroMessage() {
  const loadingText = getRandomLoadingMessage();
  typingEl.innerText = loadingText;

  setTimeout(() => {
    typingEl.innerText = '';
    addMessage("NateBot", "Hi there! I’m NateBot — Nathan’s virtual sidekick. What’s your name?");
  }, 1500);
}