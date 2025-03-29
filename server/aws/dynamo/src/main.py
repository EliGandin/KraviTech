import argparse

import os
import logging
from typing import Final

from populate_dynamo import main as upload_tasks

TASKS_TABLE_NAME: Final[str] = "Tasks"


def main(args):
    # images_dir = os.environ.get('IMAGES_DIR')
    # if args.action == "db":
    #     logging.info("updating tasks in SQL DB")
    #       populate_db(bucket_name)
    # images_dir = os.environ.get('IMAGES_DIR')
    # if args.action == "db":
    #     logging.info("updating tasks in SQL DB")
    #     # populate_db(bucket_name)

    if args.action == "dynamo":
        logging.info("creating and uploading tasks to dynamo !")
        upload_tasks(TASKS_TABLE_NAME)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('--action', metavar='-a', dest="action",
                        help='which action to do? (what to populate db or tasks?)',
                        required=True,
                        choices=['db', 'dynamo'])
    args = parser.parse_args()
    LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()
    logging.basicConfig(format='%(levelname)s: %(message)s', level=LOGLEVEL)
    main(args)
