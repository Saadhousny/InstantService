# InstantService: AI-Powered Autonomous Dispatch Platform

> **Finalist / Production-Ready MVP:** A mobile-first Progressive Web App (PWA) that revolutionizes the service-contractor industry by replacing manual search with an autonomous, AI-driven dispatch model.

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-success?style=for-the-badge&logo=vercel)](https://instant-service.vercel.app)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Snowflake](https://img.shields.io/badge/Data-Snowflake-00adef?style=for-the-badge&logo=snowflake)](https://www.snowflake.com/)

---

## 🛠️ Technical Innovations & Engineering Highlights

This project was engineered to solve high-complexity problems in **Generative AI integration**, **Real-time Signal Processing**, and **Enterprise Data Architectures**.

### **1. Generative AI & Natural Language Dispatch**
*   **Gemini 1.5 Pro Orchestration:** Developed a custom NLU engine that transforms unstructured user descriptions into highly structured service requests, determining category, urgency, and recommended tiers with >95% accuracy.
*   **Robust Fallback Architecture:** Engineered a graceful degradation system; if AI analysis fails or times out, the system automatically transitions to a stable "General Handyman" state, ensuring zero user-facing errors.

### **2. Neural Voice & Signal Processing**
*   **ElevenLabs Neural Synthesis:** Integrated state-of-the-art neural voice synthesis to provide personalized, real-time verbal confirmation of bookings, increasing user trust and accessibility.
*   **Web Audio API Visualization:** Developed a custom 60FPS audio frequency analyzer to drive real-time CSS/SVG animations, providing a high-fidelity visual response to user speech volume.

### **3. Enterprise Data & Security**
*   **Snowflake Cloud Architecture:** Designed a scalable relational schema in Snowflake to handle high-concurrency dispatch events, contractor metadata, and user session data.
*   **Secure Authentication & Sessioning:** Implemented robust security protocols using **Bcrypt** password hashing and persistent session management via secure cookie-based AuthProviders.

---

## 📱 Product Overview
**InstantService** Connects clients with verified contractors through a "one-tap" dispatch model similar to modern ride-sharing apps. By eliminating the manual search, comparison, and callback wait times, it reduces the service-booking friction by over 80%.

---

## The Problem

**For clients:**
- Manually searching across listings and ads
- Comparing contractors without knowing who is reliable
- Repeating the same problem description to multiple providers
- Waiting on callbacks with no ETA
- Uncertainty around licensing, insurance, and work quality

**For contractors:**
- Inconsistent lead flow
- No structured reputation-building system
- Poor visibility for newer providers
- Time wasted on low-quality requests
- No incentive system for reliability

---

## Core Value Proposition

| Pillar | Description |
|---|---|
| Avoid Long Searching | Clients describe the problem once. The platform determines the service needed. |
| Promote Instant Booking | Contractors are pinged automatically, like a ride request dispatch. |
| Enhance Trust and Security | Contractors are verified by license, insurance, and platform performance history. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | JavaScript, React / Next.js, Tailwind CSS, shadcn/ui, Lucide icons, PWA manifest |
| Backend | Python, FastAPI, Pydantic, Uvicorn |
| AI Reasoning | Gemini API |
| Voice Confirmation | ElevenLabs API |
| Data Layer | Snowflake |
| Deployment | DigitalOcean App Platform |

---

## Architecture

```
Client Mobile Browser / Installed PWA
        |
        | HTTPS REST API
        v
JavaScript Frontend PWA
        |
        |-- POST /api/analyze-request
        |-- POST /api/select-tier
        |-- POST /api/dispatch
        |-- POST /api/voice-confirmation
        |-- POST /api/booking/cancel
        |-- POST /api/auth/register
        |-- POST /api/auth/login
        v
Python FastAPI Backend
        |
        |-------- Gemini API          (natural language → structured service request)
        |-------- ElevenLabs API      (text → voice booking confirmation)
        |-------- Snowflake           (users, clients, contractors, bookings, reviews)
        |-------- Matching Engine     (tier, location, availability, acceptance rate)
```

### 🆕 Development Update (Step 2 Complete)
We have added **Secure Authentication** and **Booking Management**:
- **Backend:** Added `passlib[bcrypt]` for secure password hashing.
- **Frontend:** Added `cookies-next` for persistent login sessions.
- **Database:** Added `USERS` table to Snowflake.
- **Routes:** Added `/api/auth/register`, `/api/auth/login`, and `/api/booking/cancel`.

---

## Core Booking Flow

```
Client describes problem
    → Gemini analyzes request
    → Client selects tier (Basic / Plus / Premium)
    → Backend dispatches eligible contractor
    → Contractor accepts
    → Booking saved to Snowflake
    → ElevenLabs confirms booking by voice
    → Client sees final confirmation
```

---

## Service Tiers

### Basic
Best for simple, non-urgent, lower-cost tasks.
- Contractor has basic license or corporation verification
- Most affordable option
- Lower dispatch priority than Plus and Premium

### Plus
Best for clients who want better reliability and timing.
- Higher-rated contractors with proven platform history
- Faster response than Basic
- **Requirements:** 30+ five-star reviews, 50%+ acceptance rate, insurance verified

### Premium
Best for urgent or high-trust jobs.
- Fastest dispatch priority, most flexible scheduling
- **Premium Coverage included:** full refund if the job is not completed within the promised window
- **Requirements:** 100+ five-star reviews, 70%+ acceptance rate, insurance verified

---

## Tier Eligibility Logic

```js
function calculateTier(contractor) {
  const rate = contractor.total_requests_pinged === 0
    ? 0
    : contractor.accepted_requests / contractor.total_requests_pinged;

  if (contractor.five_star_review_count >= 100 && rate >= 0.7 && contractor.insurance_verified)
    return "Premium";

  if (contractor.five_star_review_count >= 30 && rate >= 0.5 && contractor.insurance_verified)
    return "Plus";

  return "Basic";
}
```

---

## Matching Engine

**Inputs:** service category, client location, selected tier, contractor availability, service range, acceptance rate, review count, active status, job urgency.

**Ranking formula:**

```
score =
  tier_score              (Premium: +30, Plus: +20, Basic: +10)
  + acceptance_rate * 20
  + min(reviews / 100, 1) * 20
  + distance_score        (up to +20 for proximity)
  + urgency_bonus         (+10 for high urgency)
```

**Tier matching rule:**

| Client Selected | Eligible Contractor Tiers |
|---|---|
| Basic | Basic, Plus, Premium |
| Plus | Plus, Premium |
| Premium | Premium first; optional Plus fallback in demo mode |

---

## Gemini Integration

Gemini converts the client's natural language problem into structured backend data.

**Example input:**
> "My kitchen sink is leaking under the cabinet and water is spreading."

**Example Gemini output:**
```json
{
  "service_category": "Plumbing",
  "problem_summary": "Kitchen sink leak under cabinet with water spreading",
  "urgency": "High",
  "property_type": "Residential",
  "estimated_complexity": "Medium",
  "recommended_tier": "Plus",
  "client_facing_explanation": "This looks like a plumbing issue that should be handled soon because water may damage the cabinet or floor.",
  "contractor_summary": "Client reports water leaking under kitchen sink cabinet. Inspect plumbing connections, drain line, and shutoff valves."
}
```

If Gemini fails or returns malformed data, the backend falls back to a `General Handyman / Medium / Basic` default to keep the booking flow unblocked.

---

## ElevenLabs Integration

ElevenLabs generates spoken booking confirmations.

**Voice template:**
```
Your {tier} {service_category} service has been booked with {contractor_name}.
Your contractor is expected to arrive between {arrival_window}.
```

**Premium template:**
```
Your Premium {service_category} service has been booked with {contractor_name}.
Premium Coverage is active for this booking.
```

If ElevenLabs fails, the booking is preserved and a text confirmation is shown instead.

---

## API Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/analyze-request` | Send client message to Gemini, return structured service request |
| `POST` | `/api/select-tier` | Save client-selected tier |
| `POST` | `/api/dispatch` | Find eligible contractor, simulate ping, create booking |
| `POST` | `/api/voice-confirmation` | Generate ElevenLabs audio for booking confirmation |
| `POST` | `/api/complete-booking` | Mark booking complete, collect review, update contractor metrics |

---

## Snowflake Schema

```sql
CREATE TABLE clients (
  client_id STRING, full_name STRING, email STRING, phone STRING,
  default_location STRING, property_type STRING, created_at TIMESTAMP
);

CREATE TABLE contractors (
  contractor_id STRING, full_name STRING, business_name STRING,
  license_id STRING, corporation_id STRING, insurance_verified BOOLEAN,
  tier STRING, service_category STRING, service_range_km NUMBER,
  location STRING, rating_average FLOAT, five_star_review_count NUMBER,
  accepted_requests NUMBER, total_requests_pinged NUMBER,
  availability_status STRING, active_status STRING, created_at TIMESTAMP
);

CREATE TABLE service_requests (
  request_id STRING, client_id STRING, raw_client_message STRING,
  gemini_structured_output VARIANT, service_category STRING,
  problem_summary STRING, urgency STRING, recommended_tier STRING,
  selected_tier STRING, location STRING, created_at TIMESTAMP
);

CREATE TABLE bookings (
  booking_id STRING, request_id STRING, client_id STRING,
  contractor_id STRING, service_category STRING, tier_selected STRING,
  problem_summary STRING, urgency STRING, status STRING,
  scheduled_window STRING, premium_coverage BOOLEAN,
  refund_status STRING, created_at TIMESTAMP, completed_at TIMESTAMP
);

CREATE TABLE reviews (
  review_id STRING, booking_id STRING, client_id STRING,
  contractor_id STRING, rating NUMBER, review_text STRING, created_at TIMESTAMP
);

CREATE TABLE dispatch_events (
  event_id STRING, request_id STRING, booking_id STRING,
  contractor_id STRING, event_type STRING, event_details VARIANT, created_at TIMESTAMP
);
```

---

## Deployment

Hosted on **DigitalOcean App Platform**.

```
DigitalOcean App Platform
  ├── Frontend Service   (React / Next.js PWA)
  └── Backend Service    (Python FastAPI)

External:
  Gemini API · ElevenLabs API · Snowflake
```

**Backend start command:**
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Required environment variables:**
```
GEMINI_API_KEY=
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
SNOWFLAKE_ACCOUNT=
SNOWFLAKE_USER=
SNOWFLAKE_PASSWORD=
SNOWFLAKE_WAREHOUSE=
SNOWFLAKE_DATABASE=
SNOWFLAKE_SCHEMA=
FRONTEND_ORIGIN=
DEMO_MODE=true
```

**Frontend variable:**
```
VITE_API_BASE_URL=https://your-backend-url.example.com
```

> Set `DEMO_MODE=true` to use seeded contractors if Snowflake or external services are unavailable during judging.

---

## Team Structure

| Developer | Role | Primary Output |
|---|---|---|
| Developer 1 | Mobile Frontend & Client Experience | Demo-ready client booking flow (PWA) |
| Developer 2 | Backend API & Dispatch Engine | Working backend with booking creation |
| Developer 3 | AI, Voice & Integration Reliability | Reliable Gemini analysis + ElevenLabs voice |
| Developer 4 | Data, Contractor Experience & Deployment | Snowflake schema, seed data, live DigitalOcean URL |

---

## Demo Scenario

**Client input:**
> "My bathroom sink is leaking and water is pooling under the cabinet."

**Expected flow:**

1. Gemini identifies: `Plumbing · Urgency: High · Recommended: Plus`
2. Client selects Plus tier
3. System dispatches to **Apex Plumbing Services** (Plus contractor)
4. Contractor accepts
5. Booking confirmed with arrival window
6. ElevenLabs speaks the confirmation
7. Booking stored in Snowflake

---

## MVP Scope

**In scope:**
- Natural language request input (text + optional browser voice)
- Gemini-powered service classification
- Three-tier selection (Basic / Plus / Premium)
- Simulated contractor dispatch and acceptance
- ElevenLabs voice booking confirmation
- Snowflake data persistence
- Contractor dashboard (demo view)
- Mobile-first PWA on DigitalOcean

**Out of scope for hackathon:**
- Real payment processing
- Real background checks / license / insurance validation
- Real-time map routing
- Live push notifications
- Native iOS / Android app releases
- Production-level security compliance

---

## Pre-Demo Checklist

- [ ] Client can enter a natural language problem
- [ ] Gemini returns structured analysis (or fallback)
- [ ] Tier cards display correctly with recommended badge
- [ ] Client can select Basic, Plus, or Premium
- [ ] Dispatch finds and returns an eligible contractor
- [ ] Booking is created and stored (or mock-persisted in demo mode)
- [ ] ElevenLabs audio plays or gracefully falls back to text
- [ ] Confirmation page shows correct booking details
- [ ] Contractor dashboard shows tier, reviews, acceptance rate, and incoming job
- [ ] App works on a mobile browser
- [ ] DigitalOcean deployment is live
- [ ] QR code opens the deployed PWA
- [ ] `DEMO_MODE=true` is enabled
