from typing import Optional


class ValidationResult:
    def __init__(self, is_valid: bool, message: Optional[str] = None):
        self.is_valid = is_valid
        self.message = message
