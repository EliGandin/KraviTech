from globals.validation.db_validation import existing_user_validation
from globals.validation.validation_result import ValidationResult


def user_validation(email: str, password: str) -> ValidationResult:
    if len(password) < 4:
        return ValidationResult(False, "Password must be at least 4 characters long")


    if existing_user_validation(email):
        return ValidationResult(False, "User with this email already exists")

    return ValidationResult(True)
