##Task 23
##task23.py
#Hard

class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
## remove 1
    def send_email(self, subject, body):
        print(f"Sending email to {self.email}: {subject}\n{body}")
## end
## remove 2
    def change_password(self, new_password):
        if len(new_password) < 8:
            print("Password too short!")
        else:
            self.password = new_password
            print("Password changed successfully!")
## end
## add 1
class EmailService:
    def send_email(self, recipient, subject, body):
        print(f"Sending email to {recipient}: {subject}\n{body}")
## end
## add 2
class PasswordService:
    def change_password(self, user, new_password):
        if len(new_password) < 8:
            print("Password too short!")
        else:
            user.password = new_password
            print("Password changed successfully!")
## end