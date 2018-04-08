# coding: utf-8
from html2text import html2text
from django.conf import settings
from django.utils import six
from django.core.mail import EmailMultiAlternatives
from django.core.mail.message import DEFAULT_ATTACHMENT_MIME_TYPE
import mimetypes


def _send_mail(
        email_to,
        subject,
        message_body="",
        email_from="",
        message_html="",
        custom_headers={},
        attachment_path=None,
        extra_attachment_header=None,
):
    """ Email handle

    :param email_to: send to
    :param subject: subject
    :param message_body: body
    :param email_from: from
    :param message_html: html
    :param custom_headers: h
    :param attachment_path: Can be str or list or tuple
    :param extra_attachment_header: For example `{"Content-ID": "<xx.png>"}`
    :return:
    """
    if not message_body and not message_html:
        raise ValueError('邮件内容不能为空.')

    if not message_body:
        message_body = html2text(message_html)

    message = {
        'subject': subject,
        'body': message_body,
        'to': email_to
    }
    if email_from:
        message['from_email'] = email_from
    else:
        message['from_email'] = settings.DEFAULT_FROM_EMAIL

    if custom_headers:
        message['headers'] = custom_headers

    msg = ZhEmailMultiAlternatives(extra_attachment_header=extra_attachment_header, **message)

    if attachment_path:
        if isinstance(attachment_path, str):
            msg.attach_file(attachment_path)
        elif isinstance(attachment_path, (list, tuple)):
            for attachment in attachment_path:
                msg.attach_file(attachment)

    if message_html:
        msg.attach_alternative(message_html, "text/html")
    return msg.send()


class ZhEmailMultiAlternatives(EmailMultiAlternatives):
    """
        override create attachment encoding, use attachment.add_header,
        user gb18030 for qq, 163, gmail
    """

    def __init__(
            self,
            subject='',
            body='',
            from_email=None,
            to=None, bcc=None,
            connection=None,
            attachments=None,
            headers=None,
            alternatives=None,
            cc=None, reply_to=None,
            extra_attachment_header=None
    ):
        super(ZhEmailMultiAlternatives, self).__init__(
            subject=subject,
            body=body,
            from_email=from_email,
            to=to, bcc=bcc,
            connection=connection,
            attachments=attachments,
            headers=headers,
            alternatives=alternatives,
            cc=cc, reply_to=reply_to,
        )
        self.extra_attachment_header = extra_attachment_header

    def _create_attachment(self, filename, content, mimetype=None):
        encoding = 'gb18030'

        if mimetype is None:
            mimetype, _ = mimetypes.guess_type(filename)
            if mimetype is None:
                mimetype = DEFAULT_ATTACHMENT_MIME_TYPE
        attachment = self._create_mime_attachment(content, mimetype)
        if filename:
            try:
                filename.encode('ascii')
            except UnicodeEncodeError:
                if six.PY2:
                    filename = filename.encode('utf-8').decode(encoding, 'ignore')
                filename = (encoding, '', filename)
        attachment.add_header('Content-Disposition', 'attachment', filename=filename)
        if self.extra_attachment_header:
            attachment.add_header(*self.extra_attachment_header)
        return attachment


if __name__ == '__main__':
    _send_mail(
        email_to=send_list,
        subject='{} {} 消息发送日志'.format(
            str(datetime.now().date()), author),
        message_body="",
        email_from="",
        message_html=log_html,
        custom_headers={},
        attachment_path="",
        extra_attachment_header=None,
    )
