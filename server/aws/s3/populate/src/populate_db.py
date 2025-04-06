import logging
from pop_utils import DbConnection, AwsConnection, remove_image_prefix

UPDATE_QUERY = """
UPDATE {table_name}
SET "image_string" = '{image_string}'
WHERE "{type_name}" = '{user_id}'
"""
VALIDATE_QUERY = """
SELECT "image_string"
FROM {table_name}
WHERE "{type_name}" = '{user_id}'
"""


def get_images_names_from_s3(aws: AwsConnection, bucket_name: str) -> list:
    db_images = []
    try:
        files = aws.list_files(bucket_name)
        if files:
            for file in files:
                logging.info("working on: {}".format(file))
                db_images.append({
                    'id': remove_image_prefix(file.get('Key')).replace("mentor_", "").replace("menti_", ""),
                    'key': file.get('Key')
                })
    except Exception as e:
        logging.error("Got unexpected error on getting images: {}".format(str(e)))
    return db_images


def update_image_in_table(images: list, db=DbConnection) -> bool:
    try:
        for image in images:
            image_update_query = ""
            image_validate_query = ""
            if "menti" in image.get('key'):
                image_update_query = UPDATE_QUERY.format(table_name="mentis", type_name="id",
                                                         image_string=image.get('key'), user_id=image.get('id'))
                image_validate_query = VALIDATE_QUERY.format(table_name="mentis", type_name="id",
                                                             user_id=image.get('id'))
            else:
                image_update_query = UPDATE_QUERY.format(table_name="mentors", type_name="id",
                                                         image_string=image.get('key'), user_id=image.get('id'))
                image_validate_query = VALIDATE_QUERY.format(table_name="mentors", type_name="id",
                                                             user_id=image.get('id'))
            db.execute(image_update_query)
            db.commit()
            result = db.query(image_validate_query)
            for row in result:
                logging.debug("found row: {}".format(row))
        return True
    except Exception as e:
        logging.error(f"unhandled error: {e}")
        return False


def main(bucket_name: str) -> None:
    aws = AwsConnection()
    db = DbConnection()
    images = get_images_names_from_s3(aws=aws, bucket_name=bucket_name)
    if not images:
        logging.error("Didn't find any images!")
        exit(1)
    status = update_image_in_table(images, db)
    if status:
        logging.info("all images updated in db successfully")
    else:
        logging.error("Not all images updated.")
        exit(1)
