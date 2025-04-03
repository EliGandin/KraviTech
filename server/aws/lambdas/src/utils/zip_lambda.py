import zipfile

with zipfile.ZipFile("../admin/function.zip", "w") as zipf:
    zipf.write("admin_message_handler.py")
