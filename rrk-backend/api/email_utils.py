import logging
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)


def send_enquiry_notification(enquiry):
    subject = f"📩 New Enquiry from {enquiry.name} — RRK Earth Movers Website"
    message = (
        f"Name    : {enquiry.name}\n"
        f"Phone   : {enquiry.phone}\n"
        f"Email   : {enquiry.email or '—'}\n"
        f"Service : {enquiry.service or '—'}\n"
        f"Message : {enquiry.message}\n"
        f"Date    : {enquiry.created_at.strftime('%d %b %Y, %I:%M %p')} IST"
    )
    html_message = f"""
<!DOCTYPE html><html><head><meta charset="utf-8"/>
<style>
  body{{font-family:Arial,sans-serif;background:#f4f6f8;padding:24px}}
  .card{{background:#fff;border-radius:10px;padding:28px 32px;max-width:560px;margin:0 auto;border:1px solid #e5e9f0}}
  .header{{border-left:4px solid #F4B400;padding-left:14px;margin-bottom:24px}}
  .header h2{{margin:0;font-size:20px;color:#1F2937}}
  .row{{display:flex;gap:8px;margin-bottom:10px;font-size:14px}}
  .label{{font-weight:700;color:#1F2937;min-width:80px}}
  .value{{color:#374151}}
  .msg-box{{background:#f8fafc;border:1px solid #e5e9f0;border-radius:8px;padding:14px 16px;margin:20px 0;font-size:14px;color:#374151;line-height:1.6}}
  .btn{{display:inline-block;background:#1E3A8A;color:#fff;text-decoration:none;padding:10px 22px;border-radius:6px;font-size:14px;font-weight:600;margin-top:8px}}
  .footer{{margin-top:24px;font-size:12px;color:#9CA3AF;text-align:center}}
</style></head><body>
<div class="card">
  <div class="header"><h2>New Website Enquiry</h2><p>Received: {enquiry.created_at.strftime("%d %b %Y at %I:%M %p")} IST</p></div>
  <div class="row"><span class="label">Name</span><span class="value">{enquiry.name}</span></div>
  <div class="row"><span class="label">Phone</span><span class="value"><a href="tel:+91{enquiry.phone}">{enquiry.phone}</a></span></div>
  <div class="row"><span class="label">Email</span><span class="value">{enquiry.email or "—"}</span></div>
  <div class="row"><span class="label">Service</span><span class="value">{enquiry.service or "—"}</span></div>
  <div class="msg-box"><strong style="display:block;margin-bottom:6px;color:#1F2937">Message</strong>{enquiry.message}</div>
  <a class="btn" href="https://wa.me/91{enquiry.phone}">💬 Reply on WhatsApp</a>
  <div class="footer">RRK Earth Movers — Website Enquiry Notification</div>
</div></body></html>""".strip()

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ENQUIRY_NOTIFICATION_EMAIL],
            html_message=html_message,
            fail_silently=False,
        )
    except Exception as exc:
        logger.error("Email notification failed: %s", exc)
