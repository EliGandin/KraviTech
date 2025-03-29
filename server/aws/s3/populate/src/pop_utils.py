import os
import logging
import json
from typing import Optional

import psycopg2
import boto3
from boto3 import Session
from botocore.exceptions import ClientError

IMAGE_FORMATS = ["jpg", "jpeg", "pdf", "bmp", "svg", "gif", "png", "tiff"]


def remove_image_prefix(image_name: str) -> str:
    for file_type in IMAGE_FORMATS:
        image_name = image_name.replace(f".{file_type}", "")
    return image_name


class DbConnection:
    def __init__(self) -> None:
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            raise ValueError("DATABASE_URL environment variable is not set")

        self._conn = psycopg2.connect(
            database_url
        )
        self._cursor = self._conn.cursor()
        logging.info("Created a db connection!")

    @property
    def connection(self) -> psycopg2.extensions.connection:
        return self._conn

    @property
    def cursor(self) -> psycopg2.extensions.cursor:
        return self._cursor

    def commit(self):
        self.connection.commit()

    def close(self, commit=True):
        if commit:
            self.commit()
        self.connection.close()

    def execute(self, sql, params=None):
        self.cursor.execute(sql, params or ())

    def fetchall(self) -> list:
        return self.cursor.fetchall()

    def fetchone(self) -> Optional[dict]:
        return self.cursor.fetchone()

    def query(self, sql, params=None) -> list:
        self.cursor.execute(sql, params or ())
        return self.fetchall()


class AwsConnection:
    def __init__(self) -> None:
        self._session = boto3.session.Session()
        self._s3_client = self._session.client(
            service_name='s3',
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
            region_name=os.environ.get('AWS_DEFAULT_REGION'),
            endpoint_url=os.environ.get('AWS_ENDPOINT_URL')
        )
        logging.info("created a s3 client connection!")

    @property
    def session(self) -> Session:
        return self._session

    @property
    def s3_client(self) -> boto3.client:
        return self._s3_client

    def upload_file(self, file_name: str, bucket_name: str, object_name: str = None, content_type: str = None) -> bool:
        """Upload a file to an S3 bucket

        :param file_name: File to upload
        :param bucket_name: Bucket to upload to
        :param object_name: S3 object name. If not specified then file_name is used
        :param content_type: content type of the file
        :return: True if file was uploaded, else False
        """

        # If S3 object_name was not specified, use file_name
        if object_name is None:
            object_name = os.path.basename(file_name)
        if content_type is None:
            extra_args = None
        else:
            extra_args = {
                'ContentType': content_type
            }
        try:
            self._s3_client.upload_file(file_name, bucket_name, object_name, ExtraArgs=extra_args)
        except ClientError as e:
            logging.error(str(e))
            return False
        return True

    def list_files(self, bucket_name: str) -> Optional[list]:
        try:
            response = self._s3_client.list_objects_v2(
                Bucket=bucket_name
            )
            logging.debug("response: {}".format(response))
            if response:
                return response.get('Contents')
            return []
        except ClientError as e:
            logging.error(str(e))
            return None

    @staticmethod
    def __get_cors__():
        with open('cors.json', 'r') as cors_file:
            return json.load(cors_file)

    def create_bucket(self, bucket_name: str) -> Optional[bool]:
        try:
            response = self._s3_client.create_bucket(
                Bucket=bucket_name
            )
            if response:
                logging.info("Successfully created a bucket named: {}".format(bucket_name))
                self._s3_client.put_bucket_cors(Bucket=bucket_name, CORSConfiguration=self.__get_cors__())
                logging.info("Successfully put cors policy: {}".format(bucket_name))
                return True
            raise ValueError("didn't create bucket.")
        except ClientError as e:
            logging.error(str(e))
            return None
        except ValueError as e:
            logging.error(str(e))
            return False

    def create_presigned_url(self, bucket_name: str, object_name: str, expiration: int = 3600) -> Optional[str]:
        try:
            response = self._s3_client.generate_presigned_url('get_object',
                                                              Params={'Bucket': bucket_name,
                                                                      'Key': object_name},
                                                              ExpiresIn=expiration)
        except ClientError as e:
            logging.error(str(e))
            return None

        return response
