import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)


def send_whatsapp_notification(enquiry):
    phone_number_id = getattr(settings, "WA_PHONE_NUMBER_ID", "")
    access_token    = getattr(settings, "WA_ACCESS_TOKEN",    "")
    recipient       = getattr(settings, "WA_RECIPIENT_NUMBER","")

    if not all([phone_number_id, access_token, recipient]):
        logger.info("WhatsApp notification skipped — WA_* env vars not configured.")
        return

    body = (
        f"📩 *New Enquiry — RRK Earth Movers*\n\n"
        f"👤 Name    : {enquiry.name}\n"
        f"📞 Phone   : {enquiry.phone}\n"
        f"✉️  Email   : {enquiry.email or '—'}\n"
        f"🔧 Service : {enquiry.service or '—'}\n\n"
        f"💬 Message:\n{enquiry.message}"
    )

    try:
        response = requests.post(
            f"https://graph.facebook.com/v19.0/{phone_number_id}/messages",
            json={"messaging_product": "whatsapp", "to": recipient,
                  "type": "text", "text": {"body": body}},
            headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"},
            timeout=10,
        )
        response.raise_for_status()
    except Exception as exc:
        logger.error("WhatsApp notification failed: %s", exc)
