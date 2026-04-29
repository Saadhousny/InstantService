INSERT INTO CLIENTS (
  CLIENT_ID,
  FULL_NAME,
  EMAIL,
  PHONE,
  DEFAULT_LOCATION,
  PROPERTY_TYPE
)
VALUES (
  'client_001',
  'Demo Client',
  'client@instantservice.demo',
  '555-111-2222',
  'Toronto',
  'Residential'
);

INSERT INTO CONTRACTORS (
  CONTRACTOR_ID,
  FULL_NAME,
  BUSINESS_NAME,
  LICENSE_ID,
  CORPORATION_ID,
  INSURANCE_VERIFIED,
  TIER,
  SERVICE_CATEGORY,
  SERVICE_RANGE_KM,
  LOCATION,
  RATING_AVERAGE,
  FIVE_STAR_REVIEW_COUNT,
  ACCEPTED_REQUESTS,
  TOTAL_REQUESTS_PINGED,
  AVAILABILITY_STATUS,
  ACTIVE_STATUS
)
VALUES
(
  'cont_001',
  'Samir Plumbing Co.',
  'Samir Plumbing Co.',
  'LIC-BASIC-001',
  'CORP-BASIC-001',
  TRUE,
  'Basic',
  'Plumbing',
  20,
  'Toronto',
  4.3,
  12,
  18,
  40,
  'Available',
  'Active'
),
(
  'cont_002',
  'Apex Plumbing Services',
  'Apex Plumbing Services',
  'LIC-PLUS-002',
  'CORP-PLUS-002',
  TRUE,
  'Plus',
  'Plumbing',
  25,
  'Toronto',
  4.7,
  45,
  58,
  100,
  'Available',
  'Active'
),
(
  'cont_003',
  'Elite Rapid Repairs',
  'Elite Rapid Repairs',
  'LIC-PREM-003',
  'CORP-PREM-003',
  TRUE,
  'Premium',
  'Plumbing',
  30,
  'Toronto',
  4.9,
  132,
  86,
  110,
  'Available',
  'Active'
);

INSERT INTO SERVICE_REQUESTS (
  REQUEST_ID,
  CLIENT_ID,
  RAW_CLIENT_MESSAGE,
  GEMINI_STRUCTURED_OUTPUT,
  SERVICE_CATEGORY,
  PROBLEM_SUMMARY,
  URGENCY,
  RECOMMENDED_TIER,
  SELECTED_TIER,
  LOCATION
)
SELECT
  'req_001',
  'client_001',
  'My bathroom sink is leaking and water is pooling under the cabinet.',
  PARSE_JSON('{
    "service_category": "Plumbing",
    "problem_summary": "Bathroom sink leak with water pooling under cabinet",
    "urgency": "High",
    "property_type": "Residential",
    "estimated_complexity": "Medium",
    "recommended_tier": "Plus",
    "client_facing_explanation": "This should be handled soon to prevent water damage.",
    "contractor_summary": "Inspect bathroom sink drain, shutoff valves, and pipe connections."
  }'),
  'Plumbing',
  'Bathroom sink leak with water pooling under cabinet',
  'High',
  'Plus',
  'Plus',
  'Toronto';

INSERT INTO REVIEWS (
  REVIEW_ID,
  BOOKING_ID,
  CLIENT_ID,
  CONTRACTOR_ID,
  RATING,
  REVIEW_TEXT
)
VALUES
('rev_001', 'book_old_001', 'client_001', 'cont_002', 5, 'Fast and professional.'),
('rev_002', 'book_old_002', 'client_001', 'cont_002', 5, 'Great communication.'),
('rev_003', 'book_old_003', 'client_001', 'cont_003', 5, 'Excellent urgent service.');

INSERT INTO DISPATCH_EVENTS (
  EVENT_ID,
  REQUEST_ID,
  BOOKING_ID,
  CONTRACTOR_ID,
  EVENT_TYPE,
  EVENT_DETAILS
)
SELECT
  'event_001',
  'req_001',
  NULL,
  'cont_002',
  'PING_SENT',
  PARSE_JSON('{
    "message": "Incoming Plus plumbing job",
    "status": "waiting_for_response"
  }');