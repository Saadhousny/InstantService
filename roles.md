# InstantService Roles and Work Distribution

## Purpose

This document divides the InstantService hackathon MVP into 4 balanced software development roles. The goal is to keep each developer focused, reduce overlap, and make sure the team can ship one complete demo flow:

```text
Client describes problem
  -> Gemini analyzes request
  -> Client selects a tier
  -> Backend dispatches a contractor
  -> Contractor accepts
  -> Booking is saved
  -> ElevenLabs confirms by voice
  -> Client sees final confirmation
```

The project is a mobile-first Progressive Web App with a JavaScript frontend, Python backend, Gemini reasoning, ElevenLabs voice confirmation, Snowflake data storage, and DigitalOcean deployment.

---

## Team Structure Overview

| Developer | Role | Main Ownership | Primary Output |
|---|---|---|---|
| Developer 1 | Mobile Frontend and Client Experience | Client-facing PWA screens, mobile UX, frontend state, API integration | Demo-ready client booking flow |
| Developer 2 | Backend API and Dispatch Engine | FastAPI routes, booking flow, tier logic, matching simulation | Working backend that creates bookings |
| Developer 3 | AI, Voice, and Integration Reliability | Gemini analysis, ElevenLabs voice, validation, fallback behavior | Reliable AI and voice services |
| Developer 4 | Data, Contractor Experience, and Deployment | Snowflake schema, seed data, contractor dashboard, DigitalOcean deployment | Persistent data, contractor demo, live app |

---

# Developer 1: Mobile Frontend and Client Experience

## Mission

Build the polished mobile-first client experience that judges will interact with first. This developer owns the user journey from opening the app to seeing the final booking confirmation.

## Core Responsibilities

- Build the mobile-first PWA frontend using JavaScript, React or Next.js, and Tailwind CSS.
- Create the client-facing screens for problem input, AI analysis, tier selection, dispatch, and confirmation.
- Manage frontend state transitions across the booking flow.
- Connect frontend screens to backend API endpoints.
- Make the app feel smooth, fast, and demo-ready on phone screens.
- Handle common frontend edge cases so the demo does not break.

## Screens Owned

### 1. Home Screen

Includes:

- App name and short value proposition.
- Prompt: “What problem are you having?”
- Text input for the client problem.
- Optional voice input button UI.
- Submit button.
- Loading state while the request is being analyzed.
- Error state for invalid or failed requests.

### 2. AI Analysis Result Screen

Includes:

- Service category.
- Problem summary.
- Urgency badge.
- Estimated complexity.
- Gemini recommended tier.
- Short client-facing explanation.

### 3. Tier Selection Screen

Includes:

- Basic tier card.
- Plus tier card.
- Premium tier card.
- Recommended badge on the AI-suggested tier.
- Premium Coverage explanation.
- Continue button.

### 4. Dispatch Screen

Includes:

- “Finding available contractors...” state.
- Animated loading or pinging indicator.
- Selected tier display.
- Service category display.
- Accepted contractor state.
- Failed dispatch state with retry or fallback option.

### 5. Confirmation Screen

Includes:

- Booking ID.
- Service category.
- Selected tier.
- Contractor name.
- Arrival window.
- Premium Coverage status.
- Audio playback button or audio player.
- Final booking status.

## Frontend State Ownership

Developer 1 should implement a simple state model similar to:

```js
const bookingFlowState = {
  clientId: "client_001",
  rawMessage: "",
  requestId: null,
  analysis: null,
  selectedTier: null,
  dispatchResult: null,
  audioUrl: null,
  error: null,
  currentStep: "idle"
};
```

Required state transitions:

```text
idle
  -> analyzing
  -> analyzed
  -> tier_selected
  -> dispatching
  -> accepted
  -> voice_generating
  -> confirmed
```

Error states:

```text
analyzing_failed
 dispatch_failed
 voice_failed
```

## API Endpoints Consumed

Developer 1 should consume these backend routes:

- `POST /api/analyze-request`
- `POST /api/select-tier`
- `POST /api/dispatch`
- `POST /api/voice-confirmation`
- `POST /api/complete-booking`, optional for the demo

## Edge Cases to Handle

| Edge Case | Required Handling |
|---|---|
| Empty input | Disable submit or show a validation message. |
| Very short input | Ask user to add more detail. |
| Slow backend response | Show loading state and prevent duplicate submit. |
| Gemini fallback response | Still show a usable service category and allow tier selection. |
| Dispatch failure | Show retry, choose another tier, or demo fallback option. |
| ElevenLabs failure | Show booking confirmation without audio. |
| User refreshes page | Store `requestId` and `bookingId` in `localStorage` for demo recovery. |
| Mobile screen constraints | Prioritize simple cards, large buttons, and readable spacing. |

## Deliverables

- Complete client-facing mobile PWA flow.
- Responsive UI optimized for phone screens.
- Working API calls to backend.
- Loading, success, and error states.
- Audio playback component.
- Clean visual polish for judging.

## Definition of Done

Developer 1 is complete when a user can open the PWA on a phone, enter a problem, view the AI analysis, choose a tier, trigger dispatch, and see a booking confirmation with optional audio playback.

---

# Developer 2: Backend API and Dispatch Engine

## Mission

Build the trusted Python backend that receives frontend requests, validates data, runs the core booking workflow, simulates dispatch, applies tier rules, and returns clean responses to the frontend.

## Core Responsibilities

- Build the Python backend using FastAPI.
- Define Pydantic request and response models.
- Implement all core REST API routes.
- Own the matching and dispatch engine.
- Own tier eligibility and acceptance-rate calculations.
- Create and update booking objects.
- Support mock mode for demo reliability.
- Coordinate with Developer 3 for Gemini and ElevenLabs service calls.
- Coordinate with Developer 4 for Snowflake persistence.

## Backend Structure Owned

Recommended structure:

```text
api/
  routes/
    analyze_request.py
    tier.py
    dispatch.py
    voice.py
    booking.py
    contractor.py

services/
  matching_service.py
  tier_service.py
  booking_service.py

models/
  request_models.py
  response_models.py
  domain_models.py

config/
  settings.py

main.py
```

Developer 2 owns the backend shell and all routing structure. Developers 3 and 4 can plug their services into this structure.

## API Routes Owned

### 1. `POST /api/analyze-request`

Developer 2 owns the route wrapper, validation, request ID creation, and response format.

Developer 3 owns the Gemini service implementation used by this route.

Expected input:

```json
{
  "client_id": "client_001",
  "message": "My kitchen sink is leaking under the cabinet",
  "location": "Toronto",
  "property_type": "Residential"
}
```

Expected output:

```json
{
  "request_id": "req_001",
  "service_category": "Plumbing",
  "urgency": "High",
  "estimated_complexity": "Medium",
  "recommended_tier": "Plus",
  "problem_summary": "Kitchen sink leak under cabinet",
  "client_facing_explanation": "This should be handled soon to reduce water damage risk.",
  "contractor_summary": "Client reports a kitchen sink leak under the cabinet with spreading water."
}
```

### 2. `POST /api/select-tier`

Responsibilities:

- Validate selected tier.
- Confirm request exists.
- Save selected tier in memory or Snowflake.
- Return updated request state.

### 3. `POST /api/dispatch`

Responsibilities:

- Load request data.
- Load contractor data from Snowflake or mock seed data.
- Filter eligible contractors.
- Rank contractors.
- Simulate contractor pinging.
- Create booking.
- Return accepted contractor and arrival window.

### 4. `POST /api/complete-booking`

Responsibilities:

- Mark booking as completed.
- Accept rating and review text.
- Update contractor review count.
- Recalculate contractor tier.

## Matching Logic Owned

The matching engine should use:

- Service category.
- Client location.
- Selected tier.
- Contractor service category.
- Contractor location.
- Contractor service range.
- Contractor availability.
- Contractor tier.
- Five-star review count.
- Acceptance rate.
- Active status.
- Job urgency.

## Tier Matching Rule

Recommended MVP behavior:

| Client Selected Tier | Eligible Contractor Tiers |
|---|---|
| Basic | Basic, Plus, Premium |
| Plus | Plus, Premium |
| Premium | Premium first, optional Plus fallback only in demo mode |

## Ranking Formula

Use a simple scoring model:

```text
score =
  tier_score
  + acceptance_rate_score
  + review_score
  + distance_score
  + urgency_bonus
```

Suggested weights:

```text
Premium tier: +30
Plus tier: +20
Basic tier: +10
Acceptance rate: acceptance_rate * 20
Review count: min(five_star_review_count / 100, 1) * 20
Distance: closer contractors get up to +20
High urgency: +10 for available higher-tier contractors
```

## Acceptance Rate Logic

Formula:

```text
acceptance_rate = accepted_requests / total_requests_pinged
```

Rules:

- Accept increments `accepted_requests` and `total_requests_pinged`.
- Decline increments only `total_requests_pinged`.
- Ignore counts as decline for MVP purposes.
- If `total_requests_pinged` is zero, show “New” or calculate as zero.

## Tier Eligibility Logic

Backend should implement this logic in Python:

```text
Premium:
  five_star_review_count >= 100
  acceptance_rate >= 70%
  insurance_verified = true

Plus:
  five_star_review_count >= 30
  acceptance_rate >= 50%
  insurance_verified = true

Basic:
  default tier after minimum verification
```

## Demo Mode Requirements

When `DEMO_MODE=true`, Developer 2 should make sure:

- Seeded contractors are available even if Snowflake fails.
- The main plumbing demo can always complete.
- A fallback booking can be returned if dispatch fails unexpectedly.
- API responses remain stable for frontend development.

## Deliverables

- Working FastAPI backend.
- Validated API request and response models.
- Functional dispatch engine.
- Tier and acceptance-rate business logic.
- Booking creation logic.
- Mock data support for demo reliability.
- Clean API documentation or sample requests.

## Definition of Done

Developer 2 is complete when the frontend can call the backend, submit a request, select a tier, dispatch to an eligible contractor, create a booking, and receive a stable booking response.

---

# Developer 3: AI, Voice, and Integration Reliability

## Mission

Own the AI and voice experience that makes InstantService feel intelligent and polished. This developer makes sure Gemini returns structured service data and ElevenLabs returns usable confirmation audio without breaking the main flow.

## Core Responsibilities

- Implement Gemini request analysis.
- Design reliable Gemini prompts.
- Enforce structured JSON output.
- Validate and normalize Gemini responses.
- Implement fallback AI responses.
- Implement ElevenLabs text-to-speech service.
- Create confirmation text templates.
- Make external API failures non-blocking.
- Provide demo test prompts and expected outputs.

## Gemini Service Ownership

File suggestion:

```text
services/gemini_service.py
```

The Gemini service should expose a function similar to:

```python
def analyze_service_request(message: str, location: str | None, property_type: str | None) -> dict:
    pass
```

## Gemini Prompt Requirements

The prompt should instruct Gemini to act as the AI dispatcher for InstantService and return only valid JSON.

Required fields:

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

## Allowed Values

Developer 3 should normalize Gemini output to these values.

### Service Categories

- Plumbing
- Electrical
- HVAC
- Lawn Maintenance
- Painting
- Appliance Repair
- Car Maintenance
- TV Mounting
- General Handyman
- Residential Maintenance
- Commercial Maintenance

### Urgency

- Low
- Medium
- High

### Estimated Complexity

- Low
- Medium
- High

### Recommended Tier

- Basic
- Plus
- Premium

## Gemini Validation Rules

The backend should never blindly trust Gemini output. Developer 3 should enforce:

- Response must parse as JSON.
- Required fields must exist.
- Invalid service category falls back to `General Handyman`.
- Invalid urgency falls back to `Medium`.
- Invalid complexity falls back to `Medium`.
- Invalid tier falls back to `Basic`.
- Long text fields should be trimmed to safe display lengths.
- Malformed responses should trigger the fallback object.

## Gemini Failure Fallback

Use this fallback when Gemini fails, times out, or returns malformed data:

```json
{
  "service_category": "General Handyman",
  "problem_summary": "Client needs help with a service issue.",
  "urgency": "Medium",
  "property_type": "Unknown",
  "estimated_complexity": "Medium",
  "recommended_tier": "Basic",
  "client_facing_explanation": "We could not fully analyze the request, but we can still dispatch a general service provider.",
  "contractor_summary": "Client submitted a service request requiring manual review."
}
```

## ElevenLabs Service Ownership

File suggestion:

```text
services/elevenlabs_service.py
```

The ElevenLabs service should expose a function similar to:

```python
def generate_voice_confirmation(text: str) -> dict:
    pass
```

## Voice Confirmation Requirements

Developer 3 should generate confirmation text using booking details.

Basic template:

```text
Your {tier} {service_category} service has been booked with {contractor_name}. Your contractor is expected to arrive between {arrival_window}.
```

Premium template:

```text
Your Premium {service_category} service has been booked with {contractor_name}. Premium Coverage is active for this booking. Your contractor is expected to arrive between {arrival_window}.
```

## API Route Supported

Developer 3 supports Developer 2 with:

### `POST /api/voice-confirmation`

Expected input:

```json
{
  "booking_id": "book_001",
  "text": "Your Plus plumbing service has been booked with Apex Plumbing Services."
}
```

Expected output:

```json
{
  "booking_id": "book_001",
  "audio_url": "generated-audio-url-or-base64",
  "voice_status": "generated"
}
```

## Failure Handling

| Failure | Required Behavior |
|---|---|
| Gemini timeout | Return fallback analysis. |
| Gemini malformed JSON | Attempt cleanup once, then fallback. |
| Gemini missing fields | Fill defaults. |
| ElevenLabs timeout | Return `voice_status: unavailable` without failing the booking. |
| Browser cannot autoplay audio | Frontend shows a manual play button. |
| API key missing in demo | Return mocked audio response if `DEMO_MODE=true`. |

## Demo Test Prompts

Developer 3 should provide sample inputs and expected analysis outputs.

Recommended primary demo input:

```text
My bathroom sink is leaking and water is pooling under the cabinet.
```

Expected result:

```text
Service category: Plumbing
Urgency: High
Recommended tier: Plus
```

Other test inputs:

```text
My AC stopped working and the house is getting hot.
```

Expected result:

```text
Service category: HVAC
Urgency: High
Recommended tier: Premium
```

```text
I need someone to mount my TV on the wall.
```

Expected result:

```text
Service category: TV Mounting
Urgency: Low or Medium
Recommended tier: Basic or Plus
```

## Deliverables

- Gemini prompt template.
- Gemini API integration.
- JSON parsing and validation.
- Reliable fallback response.
- ElevenLabs text-to-speech integration.
- Voice confirmation template.
- Mock voice response for demo mode.
- Demo prompt test set.

## Definition of Done

Developer 3 is complete when the backend can turn a natural language client problem into reliable structured JSON and generate or mock a playable booking confirmation voice response without blocking the booking flow.

---

# Developer 4: Data, Contractor Experience, and Deployment

## Mission

Own the data layer, contractor-side demo, and final deployment. This developer makes sure the MVP has seeded contractors, persistent bookings, a contractor dashboard for the dispatch story, and a live URL for judges.

## Core Responsibilities

- Create the Snowflake schema.
- Seed sample clients, contractors, reviews, and tier data.
- Implement Snowflake read/write helpers.
- Store service request logs, bookings, dispatch events, and reviews.
- Build the contractor dashboard UI for demo purposes.
- Support contractor accept/decline simulation from the UI if time allows.
- Configure environment variables.
- Deploy frontend and backend to DigitalOcean App Platform.
- Produce a live demo URL and QR code.

## Snowflake Service Ownership

File suggestion:

```text
services/snowflake_service.py
```

The Snowflake service should support:

- Creating or initializing tables.
- Loading contractors.
- Creating service request records.
- Saving selected tier.
- Creating bookings.
- Creating dispatch events.
- Creating reviews.
- Updating contractor acceptance metrics.
- Falling back gracefully when `DEMO_MODE=true`.

## Snowflake Tables Owned

### `clients`

```sql
CREATE TABLE clients (
  client_id STRING,
  full_name STRING,
  email STRING,
  phone STRING,
  default_location STRING,
  property_type STRING,
  created_at TIMESTAMP
);
```

### `contractors`

```sql
CREATE TABLE contractors (
  contractor_id STRING,
  full_name STRING,
  business_name STRING,
  license_id STRING,
  corporation_id STRING,
  insurance_verified BOOLEAN,
  tier STRING,
  service_category STRING,
  service_range_km NUMBER,
  location STRING,
  rating_average FLOAT,
  five_star_review_count NUMBER,
  accepted_requests NUMBER,
  total_requests_pinged NUMBER,
  availability_status STRING,
  active_status STRING,
  created_at TIMESTAMP
);
```

### `service_requests`

```sql
CREATE TABLE service_requests (
  request_id STRING,
  client_id STRING,
  raw_client_message STRING,
  gemini_structured_output VARIANT,
  service_category STRING,
  problem_summary STRING,
  urgency STRING,
  recommended_tier STRING,
  selected_tier STRING,
  location STRING,
  created_at TIMESTAMP
);
```

### `bookings`

```sql
CREATE TABLE bookings (
  booking_id STRING,
  request_id STRING,
  client_id STRING,
  contractor_id STRING,
  service_category STRING,
  tier_selected STRING,
  problem_summary STRING,
  urgency STRING,
  status STRING,
  scheduled_window STRING,
  premium_coverage BOOLEAN,
  refund_status STRING,
  created_at TIMESTAMP,
  completed_at TIMESTAMP
);
```

### `reviews`

```sql
CREATE TABLE reviews (
  review_id STRING,
  booking_id STRING,
  client_id STRING,
  contractor_id STRING,
  rating NUMBER,
  review_text STRING,
  created_at TIMESTAMP
);
```

### `dispatch_events`

```sql
CREATE TABLE dispatch_events (
  event_id STRING,
  request_id STRING,
  booking_id STRING,
  contractor_id STRING,
  event_type STRING,
  event_details VARIANT,
  created_at TIMESTAMP
);
```

## Required Seed Data

Developer 4 should seed at least these contractors so the demo can succeed.

```json
[
  {
    "contractor_id": "cont_001",
    "full_name": "Samir Plumbing Co.",
    "service_category": "Plumbing",
    "tier": "Basic",
    "five_star_review_count": 12,
    "accepted_requests": 18,
    "total_requests_pinged": 40,
    "acceptance_rate": 45,
    "insurance_verified": true,
    "location": "Toronto",
    "service_range_km": 20,
    "availability_status": "Available",
    "active_status": "Active"
  },
  {
    "contractor_id": "cont_002",
    "full_name": "Apex Plumbing Services",
    "service_category": "Plumbing",
    "tier": "Plus",
    "five_star_review_count": 45,
    "accepted_requests": 58,
    "total_requests_pinged": 100,
    "acceptance_rate": 58,
    "insurance_verified": true,
    "location": "Toronto",
    "service_range_km": 25,
    "availability_status": "Available",
    "active_status": "Active"
  },
  {
    "contractor_id": "cont_003",
    "full_name": "Elite Rapid Repairs",
    "service_category": "Plumbing",
    "tier": "Premium",
    "five_star_review_count": 132,
    "accepted_requests": 86,
    "total_requests_pinged": 110,
    "acceptance_rate": 78,
    "insurance_verified": true,
    "location": "Toronto",
    "service_range_km": 30,
    "availability_status": "Available",
    "active_status": "Active"
  }
]
```

Optional seed categories:

- HVAC.
- Electrical.
- General Handyman.
- TV Mounting.

## Contractor Dashboard Ownership

The contractor dashboard should be simple and demo-focused.

Includes:

- Contractor name.
- Current tier.
- Five-star review count.
- Acceptance rate.
- Availability status.
- Incoming job card.
- Accept button.
- Decline button.
- Updated metrics after action.

This dashboard does not need full authentication for the MVP. It only needs to help explain the contractor side during judging.

## Deployment Ownership

Developer 4 owns DigitalOcean deployment.

Recommended deployment:

```text
DigitalOcean App Platform
  ├── Frontend Service
  │     JavaScript React or Next.js PWA
  │
  └── Backend Service
        Python FastAPI API
```

## Environment Variables Owned

Developer 4 should configure these in DigitalOcean:

```text
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

Frontend variable:

```text
VITE_API_BASE_URL=https://your-backend-url.example.com
```

Backend start command:

```text
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## Deployment Requirements

- Frontend must be accessible from a phone browser.
- Backend must expose a health-check endpoint.
- CORS must allow the deployed frontend origin.
- Demo URL should be converted into a QR code.
- `.env` files must not be committed.
- API keys must remain backend-only.

## Deliverables

- Snowflake schema SQL.
- Seed data script.
- Snowflake service helper.
- Contractor dashboard.
- DigitalOcean deployed frontend.
- DigitalOcean deployed backend.
- Live demo URL.
- QR code for judges.
- Deployment notes in the repository README.

## Definition of Done

Developer 4 is complete when the app has persistent or demo-mode data, seeded contractors, a visible contractor-side demo, and a live DigitalOcean URL that can be opened from a mobile browser.

---

# Shared Contracts Between Developers

## Shared API Response Standards

All backend responses should follow a predictable format:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

Error example:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "DISPATCH_FAILED",
    "message": "No contractor accepted this request."
  }
}
```

## Shared Demo Scenario

The team should optimize the final demo around this scenario:

```text
Client message:
“My bathroom sink is leaking and water is pooling under the cabinet.”

Expected AI result:
Service category: Plumbing
Urgency: High
Recommended tier: Plus

Expected dispatch:
Apex Plumbing Services accepts

Expected confirmation:
Plus plumbing service booked with arrival window
```

## Shared MVP Rules

- The frontend never calls Gemini, ElevenLabs, or Snowflake directly.
- API keys only live in backend environment variables.
- Snowflake failures should not break the demo when `DEMO_MODE=true`.
- ElevenLabs failures should not block booking confirmation.
- Gemini failures should return a fallback service analysis.
- The main demo path should work reliably even with external API issues.
- The app should be phone-first, not desktop-first.
- Payments, real background checks, real license validation, and live push notifications are out of scope.

---

# Suggested Parallel Timeline

## Phase 1: Foundation

| Developer | Tasks |
|---|---|
| Developer 1 | Build static mobile screens with mocked data. |
| Developer 2 | Create FastAPI project, models, and mocked endpoints. |
| Developer 3 | Build Gemini prompt and local mocked AI response. |
| Developer 4 | Create Snowflake schema and seed data plan. |

## Phase 2: Core Flow

| Developer | Tasks |
|---|---|
| Developer 1 | Connect frontend to mocked backend endpoints. |
| Developer 2 | Implement dispatch, tier logic, and booking creation. |
| Developer 3 | Connect real Gemini and validate JSON output. |
| Developer 4 | Seed contractors and connect Snowflake read/write helpers. |

## Phase 3: Polish and Reliability

| Developer | Tasks |
|---|---|
| Developer 1 | Add loading states, mobile polish, localStorage recovery, and audio UI. |
| Developer 2 | Add demo mode fallbacks and consistent error responses. |
| Developer 3 | Add ElevenLabs voice confirmation and mocked fallback audio. |
| Developer 4 | Build contractor dashboard and prepare deployment. |

## Phase 4: Final Demo

| Developer | Tasks |
|---|---|
| Developer 1 | Final UI pass and mobile testing. |
| Developer 2 | Confirm end-to-end API flow. |
| Developer 3 | Confirm Gemini and ElevenLabs demo behavior. |
| Developer 4 | Deploy to DigitalOcean, configure env vars, and create QR code. |

---

# Workload Balance Notes

The distribution is designed to be balanced by separating the project into four equally important layers:

1. **Developer 1 owns the user-facing client experience.** This is design-heavy and integration-heavy.
2. **Developer 2 owns the backend product logic.** This is API-heavy and business-rule-heavy.
3. **Developer 3 owns AI and voice quality.** This is external-service-heavy and reliability-heavy.
4. **Developer 4 owns data, contractor demo, and deployment.** This is infrastructure-heavy and demo-readiness-heavy.

This avoids one person owning too many risky external integrations while also making sure each developer has a visible contribution to the final presentation.

---

# Final Integration Checklist

Before the demo, the team should verify:

- [ ] Client can enter a natural language problem.
- [ ] Backend returns Gemini-generated or fallback structured analysis.
- [ ] Tier cards display correctly.
- [ ] Recommended tier is highlighted.
- [ ] Client can select Basic, Plus, or Premium.
- [ ] Dispatch finds an eligible contractor.
- [ ] Booking is created.
- [ ] Snowflake stores or mock mode preserves the booking.
- [ ] ElevenLabs audio plays or gracefully falls back.
- [ ] Confirmation page shows the correct details.
- [ ] Contractor dashboard shows tier, reviews, acceptance rate, and incoming job.
- [ ] App works on a mobile browser.
- [ ] DigitalOcean deployment is live.
- [ ] QR code opens the deployed PWA.
- [ ] Demo mode is enabled for reliability.

