import argparse

import os
import logging
from typing import Final

from populate_admin_messages import main as populate_admin_messages

ADMIN_MESSAGES: Final[str] = "admin_messages"


def main(args):
    if args.action == "admin-notification":
        logging.info("creating SQS for admin messages")
        populate_admin_messages(ADMIN_MESSAGES)

    if args.action == "mentor-notifications":
        logging.info("creating and uploading notifications for mentor !")
        # upload_tasks(tasks_table_name)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('--action', metavar='-a', dest="action",
                        help='which action to do? (what to populate db or tasks?)',
                        required=True,
                        choices=['admin-notification', 'mentor-notifications'])
    args = parser.parse_args()
    LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()
    logging.basicConfig(format='%(levelname)s: %(message)s', level=LOGLEVEL)
    main(args)
