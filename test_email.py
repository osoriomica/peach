from django.core.mail import send_mail

try: send_mail('Test Subject', 'This is a test message from my Django app.', 'peachkaboom1@gmail.com', ['osoriomica@gmail.com'], fail_silently=False,)
except Exception as e: print(f"Error sending email: {e}")