# InstantService Architecture

## 1. Architecture Goal

InstantService is a mobile-first Progressive Web App that lets a client describe a service problem, uses Gemini to understand the request, lets the client choose a trust tier, dispatches the request to an eligible contractor, confirms the booking with ElevenLabs voice, and stores operational data in Snowflake.

The architecture is designed for a hackathon MVP, so it prioritizes a complete demo flow, clear separation between frontend and backend, simple deployability, and realistic simulation where production integrations would be too large to build during the event.

## 2. High-Level System Overview

```text
Client Mobile Browser / Installed PWA
        |
        | HTTPS REST API calls
        v
JavaScript Frontend PWA
        |
        | /api/analyze-request
        | /api/select-tier
        | /api/dispatch
        | /api/voice-confirmation
        | /api/complete-booking
        v
Python Backend API, preferably FastAPI
        |
        |-------- Gemini API
        |             Natural language problem analysis
        |
        |-------- ElevenLabs API
        |             Text-to-speech booking confirmation
        |
        |-------- Snowflake
        |             Clients, contractors, requests, bookings, reviews, analytics
        |
        |-------- Matching Engine
                      Tier, location, availability, category, acceptance-rate logic
```

The final product should feel like an Uber-style dispatch experience for real-world service work. The client does not browse contractors. They describe the problem, choose Basic, Plus, or Premium, and the system handles the rest.

## 3. Core Product Flow

### 3.1 Client Flow

1. The client opens the InstantService PWA from a phone browser, QR code, or installed home-screen shortcut.
2. The client enters a problem using text or browser voice input.
3. The frontend sends the message to the backend.
4. The backend sends the message to Gemini.
5. Gemini returns structured JSON containing service category, urgency, complexity, recommended tier, client explanation, and contractor summary.
6. The frontend displays the AI result and tier selection screen.
7. The client chooses Basic, Plus, or Premium.
8. The frontend sends the selected tier to the backend.
9. The backend dispatch engine finds eligible contractors.
10. The backend simulates contractor pinging until one contractor accepts.
11. The backend creates a booking and stores it in Snowflake.
12. The frontend displays the accepted contractor and arrival window.
13. The backend generates a voice confirmation with ElevenLabs.
14. The frontend plays the confirmation audio.
15. The final confirmation page shows booking details.

### 3.2 Contractor Flow

1. A contractor profile exists in seeded data or Snowflake.
2. The contractor has verification fields, tier, location, service range, reviews, and acceptance metrics.
3. When a matching request is created, the contractor is considered if they meet tier, category, location, availability, and verification requirements.
4. The contractor receives a simulated job ping in the contractor dashboard.
5. The contractor accepts, declines, or ignores.
6. Accepted requests create bookings.
7. Declined or ignored requests update acceptance metrics.
8. Completed bookings and reviews update future tier eligibility.

## 4. Frontend Architecture

### 4.1 Recommended Stack

- JavaScript
- React or Next.js
- Tailwind CSS
- shadcn/ui, if available
- Lucide icons
- PWA manifest
- Service worker for installability and basic offline shell support
- Browser speech input for optional voice-to-text
- Standard HTML audio playback for ElevenLabs output

### 4.2 Frontend Responsibilities

The frontend is responsible for user experience, mobile-first screens, state transitions, and API communication. It should not contain private API keys, matching rules that must be trusted, or direct Snowflake access.

Frontend responsibilities include:

- Collecting the client problem description.
- Optionally accepting browser speech input.
- Calling the backend request-analysis endpoint.
- Displaying Gemini-generated results.
- Showing Basic, Plus, and Premium tier cards.
- Highlighting Gemini’s recommended tier.
- Triggering dispatch.
- Showing loading, pinging, accepted, failed, and confirmation states.
- Playing ElevenLabs-generated audio.
- Providing a simple contractor dashboard for the demo.

### 4.3 Main Screens

#### Home Screen

Purpose: capture the service problem.

Components:

- App logo or name
- Prompt: “What problem are you having?”
- Text input area
- Voice input button
- Submit button
- Loading state while Gemini analyzes the request
- Error state if analysis fails

#### AI Analysis Result

Purpose: show what Gemini understood.

Components:

- Service category
- Problem summary
- Urgency badge
- Estimated complexity
- Recommended tier
- Short client-facing explanation

#### Tier Selection Screen

Purpose: let the client choose a service tier.

Components:

- Basic card
- Plus card
- Premium card
- Recommended badge on the Gemini-suggested tier
- Explanation of each tier
- Continue button

Tier behavior:

- The user may choose the recommended tier or override it.
- Premium shows Premium Coverage messaging.
- Basic emphasizes affordability.
- Plus emphasizes reliability.

#### Dispatch Screen

Purpose: simulate the instant matching experience.

Components:

- “Finding available contractors...” state
- Animated ping or progress indicator
- Current tier selected
- Current service category
- Accepted contractor card once matched
- Fallback state if no contractor is available

#### Confirmation Screen

Purpose: show successful booking.

Components:

- Booking ID
- Service category
- Selected tier
- Contractor name
- Arrival window
- Premium Coverage status
- Audio playback button
- Booking status

#### Contractor Dashboard

Purpose: demo the contractor side.

Components:

- Contractor name
- Current tier
- Review count
- Acceptance rate
- Availability status
- Incoming job ping
- Accept button
- Decline button
- Updated metrics after action

### 4.4 Frontend State Model

A simple frontend state machine makes the flow easier to manage.

```text
idle
  -> analyzing
  -> analyzed
  -> tier_selected
  -> dispatching
  -> accepted
  -> voice_generating
  -> confirmed

error states:
  analyzing_failed
  dispatch_failed
  voice_failed
```

Recommended client-side state object:

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

### 4.5 Frontend Edge Cases

| Edge Case | Frontend Handling |
|---|---|
| Empty problem input | Disable submit or show validation message. |
| Very short input | Ask user to add more detail. |
| Gemini returns unclear category | Show “General Handyman” fallback and allow continuing. |
| Slow analysis | Show loading state and avoid duplicate submits. |
| Dispatch fails | Show options to try another tier, try later, or use demo fallback contractor. |
| ElevenLabs fails | Show booking confirmation without audio. |
| User refreshes page | Store current request ID and booking ID in localStorage for demo recovery. |
| Mobile network issue | Show retry button and preserve typed message. |
| Unsupported browser speech input | Hide voice input or show text input only. |

## 5. Backend Architecture

### 5.1 Recommended Stack

- Python
- FastAPI
- Pydantic models for request and response validation
- Uvicorn server
- HTTP client such as `httpx` or `requests`
- Snowflake Python connector
- Environment variables for secrets
- Optional in-memory mock data for backup demo mode

### 5.2 Backend Responsibilities

The backend is the trusted layer of the system. It owns external API calls, matching decisions, data persistence, and business rules.

Backend responsibilities include:

- Validating frontend requests.
- Calling Gemini with a controlled prompt.
- Validating Gemini output.
- Storing service request logs.
- Saving selected tier.
- Running contractor matching logic.
- Simulating ping, accept, decline, and timeout behavior.
- Creating bookings.
- Updating acceptance-rate counters.
- Calling ElevenLabs for text-to-speech.
- Writing booking and review data to Snowflake.
- Returning clean API responses to the frontend.

### 5.3 Backend Layering

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
  gemini_service.py
  elevenlabs_service.py
  snowflake_service.py
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

### 5.4 Environment Variables

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

`DEMO_MODE=true` allows the backend to use seeded mock contractors if Snowflake or external services are unavailable during judging.

## 6. API Design

### 6.1 POST /api/analyze-request

Purpose: analyze the raw client message using Gemini and create a service request record.

Input:

```json
{
  "client_id": "client_001",
  "message": "My kitchen sink is leaking under the cabinet",
  "location": "Toronto",
  "property_type": "Residential"
}
```

Backend steps:

1. Validate message length and required fields.
2. Build Gemini prompt.
3. Call Gemini.
4. Parse response as JSON.
5. Validate required fields.
6. Apply fallback defaults if needed.
7. Create `request_id`.
8. Store raw message and structured output in Snowflake.
9. Return structured analysis to frontend.

Output:

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

### 6.2 POST /api/select-tier

Purpose: store the client-selected tier.

Input:

```json
{
  "request_id": "req_001",
  "selected_tier": "Plus"
}
```

Backend steps:

1. Validate that selected tier is Basic, Plus, or Premium.
2. Verify the request exists.
3. Save selected tier.
4. Return the updated request state.

Output:

```json
{
  "request_id": "req_001",
  "selected_tier": "Plus",
  "status": "tier_selected"
}
```

### 6.3 POST /api/dispatch

Purpose: find an eligible contractor and create a booking.

Input:

```json
{
  "request_id": "req_001",
  "tier": "Plus",
  "service_category": "Plumbing",
  "location": "Toronto"
}
```

Backend steps:

1. Load service request.
2. Load contractors from Snowflake or mock seed data.
3. Filter by service category.
4. Filter by selected tier eligibility.
5. Filter by availability.
6. Filter by service range and location.
7. Rank contractors.
8. Ping contractors in ranked order.
9. Simulate accept, decline, or ignored state.
10. Update acceptance metrics.
11. Create booking if accepted.
12. Return booking result.

Output:

```json
{
  "booking_id": "book_001",
  "contractor_id": "cont_002",
  "contractor_name": "Apex Plumbing Services",
  "status": "Accepted",
  "arrival_window": "2:00 PM - 3:00 PM",
  "premium_coverage": false
}
```

### 6.4 POST /api/voice-confirmation

Purpose: generate playable audio confirmation using ElevenLabs.

Input:

```json
{
  "booking_id": "book_001",
  "text": "Your Plus plumbing service has been booked with Apex Plumbing Services."
}
```

Backend steps:

1. Validate booking exists.
2. Build confirmation text if frontend did not provide one.
3. Call ElevenLabs.
4. Store or return audio as URL/base64 depending on implementation.
5. Return audio reference.

Output:

```json
{
  "booking_id": "book_001",
  "audio_url": "generated-audio-url-or-base64",
  "voice_status": "generated"
}
```

### 6.5 POST /api/complete-booking

Purpose: mark booking complete, collect rating, and update contractor metrics.

Input:

```json
{
  "booking_id": "book_001",
  "rating": 5,
  "review_text": "Fast and professional."
}
```

Backend steps:

1. Validate booking.
2. Mark booking as complete.
3. Create review.
4. If rating is 5, increment five-star review count.
5. Recalculate contractor tier.
6. Save updates.

Output:

```json
{
  "booking_id": "book_001",
  "status": "Completed",
  "contractor_tier": "Plus",
  "five_star_review_count": 46
}
```

## 7. Gemini Integration Architecture

### 7.1 Purpose

Gemini acts as the AI dispatcher. It converts messy client language into structured backend data.

### 7.2 Gemini Input

The backend sends:

- Raw client problem message
- Optional property type
- Optional location
- Allowed service categories
- Allowed urgency values
- Allowed tier values
- Required JSON schema

### 7.3 Gemini Output Contract

Gemini must return only valid JSON:

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

### 7.4 Gemini Validation

The backend should never blindly trust Gemini output.

Validation rules:

- Response must parse as JSON.
- Required keys must exist.
- `service_category` must match allowed categories or fallback to `General Handyman`.
- `urgency` must be `Low`, `Medium`, or `High`.
- `recommended_tier` must be `Basic`, `Plus`, or `Premium`.
- Explanation text should be limited to a safe display length.

### 7.5 Gemini Failure Fallback

If Gemini fails, returns malformed JSON, or times out:

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

## 8. Matching and Dispatch Architecture

### 8.1 Matching Inputs

The matching engine uses:

- Service category from Gemini
- Client location
- Selected tier
- Contractor service category
- Contractor location
- Contractor service range
- Contractor availability status
- Contractor tier
- Contractor review count
- Contractor acceptance rate
- Contractor active status
- Job urgency

### 8.2 Contractor Eligibility

A contractor is eligible when:

1. Their service category matches the request.
2. Their tier meets the selected tier requirement.
3. They are available.
4. They are within service range.
5. Their verification documents meet tier requirements.
6. They are active and not blocked.

### 8.3 Tier Matching Rule

Recommended MVP rule:

- Basic request: match Basic, Plus, or Premium contractors.
- Plus request: match Plus or Premium contractors.
- Premium request: match Premium contractors first, with optional Plus fallback only if demo requires it.

This keeps Premium meaningful while preventing Basic requests from failing too often.

### 8.4 Ranking Formula

For the MVP, use a simple scoring formula:

```text
score =
  tier_score
  + acceptance_rate_score
  + review_score
  + distance_score
  + urgency_bonus
```

Example weights:

```text
Premium tier: +30
Plus tier: +20
Basic tier: +10
Acceptance rate: acceptance_rate * 20
Review count: min(five_star_review_count / 100, 1) * 20
Distance: closer contractors get up to +20
Urgency: high urgency gives available higher-tier contractors +10
```

### 8.5 Ping Simulation

```text
eligible_contractors = filter_contractors(request)
ranked_contractors = sort_by_score(eligible_contractors)

for contractor in ranked_contractors:
    increment total_requests_pinged
    simulate response
    if accepted:
        increment accepted_requests
        create booking
        return accepted booking
    else:
        continue to next contractor

return dispatch_failed
```

### 8.6 Acceptance Rate

```text
acceptance_rate = accepted_requests / total_requests_pinged
```

Rules:

- Accept increases `accepted_requests` and `total_requests_pinged`.
- Decline increases only `total_requests_pinged`.
- Ignore counts as decline for MVP purposes.
- If `total_requests_pinged` is zero, acceptance rate should be treated as zero or shown as “New”.

### 8.7 Tier Eligibility Logic

```js
function calculateTier(contractor) {
  const acceptanceRate =
    contractor.total_requests_pinged === 0
      ? 0
      : contractor.accepted_requests / contractor.total_requests_pinged;

  if (
    contractor.five_star_review_count >= 100 &&
    acceptanceRate >= 0.7 &&
    contractor.insurance_verified
  ) {
    return "Premium";
  }

  if (
    contractor.five_star_review_count >= 30 &&
    acceptanceRate >= 0.5 &&
    contractor.insurance_verified
  ) {
    return "Plus";
  }

  return "Basic";
}
```

The production backend should implement the same logic in Python so tier calculation stays trusted server-side.

## 9. Snowflake Data Architecture

### 9.1 Snowflake Role

Snowflake stores operational and analytics data:

- Clients
- Contractors
- Bookings
- Reviews
- Acceptance-rate metrics
- Service request logs
- Gemini structured outputs
- Tier performance analytics

For the hackathon, Snowflake can be used directly by the backend. The frontend should never connect to Snowflake.

### 9.2 Tables

#### CLIENTS

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

#### CONTRACTORS

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

#### SERVICE_REQUESTS

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

#### BOOKINGS

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

#### REVIEWS

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

#### DISPATCH_EVENTS

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

`DISPATCH_EVENTS` is useful for showing how the system pinged contractors and for later analytics.

### 9.3 Seed Data

The MVP should seed at least:

- One Basic plumbing contractor
- One Plus plumbing contractor
- One Premium plumbing contractor
- One demo client
- Optional contractors for HVAC, electrical, and general handyman work

This guarantees the demo scenario can complete successfully.

## 10. ElevenLabs Architecture

### 10.1 Purpose

ElevenLabs adds a polished voice layer to the demo by speaking booking confirmations, chatbot explanations, or contractor alerts.

### 10.2 Backend Flow

1. The booking is created.
2. The backend builds a confirmation message.
3. The backend sends the text to ElevenLabs.
4. ElevenLabs returns audio data.
5. The backend returns either a base64 audio string or a generated audio URL.
6. The frontend plays the audio.

### 10.3 Voice Confirmation Text Template

```text
Your {tier} {service_category} service has been booked with {contractor_name}. Your contractor is expected to arrive between {arrival_window}.
```

Premium example:

```text
Your Premium plumbing service has been booked with Elite Rapid Repairs. Premium Coverage is active for this booking.
```

### 10.4 ElevenLabs Failure Handling

If ElevenLabs fails:

- Keep the booking confirmed.
- Show text confirmation.
- Display “Voice confirmation unavailable.”
- Do not block the main booking flow.

## 11. Premium Coverage Architecture

Premium Coverage applies only to Premium bookings.

MVP rules:

- If `tier_selected = Premium`, set `premium_coverage = true`.
- Add a promised completion or arrival window.
- If the booking becomes `late` or `not_completed`, set `refund_status = eligible_if_late`.
- No real payment or refund processing is required.

Example booking fields:

```json
{
  "tier_selected": "Premium",
  "premium_coverage": true,
  "promised_completion_window": "2 hours",
  "refund_status": "eligible_if_late"
}
```

## 12. Deployment Architecture

### 12.1 Recommended Deployment

Use DigitalOcean App Platform.

Recommended services:

```text
DigitalOcean App Platform
  ├── Frontend Service
  │     JavaScript React or Next.js PWA
  │
  └── Backend Service
        Python FastAPI API
```

External services:

```text
Gemini API
ElevenLabs API
Snowflake
```

### 12.2 Frontend Deployment

The frontend is built and deployed as a static or Node-backed app.

Required deployment items:

- PWA manifest
- Mobile metadata
- Service worker
- HTTPS URL
- Environment variable for backend API base URL

Example frontend environment variable:

```text
VITE_API_BASE_URL=https://instantservice-api.example.com
```

### 12.3 Backend Deployment

The backend runs as a Python web service.

Required deployment items:

- `requirements.txt`
- Start command such as `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Environment variables for Gemini, ElevenLabs, Snowflake, and CORS
- Health-check endpoint

### 12.4 CORS

The backend should only allow the deployed frontend origin.

Example:

```text
FRONTEND_ORIGIN=https://instantservice.example.com
```

For local development, allow:

```text
http://localhost:5173
http://localhost:3000
```

## 13. Security and Privacy Considerations

For the MVP, security should be simple but intentional.

### 13.1 API Key Safety

- Store Gemini, ElevenLabs, and Snowflake credentials only in backend environment variables.
- Never expose API keys to the frontend.
- Do not commit `.env` files.

### 13.2 Input Validation

Validate:

- Message length
- Tier names
- Request IDs
- Booking IDs
- Rating values
- Contractor actions

### 13.3 Data Privacy

Avoid storing unnecessary sensitive information. For a demo, use mock users and mock contractor verification details.

### 13.4 Abuse Prevention

MVP protections:

- Prevent duplicate submit while request is analyzing.
- Limit message size.
- Use backend validation for all state changes.
- In production, add rate limiting and authentication.

## 14. Error Handling Strategy

### 14.1 Gemini Errors

| Problem | Handling |
|---|---|
| API timeout | Use fallback General Handyman analysis. |
| Malformed JSON | Attempt JSON cleanup once, then fallback. |
| Missing fields | Fill defaults and log warning. |
| Unsafe or irrelevant input | Ask for a clearer home/service-related request. |

### 14.2 Dispatch Errors

| Problem | Handling |
|---|---|
| No contractor for selected tier | Offer different tier or demo fallback. |
| All contractors decline | Show “No contractor accepted” and suggest retry. |
| Contractor unavailable after match | Re-dispatch to next contractor. |
| Snowflake write fails | Continue with in-memory booking if `DEMO_MODE=true`. |

### 14.3 Voice Errors

| Problem | Handling |
|---|---|
| ElevenLabs timeout | Continue without audio. |
| Audio URL unavailable | Show text confirmation only. |
| Browser autoplay blocked | Show play button. |

### 14.4 Snowflake Errors

| Problem | Handling |
|---|---|
| Connection failure | Use mock data in demo mode. |
| Insert failure | Log error and return user-safe response. |
| Query timeout | Retry once, then fallback. |

## 15. Demo Mode Architecture

Demo mode is important for hackathon reliability.

When `DEMO_MODE=true`:

- Use seeded contractors if Snowflake fails.
- Use a deterministic dispatch result for the main demo scenario.
- Store booking in memory if database insert fails.
- Return a pre-generated or mocked audio URL if ElevenLabs fails.
- Keep the user-facing flow successful unless the input is invalid.

Recommended main demo scenario:

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

## 16. End-to-End Sequence Diagram

```text
Client PWA            Backend API              Gemini              Snowflake             ElevenLabs
   |                      |                       |                     |                     |
   | submit problem       |                       |                     |                     |
   |--------------------->|                       |                     |                     |
   |                      | analyze prompt        |                     |                     |
   |                      |---------------------->|                     |                     |
   |                      | structured JSON       |                     |                     |
   |                      |<----------------------|                     |                     |
   |                      | save request          |                     |                     |
   |                      |--------------------------------------------->|                     |
   | analysis result      |                       |                     |                     |
   |<---------------------|                       |                     |                     |
   | select tier          |                       |                     |                     |
   |--------------------->|                       |                     |                     |
   | dispatch request     |                       |                     |                     |
   |--------------------->|                       |                     |                     |
   |                      | load contractors      |                     |                     |
   |                      |--------------------------------------------->|                     |
   |                      | contractor data       |                     |                     |
   |                      |<---------------------------------------------|                     |
   |                      | create booking        |                     |                     |
   |                      |--------------------------------------------->|                     |
   | accepted booking     |                       |                     |                     |
   |<---------------------|                       |                     |                     |
   | request voice        |                       |                     |                     |
   |--------------------->|                       |                     |                     |
   |                      | generate speech       |                     |                     |
   |                      |--------------------------------------------------------------->|
   |                      | audio response        |                     |                     |
   |                      |<---------------------------------------------------------------|
   | audio URL/base64     |                       |                     |                     |
   |<---------------------|                       |                     |                     |
   | play confirmation    |                       |                     |                     |
```

## 17. Suggested Implementation Milestones

### Milestone 1: Static PWA Flow

- Build mobile screens.
- Mock Gemini result.
- Mock dispatch result.
- Mock confirmation audio.

### Milestone 2: Backend API

- Build FastAPI server.
- Add request validation.
- Add mocked endpoints.
- Connect frontend to backend.

### Milestone 3: Gemini Integration

- Add real Gemini request analysis.
- Validate JSON output.
- Add fallback logic.

### Milestone 4: Matching Engine

- Seed contractor data.
- Implement eligibility filtering.
- Implement acceptance-rate updates.
- Create booking response.

### Milestone 5: Snowflake Integration

- Create tables.
- Insert service requests.
- Insert bookings.
- Read contractor seed data.

### Milestone 6: ElevenLabs Integration

- Generate confirmation text.
- Call ElevenLabs.
- Play audio in frontend.

### Milestone 7: DigitalOcean Deployment

- Deploy frontend.
- Deploy backend.
- Configure environment variables.
- Test mobile browser flow.
- Create QR code for demo.

## 18. Final Architecture Summary

InstantService is built as a mobile-first PWA frontend connected to a Python FastAPI backend. The frontend handles the client and contractor demo experience, while the backend owns AI analysis, matching, booking creation, voice generation, and database persistence.

Gemini is used as the reasoning layer that converts a client’s plain-language problem into structured service data. The matching engine uses that structured data, the selected tier, contractor availability, location, reviews, and acceptance rate to dispatch the request. Snowflake stores platform data and enables analytics. ElevenLabs adds voice confirmation. DigitalOcean hosts the live demo so judges can open the product from a mobile browser without App Store or Play Store distribution.

The result is a clean, demo-ready architecture that supports the full MVP flow:

```text
Client describes problem
    -> Gemini analyzes request
    -> Client selects tier
    -> Backend dispatches contractor
    -> Contractor accepts
    -> Booking is saved
    -> ElevenLabs confirms by voice
    -> Client sees final confirmation
```
