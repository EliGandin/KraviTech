from globals.validation.db_validation import existing_user_validation, matching_password_check
from globals.validation.validation_result import ValidationResult
from schemas.user_schema import UserLogin


def login_validation(user: UserLogin):
    existing_user = existing_user_validation(user.email)

    if not existing_user:
        return ValidationResult(False, "Incorrect email or password")

    if matching_password_check(user.password, existing_user.password) is False:
        return ValidationResult(False, "Incorrect email or password")

    return ValidationResult(True)