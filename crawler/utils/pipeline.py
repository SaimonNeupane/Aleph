import psycopg2


conn = None


def get_db_connection():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="search_engine",
            user="saimon",
            password="26494504",
            port="5432",
        )
        print("connected successfully")
        return conn
    except Exception as error:
        print("an error occured", error)
        return None
