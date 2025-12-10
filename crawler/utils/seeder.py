from .pipeline import get_db_connection

conn = get_db_connection()


def execute_sql(query, params=None):
    if conn is None:
        print("No connection availbel")
        return
    else:
        cur = conn.cursor()

        try:
            cur.execute(query, params)
            conn.commit()
            print("executed the query ")
        except Exception as error:
            print("An error Occured", error)
            conn.rollback()
            print("rolledback the connecton")
        finally:
            cur.close()
            print("connection is now cloased")
