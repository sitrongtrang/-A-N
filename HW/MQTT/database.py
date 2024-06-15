import psycopg2
import pandas as pd
import time
from dotenv import load_dotenv
import os
load_dotenv()
class Database:
    def __init__(self):
        uri = "postgres://yolohomiedata_user:dOzsLSGsIjpn6ETiRUz3hJZeV70KxxoD@dpg-con3gmocmk4c739u2gjg-a.singapore-postgres.render.com/yolohomiedata"
        
        self.connection = psycopg2.connect("postgres://yolohomiedata_user:dOzsLSGsIjpn6ETiRUz3hJZeV70KxxoD@dpg-con3gmocmk4c739u2gjg-a.singapore-postgres.render.com/yolohomiedata")

        # Create a cursor
        self.cursor = self.connection.cursor()
    
    def insert_data(self, temperature, light, humidity):
        current_time = pd.to_datetime(time.strftime("%Y-%m-%d %H:%M:%S"))
        query = "INSERT INTO tmp_li_humi (time, temperature, light, humidity) VALUES (%s, %s, %s, %s)"
        data = (current_time, temperature, light, humidity)
        self.cursor.execute(query, data)
        self.connection.commit()
        print("Data inserted successfully.")

    def insert_waterpump(self, amount, name):
        current_time = pd.to_datetime(time.strftime("%Y-%m-%d %H:%M:%S"))
        query = "INSERT INTO waterpump (datetime, amount, name) VALUES (%s, %s, %s)"
        data = (current_time, amount, name)
        self.cursor.execute(query, data)
        self.connection.commit()
        print("Data inserted successfully.")

    def set_last_name(self):
        query = """
            UPDATE waterpump
            SET name = 'None'
            WHERE datetime = (
                SELECT MAX(datetime)
                FROM waterpump
            );
        """
        self.cursor.execute(query)
        self.connection.commit()
        print("Last water pump name set to 'None'.")
    


