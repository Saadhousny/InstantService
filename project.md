# InstantService

## 1. Project Overview

**InstantService** is a mobile-first Progressive Web App (PWA) and AI-powered service booking platform that connects clients with verified contractors through an instant request-and-dispatch model. The product is designed to be demoed directly from a mobile browser through a shareable link or QR code, without requiring App Store distribution, TestFlight, or Apple Developer accounts.

Instead of forcing users to search through dozens of contractors, compare prices, message providers, and wait for responses, InstantService allows users to explain their problem to a chatbot. The app uses **Gemini API reasoning** to understand the issue, generate the required service category, determine urgency, and dispatch the request to eligible contractors based on tier, location, availability, and acceptance behavior.

The experience is inspired by the simplicity of ride-sharing apps: the client describes the problem, chooses a service tier, and the system handles the matching.

## 2. Problem Statement

Hiring skilled tradespeople and service contractors is often slow, uncertain, and risky.

Clients usually have to:

- Search manually across websites, ads, and marketplace listings
- Compare many contractors without knowing who is reliable
- Explain the same problem multiple times
- Wait for callbacks or messages
- Worry about licenses, insurance, and work quality
- Deal with unclear expectations around arrival time and job completion

Contractors also face problems:

- Difficulty getting consistent leads
- Lack of reputation-building systems
- Poor visibility for newer contractors
- Time wasted on low-quality requests
- No clear incentive system for accepting jobs and maintaining high service quality

InstantService solves this by creating a structured, AI-assisted service dispatch platform where clients get faster help and contractors are rewarded for reliability.

## 3. Core Value Proposition

InstantService focuses on three major pitch highlights:

### 3.1 Avoid Long Searching

Clients do not browse contractor profiles manually. They explain the problem once, and the platform determines the service needed.

### 3.2 Promote Instant Booking

Clients choose a tier and submit the request. Contractors are pinged automatically, similar to how drivers receive ride requests.

### 3.3 Enhance Security and Trust

Contractors must provide verification details such as licenses, corporation IDs, insurance coverage, and app performance history. The tier system gives clients a clearer way to choose the level of reliability they want.

## 4. Target Users

### 4.1 Clients

Clients are people or businesses that need quick access to service work.

Examples:

- Homeowners
- Renters
- Small businesses
- Commercial property owners
- Residential property managers
- Students or families needing small maintenance tasks

Client requests may include:

- Plumbing issues
- Electrical problems
- HVAC issues
- Lawn maintenance
- Painting
- Appliance repair
- Car maintenance
- TV mounting
- General handyman work
- Residential or commercial maintenance

### 4.2 Contractors

Contractors are verified service providers who accept jobs through the platform.

Examples:

- Plumbers
- Electricians
- HVAC technicians
- Mechanics
- Lawn maintenance workers
- Painters
- Handymen
- Appliance repair technicians
- General maintenance workers
- Small service companies

## 5. MVP Scope

The hackathon MVP should focus on one complete working flow instead of the full marketplace.

### MVP Client Flow

1. Client opens InstantService on a mobile browser or installed PWA shortcut.
2. Client explains the problem using text or voice.
3. Gemini analyzes the request and generates the service type.
4. Client selects one of three service tiers:
   - Basic
   - Plus
   - Premium
5. System finds an eligible contractor based on tier, location, availability, and acceptance rate.
6. Contractor receives a simulated job ping.
7. Contractor accepts the job.
8. Client receives confirmation.
9. ElevenLabs voice confirms the booking.
10. Booking is saved to Snowflake.

### MVP Contractor Flow

1. Contractor has a profile with verification information.
2. Contractor belongs to a tier based on performance.
3. Contractor receives a job request.
4. Contractor accepts or declines.
5. Acceptance rate updates.
6. Completed jobs and reviews affect future tier eligibility.

## 6. Out of Scope for Hackathon MVP

To keep the project realistic, the following should be mocked or simplified:

- Real payment processing
- Real background checks
- Real government license validation
- Real insurance validation
- Real-time map routing
- Full contractor onboarding
- Full media upload system for previous work
- Complex dispute management
- Live push notifications
- Production-level security compliance
- Native iOS App Store/TestFlight release
- Native Android Play Store release

These can be described as future improvements during the pitch.

## 7. Service Request Experience

The main interaction starts with a chatbot.

Instead of asking users to choose a service manually, the chatbot asks:

> “What problem are you having?”

Example client inputs:

> “My kitchen sink is leaking under the cabinet and the water is spreading.”

> “My AC stopped working and the house is getting hot.”

> “I need someone to mount my TV on the wall.”

> “My car is making a grinding noise when I brake.”

Gemini should convert the raw message into structured data.

Example output:

```json
{
  "service_category": "Plumbing",
  "problem_summary": "Kitchen sink leak under cabinet with water spreading",
  "urgency": "High",
  "property_type": "Residential",
  "estimated_complexity": "Medium",
  "recommended_tier": "Plus",
  "client_facing_explanation": "This looks like a plumbing issue that should be handled soon because water may damage the cabinet or floor."
}
```

## 8. Tier System

InstantService does not let users compare individual contractors directly. Instead, users choose the quality tier they want.

This simplifies the experience and makes booking faster.

## 9. Client-Facing Tiers

### 9.1 Basic Tier

**Best for:** simple, non-urgent, lower-cost service tasks.

Client benefits:

- Contractor has basic license or corporation verification
- Cheapest option
- Good for small or flexible tasks
- Access to verified entry-level contractors

Limitations:

- Less flexible scheduling
- Contractor may take longer to arrive
- Contractor may take longer to complete work
- Lower priority compared to Plus and Premium jobs

Example description:

> Basic is ideal for simple tasks when cost matters more than speed. Contractors are verified but may have less platform history.

### 9.2 Plus Tier

**Best for:** clients who want better reliability, timing, and quality.

Client benefits:

- Higher-rated contractors
- Faster response than Basic
- Better reliability
- Work expected to be completed in a timely manner
- Contractors have proven app performance

Requirements for contractors to reach Plus:

- Must already qualify for Basic
- At least 30 five-star reviews
- At least 50% acceptance rate

Example description:

> Plus gives you higher-priority service from contractors with proven reviews and stronger reliability.

### 9.3 Premium Tier

**Best for:** urgent, high-priority, or high-trust jobs.

Client benefits:

- Fastest dispatch priority
- Highest-quality contractors
- Most flexible scheduling
- Premium Coverage included
- Best suited for urgent or important work

Premium Coverage:

- If the service is not completed within the promised time window, the client receives a full refund.
- This creates stronger trust and accountability.
- For the MVP, this can be simulated with a mock refund status.

Requirements for contractors to reach Premium:

- Must already qualify for Plus
- At least 100 five-star reviews
- At least 70% acceptance rate

Example description:

> Premium is for urgent or high-value jobs where speed, reliability, and coverage matter most.

## 10. Contractor Tier Progression

All contractors start at Basic after meeting minimum verification requirements.

### 10.1 Basic Contractor Requirements

A contractor must provide:

- Name or business name
- Basic license, certification, or corporation ID
- Service area
- Availability
- Insurance confirmation
- Direct deposit/payment information
- Contact information
- Service history placeholder

### 10.2 Plus Contractor Requirements

To advance from Basic to Plus:

- 30 five-star reviews
- Minimum 50% acceptance rate
- No major unresolved complaints
- Valid verification documents

### 10.3 Premium Contractor Requirements

To advance from Plus to Premium:

- 100 five-star reviews
- Minimum 70% acceptance rate
- Valid verification documents
- Valid insurance
- Strong completion history

## 11. Acceptance Rate Logic

Acceptance rate measures how often contractors accept jobs when pinged.

Formula:

```text
acceptance_rate = accepted_requests / total_requests_pinged
```

Example:

```text
If a contractor receives 100 job pings and accepts 72:
acceptance_rate = 72 / 100 = 72%
```

Acceptance rate changes when:

- Contractor accepts a job: rate improves
- Contractor declines a job: rate decreases
- Contractor ignores a job: counts as decline for MVP purposes

This creates an incentive for contractors to accept jobs and stay active.

## 12. Matching Logic

InstantService should match contractors automatically instead of showing a comparison marketplace.

### Matching Inputs

The matching engine should consider:

- Service category generated by Gemini
- Client location
- Contractor service range
- Contractor tier
- Contractor availability
- Contractor acceptance rate
- Contractor rating/review count
- Job urgency
- Contractor active status

### Matching Output

The system should return one selected contractor or simulate a ping sequence.

Example dispatch flow:

1. System finds eligible Premium contractors nearby.
2. Sends request to best match.
3. If accepted, booking is confirmed.
4. If declined, request moves to next eligible contractor.
5. If no contractor accepts, user is asked to change tier or time window.

## 13. Gemini API Integration

Gemini is the reasoning engine of InstantService.

### Gemini Responsibilities

Gemini should be used to:

- Understand the client's natural language problem
- Generate the required service category
- Determine urgency
- Estimate job complexity
- Recommend a tier
- Generate a short client-facing explanation
- Generate a contractor-facing job summary
- Generate structured JSON for the backend

### Gemini Prompt Goal

The prompt should force Gemini to output reliable structured JSON.

Example prompt:

```text
You are the AI dispatcher for InstantService.

A client will describe a service problem. Convert their message into structured JSON.

Return only valid JSON with:
- service_category
- problem_summary
- urgency
- estimated_complexity
- property_type
- recommended_tier
- client_facing_explanation
- contractor_summary

Client message:
{{client_message}}
```

### Example Gemini Response

```json
{
  "service_category": "HVAC",
  "problem_summary": "Air conditioning stopped working and indoor temperature is rising",
  "urgency": "High",
  "estimated_complexity": "Medium",
  "property_type": "Residential",
  "recommended_tier": "Premium",
  "client_facing_explanation": "This appears to be an urgent HVAC issue because the cooling system has stopped working and comfort may decline quickly.",
  "contractor_summary": "Client reports AC failure with rising indoor temperature. Inspect HVAC system, thermostat, and power supply."
}
```

## 14. ElevenLabs Integration

ElevenLabs should be used to make the experience feel faster and more polished.

### Voice Features

Use ElevenLabs for:

- Spoken booking confirmation
- Spoken chatbot response
- Spoken explanation of selected tier
- Contractor job alert voice message

Example voice output:

> “Your request has been analyzed as a plumbing issue. You selected Plus service. A verified contractor has accepted and is scheduled to arrive between 2:00 PM and 3:00 PM.”

### MVP Voice Flow

1. Gemini generates response text.
2. Backend sends text to ElevenLabs.
3. ElevenLabs returns audio.
4. Frontend plays the audio to the client.

Optional browser speech-to-text can be used for voice input.

## 15. Snowflake Integration

Snowflake should be used as the data layer and analytics engine.

### Snowflake Responsibilities

Store:

- Client profiles
- Contractor profiles
- Contractor tier information
- Bookings
- Reviews
- Acceptance rate data
- Service request logs
- Gemini-generated structured outputs

### Suggested Tables

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
  service_range_km NUMBER,
  location STRING,
  rating_average FLOAT,
  five_star_review_count NUMBER,
  accepted_requests NUMBER,
  total_requests_pinged NUMBER,
  availability_status STRING,
  created_at TIMESTAMP
);
```

#### BOOKINGS

```sql
CREATE TABLE bookings (
  booking_id STRING,
  client_id STRING,
  contractor_id STRING,
  service_category STRING,
  tier_selected STRING,
  problem_summary STRING,
  urgency STRING,
  status STRING,
  scheduled_window STRING,
  premium_coverage BOOLEAN,
  created_at TIMESTAMP
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

#### SERVICE_REQUESTS

```sql
CREATE TABLE service_requests (
  request_id STRING,
  client_id STRING,
  raw_client_message STRING,
  gemini_structured_output VARIANT,
  service_category STRING,
  recommended_tier STRING,
  created_at TIMESTAMP
);
```

## 16. DigitalOcean Integration

DigitalOcean should be used to deploy the project and make it accessible for judges through a live mobile-first PWA URL. The demo should be easy to open by scanning a QR code on any phone.

### DigitalOcean Responsibilities

Host:

- Mobile-first frontend PWA
- Python backend API
- Environment variables
- API endpoints
- Demo deployment

Recommended deployment:

- Frontend: JavaScript-based React or Next.js mobile-first PWA
- Backend: Python API using FastAPI or Flask
- Hosting: DigitalOcean App Platform
- Database: Snowflake
- AI APIs: Gemini and ElevenLabs

## 17. Suggested Tech Stack

### App Type

- Mobile-first Progressive Web App (PWA)
- Designed for phone screens first
- Accessible through a live URL or QR code
- Installable to a phone home screen where supported
- No Apple Developer account, TestFlight, App Store, or Play Store release required for the hackathon demo

### Frontend

- JavaScript
- React or Next.js
- Tailwind CSS
- shadcn/ui if available
- Lucide icons
- PWA manifest and mobile app metadata
- Browser speech input if needed

### Backend

- Python
- FastAPI recommended, Flask acceptable
- REST API structure
- Environment variables for API keys
- Python SDKs or HTTP clients for Gemini, ElevenLabs, and Snowflake integration

### AI and Data

- Gemini API for reasoning
- ElevenLabs API for text-to-speech
- Snowflake for structured data and analytics

### Deployment

- DigitalOcean App Platform
- Frontend and backend can be deployed as separate services or as a combined app depending on team preference

## 18. Core API Routes

### POST /api/analyze-request

Purpose:

- Sends client problem to Gemini
- Returns structured service request

Input:

```json
{
  "client_id": "client_001",
  "message": "My kitchen sink is leaking under the cabinet"
}
```

Output:

```json
{
  "service_category": "Plumbing",
  "urgency": "High",
  "recommended_tier": "Plus",
  "problem_summary": "Kitchen sink leak under cabinet",
  "client_facing_explanation": "This should be handled soon to reduce water damage risk."
}
```

### POST /api/select-tier

Purpose:

- Saves selected client tier

Input:

```json
{
  "request_id": "req_001",
  "selected_tier": "Plus"
}
```

### POST /api/dispatch

Purpose:

- Finds eligible contractors
- Simulates ping process
- Returns accepted contractor

Input:

```json
{
  "request_id": "req_001",
  "tier": "Plus",
  "service_category": "Plumbing",
  "location": "Toronto"
}
```

Output:

```json
{
  "booking_id": "book_001",
  "contractor_id": "cont_002",
  "contractor_name": "Apex Plumbing Services",
  "status": "Accepted",
  "arrival_window": "2:00 PM - 3:00 PM"
}
```

### POST /api/voice-confirmation

Purpose:

- Uses ElevenLabs to generate booking confirmation audio

Input:

```json
{
  "text": "Your Plus plumbing service has been booked."
}
```

Output:

```json
{
  "audio_url": "generated-audio-url-or-base64"
}
```

### POST /api/complete-booking

Purpose:

- Marks booking complete
- Allows review creation
- Updates contractor metrics

## 19. Mobile PWA Screens

### Home Screen

Purpose:

- Main chatbot interface

Includes:

- Problem input box
- Voice input button
- Submit button
- AI response area

### Tier Selection Page

Purpose:

- Client chooses Basic, Plus, or Premium

Includes:

- Three tier cards
- Short criteria for each tier
- Recommended tier badge from Gemini

### Dispatch Page

Purpose:

- Shows contractor pinging process

Includes:

- “Finding contractor...” state
- “Contractor accepted” state
- Contractor name and tier
- Arrival window

### Confirmation Page

Purpose:

- Final booking summary

Includes:

- Service category
- Selected tier
- Contractor
- Arrival window
- Premium Coverage status
- ElevenLabs audio playback

### Contractor Dashboard

Purpose:

- Show contractor profile and job ping simulation

Includes:

- Current tier
- Five-star reviews
- Acceptance rate
- Incoming request card
- Accept/decline buttons

## 20. Demo Story

The demo should be simple and fast.

### Demo Scenario

A client says:

> “My bathroom sink is leaking and water is pooling under the cabinet.”

The app:

1. Sends the message to Gemini.
2. Gemini identifies it as a plumbing issue.
3. Gemini marks urgency as high.
4. Gemini recommends Plus.
5. User selects Plus.
6. System dispatches the job to an eligible Plus plumber.
7. Contractor accepts.
8. Booking confirmation appears.
9. ElevenLabs reads the confirmation out loud.
10. Booking data is stored in Snowflake.

## 21. Judging Alignment

### Best Use of Gemini API

InstantService uses Gemini as the core dispatcher that turns messy human language into structured service requests.

### Best Use of ElevenLabs

InstantService uses ElevenLabs to create voice confirmations and a smoother booking experience.

### Best Use of Snowflake

InstantService uses Snowflake to store service requests, contractors, bookings, reviews, and tier analytics.

### Best Use of DigitalOcean

InstantService is deployed on DigitalOcean so judges can access a live version.

## 22. Team Work Split

## Person 1: Frontend and User Experience

Responsibilities:

- Build the mobile-first client-facing PWA
- Build the chatbot interface
- Build tier selection UI
- Build booking confirmation flow
- Make the app look polished for judging

Tasks:

- Create home page
- Create problem input component
- Create voice input button UI
- Create Basic, Plus, Premium tier cards
- Show Gemini-generated recommendation
- Create dispatch loading screen
- Create booking confirmation page
- Add audio playback component for ElevenLabs output
- Connect frontend to backend API routes

Deliverables:

- Working mobile PWA flow from problem input to booking confirmation
- Clean and demo-ready UI
- Responsive phone-first layout

## Person 2: Backend and Matching Logic

Responsibilities:

- Build API routes
- Implement dispatch logic
- Handle booking creation
- Simulate contractor pinging

Tasks:

- Create Python backend server using FastAPI or Flask
- Implement `/api/analyze-request`
- Implement `/api/select-tier`
- Implement `/api/dispatch`
- Implement `/api/complete-booking`
- Create contractor eligibility logic
- Filter contractors by tier and service category
- Simulate contractor accept/decline
- Update acceptance rate after decisions
- Return booking confirmation data to frontend

Deliverables:

- Working backend endpoints
- Functional matching/dispatch system
- Booking object returned successfully

## Person 3: AI and Gemini Integration

Responsibilities:

- Build Gemini reasoning flow
- Create reliable prompts
- Convert natural language into structured service requests

Tasks:

- Create Gemini prompt templates
- Implement Gemini API call
- Force JSON output from Gemini
- Validate Gemini response shape
- Generate:
  - Service category
  - Problem summary
  - Urgency
  - Recommended tier
  - Client explanation
  - Contractor summary
- Add fallback response if Gemini fails
- Provide sample test prompts for the demo

Deliverables:

- Working Gemini-powered request analyzer
- Reliable JSON response
- Strong AI demo moment

## Person 4: Snowflake, ElevenLabs, and Deployment

Responsibilities:

- Handle data storage
- Handle voice output
- Deploy the app

Tasks:

- Create Snowflake schema
- Seed sample contractors
- Seed sample clients
- Seed reviews and tier data
- Store service request logs
- Store booking records
- Implement ElevenLabs text-to-speech call
- Return audio URL or playable audio data
- Configure environment variables
- Deploy JavaScript frontend PWA and Python backend to DigitalOcean

Deliverables:

- Snowflake tables and sample data
- Working voice confirmation
- Live deployed app link

## 23. Sample Seed Contractors

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
    "service_range_km": 20
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
    "service_range_km": 25
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
    "service_range_km": 30
  }
]
```

## 24. Tier Eligibility Function

Example logic:

```javascript
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

## 25. Premium Coverage Logic

Premium Coverage applies only to Premium bookings.

For the MVP:

- If selected tier is Premium, set `premium_coverage = true`.
- Show a promise window.
- If job status becomes `late` or `not_completed`, show `refund_status = eligible`.
- No real refund processing is needed.

Example:

```json
{
  "tier_selected": "Premium",
  "premium_coverage": true,
  "promised_completion_window": "2 hours",
  "refund_status": "eligible_if_late"
}
```

## 26. Success Criteria

The project is successful if the demo shows:

- Client can describe a problem naturally
- Gemini correctly generates the service
- Client can choose a tier
- System dispatches to a contractor
- Contractor accepts
- Booking is confirmed
- ElevenLabs speaks the confirmation
- Data is saved or simulated in Snowflake
- Mobile-first PWA and Python backend are deployed on DigitalOcean

## 27. Final Pitch Summary

InstantService is not another contractor directory. It is a mobile-first PWA that can be opened instantly from a phone browser.

InstantService is not another contractor directory.

It is an AI-powered instant dispatch system for real-world services.

Clients do not search. They explain the problem.

Gemini understands the issue.

The client chooses a trust tier.

InstantService dispatches the job to an eligible contractor.

ElevenLabs confirms the booking through voice.

Snowflake stores the platform data.

DigitalOcean makes the product live.

InstantService makes hiring contractors faster, simpler, and safer.
