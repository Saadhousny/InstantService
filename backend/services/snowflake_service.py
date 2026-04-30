import os

import snowflake.connector
from dotenv import load_dotenv

load_dotenv()
load_dotenv(".env.snowflake.local", override=True)

REQUIRED_ENV_VARS = [
    "SNOWFLAKE_ACCOUNT",
    "SNOWFLAKE_USER",
    "SNOWFLAKE_PASSWORD",
    "SNOWFLAKE_WAREHOUSE",
    "SNOWFLAKE_DATABASE",
    "SNOWFLAKE_SCHEMA",
]


def validate_env():
    missing = [key for key in REQUIRED_ENV_VARS if not os.getenv(key)]

    if missing:
        raise RuntimeError(
            f"Missing Snowflake environment variables: {', '.join(missing)}"
        )


def get_connection():
    validate_env()

    return snowflake.connector.connect(
        account=os.getenv("SNOWFLAKE_ACCOUNT"),
        user=os.getenv("SNOWFLAKE_USER"),
        password=os.getenv("SNOWFLAKE_PASSWORD"),
        warehouse=os.getenv("SNOWFLAKE_WAREHOUSE"),
        database=os.getenv("SNOWFLAKE_DATABASE"),
        schema=os.getenv("SNOWFLAKE_SCHEMA"),
    )


def run_query(query, params=None):
    connection = get_connection()

    try:
        cursor = connection.cursor()
        cursor.execute(query, params or [])

        if cursor.description is None:
            return []

        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()

        return [dict(zip(columns, row)) for row in rows]

    finally:
        connection.close()

def run_command(query, params=None):
    connection = get_connection()

    try:
        cursor = connection.cursor()
        cursor.execute(query, params or [])
        connection.commit()

        return {"success": True}

    finally:
        connection.close()