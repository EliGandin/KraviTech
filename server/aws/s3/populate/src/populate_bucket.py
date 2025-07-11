import os
import logging

from pop_utils import AwsConnection


def upload_files(aws: AwsConnection, bucket_name: str, images_path=None):
    try:
        logging.debug(os.listdir(images_path))
        for file in os.listdir(images_path):
            if images_path:
                file_path = images_path + '/' + file
            else:
                file_path = file
            content_type = "image/" + file.split('.')[-1]
            logging.info(f"content_type: {content_type}")
            success = aws.upload_file(file_name=file_path, object_name=file, bucket_name=bucket_name,
                                      content_type=content_type)
            if success:
                logging.info("uploading {}".format(file))
            else:
                logging.error("uploading {} failed".format(file))
    except Exception as e:
        logging.error("Failed to upload files because of {}".format(e))
        exit(1)


def create_bucket(aws: AwsConnection, bucket_name: str) -> bool:
    try:
        response = aws.create_bucket(bucket_name)
        if not response:
            raise ValueError("no bucket")
        return True
    except Exception as e:
        logging.error(f"failed to create bucket, exiting, because of {e}")
        return False


def validate_bucket(aws: AwsConnection, bucket_name):
    try:
        files = aws.list_files(bucket_name)
        if not files:
            raise ValueError("No files in bucket")
        for file in files:
            logging.info("found: {} in bucket".format(file.get('Key')))
    except Exception as e:
        logging.error(str(e))


def main(bucket_name, images_path):
    aws = AwsConnection()
    create_bucket(aws, bucket_name)
    upload_files(aws, bucket_name, images_path)
    validate_bucket(aws, bucket_name)
