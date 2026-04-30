from services.snowflake_service import run_command

def create_users_table():
    print("Creating USERS table in Snowflake...")
    
    query = """
    CREATE TABLE IF NOT EXISTS USERS (
        USER_ID STRING PRIMARY KEY,
        EMAIL STRING UNIQUE,
        PASSWORD_HASH STRING,
        FULL_NAME STRING,
        PHONE_NUMBER STRING,
        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
    )
    """
    
    try:
        run_command(query)
        print("USERS table created successfully!")
    except Exception as e:
        print(f"Failed to create USERS table: {e}")

if __name__ == "__main__":
    create_users_table()
