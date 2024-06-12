import psycopg2

# Connect to the database using the connection URI
conn = psycopg2.connect("postgres://yolohomiedata_user:dOzsLSGsIjpn6ETiRUz3hJZeV70KxxoD@dpg-con3gmocmk4c739u2gjg-a.singapore-postgres.render.com/yolohomiedata")

# Create a cursor
cur = conn.cursor()

# Execute a query
cur.execute("SELECT * FROM waterpump")
#['waterpump', 'tmp_li_humi', 'yolohome_user']


# Fetch and print results
rows = cur.fetchall()
for row in rows:
    print(row)

# Close cursor and connection
cur.close()
conn.close()