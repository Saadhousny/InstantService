# Contractor Dashboard API Handoff

## Local backend

http://localhost:8000

## Health check

GET /health

## Get contractor dashboard

GET /api/contractor/dashboard/cont_002

Returns contractor profile, metrics, and incoming ping data from Snowflake.

## Respond to contractor ping

POST /api/contractor/respond

Accept body:

```json
{
  "request_id": "req_001",
  "contractor_id": "cont_002",
  "action": "accept"
}
```

Decline body:

```json
{
  "request_id": "req_001",
  "contractor_id": "cont_002",
  "action": "decline"
}
```

## Frontend notes

The contractor dashboard should fetch:

```txt
GET http://localhost:8000/api/contractor/dashboard/cont_002
```

The Accept button should send:

```txt
action: "accept"
```

The Decline button should send:

```txt
action: "decline"
```

If demo data gets messy, rerun `sql/seed.sql` in Snowflake.