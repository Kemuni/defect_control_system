from minio import Minio
from minio.error import S3Error
from app.config import get_settings
import uuid
import json
from io import BytesIO

settings = get_settings()


class MinIOClient:
    def __init__(self):
        self.client = Minio(
            settings.minio_endpoint,
            access_key=settings.minio_access_key,
            secret_key=settings.minio_secret_key,
            secure=settings.minio_secure
        )
        self.bucket_name = settings.minio_bucket_name
        self._ensure_bucket()
    
    def _ensure_bucket(self):
        """Ensure the bucket exists, create if not"""
        try:
            if not self.client.bucket_exists(self.bucket_name):
                self.client.make_bucket(self.bucket_name)
                
                # Set public read policy for the bucket
                policy = {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Principal": {"AWS": "*"},
                            "Action": ["s3:GetObject"],
                            "Resource": [f"arn:aws:s3:::{self.bucket_name}/*"]
                        }
                    ]
                }
                self.client.set_bucket_policy(self.bucket_name, json.dumps(policy))
        except S3Error as e:
            print(f"Error ensuring bucket: {e}")
    
    async def upload_file(self, file_data: bytes, filename: str, content_type: str = "application/octet-stream") -> str:
        """Upload file to MinIO and return the URL"""
        try:
            # Generate unique filename
            unique_filename = f"{uuid.uuid4()}_{filename}"
            
            # Upload file
            self.client.put_object(
                self.bucket_name,
                unique_filename,
                BytesIO(file_data),
                length=len(file_data),
                content_type=content_type
            )
            
            # Return full URL
            protocol = "https" if settings.minio_secure else "http"
            return f"{protocol}://{settings.minio_endpoint}/{self.bucket_name}/{unique_filename}"
        except S3Error as e:
            raise Exception(f"Error uploading file: {e}")
    
    def upload_file_sync(self, file_data: bytes, filename: str, content_type: str = "application/octet-stream") -> str:
        """Upload file to MinIO and return the URL (synchronous)"""
        try:
            # Generate unique filename
            unique_filename = f"{uuid.uuid4()}_{filename}"
            
            # Upload file
            self.client.put_object(
                self.bucket_name,
                unique_filename,
                BytesIO(file_data),
                length=len(file_data),
                content_type=content_type
            )
            
            # Return full URL
            protocol = "https" if settings.minio_secure else "http"
            return f"{protocol}://{settings.minio_endpoint}/{self.bucket_name}/{unique_filename}"
        except S3Error as e:
            raise Exception(f"Error uploading file: {e}")
    
    def delete_file_sync(self, file_url: str) -> bool:
        """Delete file from MinIO by URL (synchronous)"""
        try:
            # Extract object name from URL
            object_name = file_url.split(f"/{self.bucket_name}/")[-1]
            self.client.remove_object(self.bucket_name, object_name)
            return True
        except S3Error as e:
            print(f"Error deleting file: {e}")
            return False
    
    async def delete_file(self, file_url: str) -> bool:
        """Delete file from MinIO by URL"""
        try:
            # Extract object name from URL
            object_name = file_url.split(f"/{self.bucket_name}/")[-1]
            self.client.remove_object(self.bucket_name, object_name)
            return True
        except S3Error as e:
            print(f"Error deleting file: {e}")
            return False
    
    def get_file_url(self, object_name: str) -> str:
        """Get presigned URL for file"""
        try:
            url = self.client.presigned_get_object(self.bucket_name, object_name)
            return url
        except S3Error as e:
            raise Exception(f"Error getting file URL: {e}")


minio_client = MinIOClient()
