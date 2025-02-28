import json
import logging

from aws_connection import AWSConnection


def upload_tasks(table):
    try:
        with open("tasks.json", "r") as f:
            data = json.load(f)

        for task in data.get("tasks", []):
            task_item = {
                "task_id": task.get("task_id"),
                "menti_id": task.get("menti_id"),
                "mentor_id": task.get("mentor_id"),
                "title": task.get("title"),
                "description": task.get("description"),
                "status": task.get("status"),
                "created_date": task.get("created_date"),
                "in_progress_date": task.get("in_progress_date"),
                "completed_date": task.get("completed_date"),
                "subtasks": task.get("subtasks", [])
            }

            table.put_item(Item=task_item)
    except FileNotFoundError as e:
        logging.error("Failed to populate table because of {}".format(e))
        exit(1)
    except Exception as e:
        logging.error("Failed to populate table because of {}".format(e))
        exit(1)


def create_table(table_name: str):
    try:
        aws = AWSConnection()
        table = aws.create_table(table_name)
        if not table:
            raise ValueError("No table")
        return table
    except Exception:
        logging.error("Failed to create table, exiting")
        exit(1)


def main(table_name: str) -> None:
    table = create_table(table_name)
    upload_tasks(table)
