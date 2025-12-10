import psycopg2


conn = None


try:
    conn = psycopg2.connect(
        host="localhost",
        database="search_engine",
        user="saimon",
        password="26494504",
        port="5432",
    )
    print("connected successfully")
    cur = conn.cursor()
    cur.execute("SELECT * FROM search;")
    data = cur.fetchall()
    print(data)
    cur.close()
except Exception as error:
    print("an error occured", error)
    print("ram")
finally:
    conn.close()
    print("db connection closed")
